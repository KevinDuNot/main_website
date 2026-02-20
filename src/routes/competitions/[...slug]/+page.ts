import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const prerender = false;

export const load: PageLoad = async ({ params, fetch }) => {
    const cleanSlug = params.slug.replace(/\/+$/, '');

    // If its a pdf
    if (cleanSlug.toLowerCase().endsWith('.pdf')) {
        throw redirect(302, `/competitions-data/${cleanSlug}`);
    }

    // If its a leaderboard
    if (cleanSlug.endsWith('/leaderboard')) {
        const competitionPath = cleanSlug.replace(/\/leaderboard$/, '');
        const targetUrl = `/competitions-data/${competitionPath}/leaderboard.html`;
        const response = await fetch(targetUrl);

        if (response.ok) {
            const rawText = await response.text();

            if (rawText.trim().toLowerCase().startsWith('<!doctype html>')) {
                return { slug: cleanSlug, type: 'html', html: null, title: cleanSlug };
            }

            const stripped = rawText.replace(/^\s*---[\s\S]*?---[\r\n]*/, '');
            const titleMatch = rawText.match(/^\s*---[\s\S]*?title:\s*"([^"]+)"[\s\S]*?---/);
            const title = titleMatch ? titleMatch[1] : competitionPath;
            return { slug: cleanSlug, type: 'html', html: stripped, title };
        }
        return { slug: cleanSlug, type: 'html', html: null, title: cleanSlug };
    }

    // Otherwise its the original markdown text
    const targetUrl = `/competitions-data/${cleanSlug}/_index.md`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
        return { slug: cleanSlug, type: 'markdown', markdown: null, title: cleanSlug };
    }

    const rawText = await response.text();

    if (rawText.trim().toLowerCase().startsWith('<!doctype html>')) {
        return { slug: cleanSlug, type: 'markdown', markdown: null, title: cleanSlug };
    }

    const stripped = rawText.replace(/^\s*---[\s\S]*?---[\r\n]*/, '');
    const titleMatch = rawText.match(/^\s*---[\s\S]*?title:\s*"([^"]+)"[\s\S]*?---/);
    const title = titleMatch ? titleMatch[1] : cleanSlug;

    return { slug: cleanSlug, type: 'markdown', markdown: stripped, title };
};