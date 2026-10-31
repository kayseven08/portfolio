import { json } from '@sveltejs/kit';
import { defaultData } from '$lib/default-data';
import { getAuthenticatedUser, getDatabase } from '$lib/server/cockroach';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const [row] = await getDatabase()<{ content: unknown }[]>`
			select content from portfolio_data where id = 'main'
		`;
		const content = row?.content as Record<string, unknown> | undefined;
		if (!content || Object.keys(content).length === 0) return json(defaultData);
		return json({
			...defaultData,
			...content,
			aboutPage: content.aboutPage ?? defaultData.aboutPage
		});
	} catch (error) {
		console.error('Unable to read portfolio data', error);
		return json(defaultData);
	}
};

export const PUT: RequestHandler = async ({ request, cookies }) => {
	const user = await getAuthenticatedUser(cookies.get('cockroach-session'));
	if (!user) return json({ message: 'Authentication required' }, { status: 401 });

	try {
		const content = await request.json();
		await getDatabase()`insert into portfolio_data (id, content, updated_by, updated_at)
			values ('main', ${getDatabase().json(content)}, ${user.id}, now())
			on conflict (id) do update set content = excluded.content, updated_by = excluded.updated_by, updated_at = excluded.updated_at`;
		return json({ ok: true });
	} catch (error) {
		console.error('Unable to save portfolio data', error);
		return json({ message: 'Unable to save portfolio data' }, { status: 500 });
	}
};
