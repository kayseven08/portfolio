import { env } from '$env/dynamic/private';
import postgres from 'postgres';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

let client: ReturnType<typeof postgres> | undefined;

export const getDatabase = () => {
	if (!env.COCKROACH_DATABASE_URL) {
		throw new Error('COCKROACH_DATABASE_URL is required');
	}
	client ??= postgres(env.COCKROACH_DATABASE_URL, {
		ssl: 'require',
		max: 5,
		idle_timeout: 20
	});
	return client;
};

const digest = (value: string) => createHash('sha256').update(value).digest('hex');

export const hashPassword = (password: string) => {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, 64).toString('hex');
	return `scrypt:${salt}:${hash}`;
};

export const verifyPassword = (password: string, stored: string) => {
	const [, salt, expected] = stored.split(':');
	if (!salt || !expected) return false;
	const actual = scryptSync(password, salt, 64).toString('hex');
	return timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
};

export const getAuthenticatedUser = async (sessionToken: string | undefined) => {
	if (!sessionToken) return null;
	const [user] = await getDatabase()<
		{ id: string; email: string }[]
	>`select u.id, u.email from portfolio_sessions s join portfolio_users u on u.id = s.user_id where s.token_hash = ${digest(sessionToken)} and s.expires_at > now()`;
	return user ?? null;
};

export const createSession = async (userId: string) => {
	const token = randomBytes(32).toString('base64url');
	await getDatabase()`insert into portfolio_sessions (user_id, token_hash, expires_at) values (${userId}, ${digest(token)}, now() + interval '30 days')`;
	return token;
};
