import type { LayoutServerLoad } from './$types';
import { getAuthenticatedUser } from '$lib/server/cockroach';

export const load: LayoutServerLoad = async ({ cookies }) => ({
	loggedIn: Boolean(await getAuthenticatedUser(cookies.get('cockroach-session')))
});
