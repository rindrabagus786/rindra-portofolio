import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
        return NextResponse.json({
            totalCodingTime: '—',
            dailyAverage: '—',
            range: { start: '—', end: '—' },
            bestDay: { date: '—', duration: '—' },
            languages: [
                { name: 'TypeScript', percent: 45, color: 'from-[#3178C6] to-blue-800' },
                { name: 'CSS', percent: 25, color: 'from-[#38BDF8] to-cyan-600' },
                { name: 'JavaScript', percent: 20, color: 'from-yellow-400 to-orange-500' },
                { name: 'PHP', percent: 10, color: 'from-purple-500 to-indigo-600' },
            ],
        });
    }

    try {
        const encoded = Buffer.from(apiKey).toString('base64');
        const headers = { Authorization: `Basic ${encoded}` };

        const res = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
            headers,
            next: { revalidate: 3600 },
        });

        if (!res.ok) throw new Error('WakaTime API failed');
        const data = await res.json();

        const colorMap: Record<string, string> = {
            TypeScript: 'from-[#3178C6] to-blue-800',
            JavaScript: 'from-yellow-400 to-orange-500',
            CSS: 'from-[#38BDF8] to-cyan-600',
            PHP: 'from-purple-500 to-indigo-600',
            HTML: 'from-orange-500 to-red-500',
            Vue: 'from-green-400 to-emerald-600',
            Python: 'from-blue-400 to-yellow-400',
        };

        const languages = (data.data?.languages || [])
            .slice(0, 5)
            .map((lang: { name: string; percent: number }) => ({
                name: lang.name,
                percent: Math.round(lang.percent),
                color: colorMap[lang.name] || 'from-cyber-primary to-cyber-secondary',
            }));

        return NextResponse.json({
            totalCodingTime: data.data?.human_readable_total || '—',
            dailyAverage: data.data?.human_readable_daily_average || '—',
            range: {
                start: data.data?.human_readable_range?.split(' - ')[0] || '—',
                end: data.data?.human_readable_range?.split(' - ')[1] || '—'
            },
            bestDay: {
                date: data.data?.best_day?.date || '—',
                duration: data.data?.best_day?.text || '—'
            },
            languages,
        });
    } catch {
        return NextResponse.json({
            totalCodingTime: '—',
            dailyAverage: '—',
            range: { start: '—', end: '—' },
            bestDay: { date: '—', duration: '—' },
            languages: [],
        });
    }
}
