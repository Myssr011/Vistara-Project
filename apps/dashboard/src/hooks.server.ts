import type { Handle } from '@sveltejs/kit';

/**
 * TODO: baca session/JWT dari cookie, isi event.locals.user,
 * lalu tolak akses ke grup (app) dan (admin) bila role tidak sesuai.
 */
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = null;
	return resolve(event);
};
