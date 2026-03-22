import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const prerender = false;

export const load: PageLoad = async ({ params, fetch }) => {
    const cleanSlug = params.slug.replace(/\/+$/, '');

    // If its a pdf or zip
    const lowerSlug = cleanSlug.toLowerCase();
    if (lowerSlug.endsWith('.pdf') || lowerSlug.endsWith('.zip') || lowerSlug.endsWith('.cpp') || lowerSlug.endsWith('.py')) {
        throw redirect(302, `/competitions-data/${cleanSlug}`);
    }

    // If its a leaderboard
    if (cleanSlug.endsWith('leaderboard')) {
        const targetUrl = `/competitions-data/${cleanSlug}.html`;
        const response = await fetch(targetUrl);

        if (response.ok) {
            const rawText = await response.text();

            if (rawText.trim().toLowerCase().startsWith('<!doctype html>')) {
                return { slug: cleanSlug, type: 'html', html: null, title: cleanSlug };
            }

            const competitionPath = cleanSlug.substring(0, cleanSlug.lastIndexOf('/'));
            const stripped = rawText.replace(/^[\s\S]*?---[\s\S]*?---[\r\n]*/, '').trim();
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

    const stripped = rawText.replace(/^[\s\S]*?---[\s\S]*?---[\r\n]*/, '').trim();
    const titleMatch = rawText.match(/^\s*---[\s\S]*?title:\s*"([^"]+)"[\s\S]*?---/);
    const title = titleMatch ? titleMatch[1] : cleanSlug;

    return { slug: cleanSlug, type: 'markdown', markdown: stripped, title };
};