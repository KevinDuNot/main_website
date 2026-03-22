import { redirect } from '@sveltejs/kit';

export const load = () => {
    return redirect(302, 'https://forms.gle/fmHKC48yrZq8TjEUA');
};