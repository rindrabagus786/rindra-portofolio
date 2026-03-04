import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
    const websiteId = process.env.UMAMI_WEBSITE_ID;
    const apiToken = process.env.UMAMI_API_TOKEN;
    const apiUrl = process.env.UMAMI_API_URL || 'https://cloud.umami.is';

    if (!websiteId || !apiToken) {
        return NextResponse.json({
            pageviews: 0,
            visitors: 0,
            bounceRate: '—',
            avgVisitDuration: '—',
        });
    }

    try {
        const now = Date.now();
        const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

        const res = await fetch(
            `${apiUrl}/api/websites/${websiteId}/stats?startAt=${thirtyDaysAgo}&endAt=${now}`,
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                    Accept: 'application/json',
                },
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) throw new Error('Umami API failed');
        const data = await res.json();

        const bounceRate = data.bounces && data.visits
            ? `${Math.round((data.bounces.value / data.visits.value) * 100)}%`
            : '—';

        const avgDuration = data.totaltime && data.visits
            ? `${Math.round(data.totaltime.value / data.visits.value / 60)}m`
            : '—';

        return NextResponse.json({
            pageviews: data.pageviews?.value || 0,
            visitors: data.visitors?.value || 0,
            visits: data.visits?.value || 0,
            countries: data.countries?.value || 0,
            events: data.events?.value || 0,
            bounceRate,
            avgVisitDuration: avgDuration,
        });
    } catch {
        return NextResponse.json({
            pageviews: 0,
            visitors: 0,
            visits: 0,
            countries: 0,
            events: 0,
            bounceRate: '—',
            avgVisitDuration: '—',
        });
    }
}
