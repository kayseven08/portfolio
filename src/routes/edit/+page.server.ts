import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createSession, getAuthenticatedUser, getDatabase, verifyPassword } from '$lib/server/cockroach';

export const load: PageServerLoad = async (event) => {
	if (await getAuthenticatedUser(event.cookies.get('cockroach-session'))) {
		return { status: 200, body: { message: 'You are logged in' } };
	}
	return { status: 401, body: { message: 'You are not logged in' } };
};

export const actions: Actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());
		if (!formData.username || !formData.password) {
			console.log('Missing username or password');
			return fail(400, {
				missing: true
			});
		}

		const { username, password } = formData as { username: string; password: string };

		const [user] = await getDatabase()<{ id: string; password_hash: string }[]>`
			select id, password_hash from portfolio_users where email = ${username.toLowerCase()}
		`;
		if (user && verifyPassword(password, user.password_hash)) {
			const token = await createSession(user.id);
			event.cookies.set('cockroach-session', token, {
				httpOnly: true,
				path: '/',
				secure: event.url.protocol === 'https:',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30
			});
			return { status: 200, body: { message: 'You are now logged in' } };
		}
		return {
			status: 401,
			body: { message: 'Invalid username or password' }
		};
	}
};
