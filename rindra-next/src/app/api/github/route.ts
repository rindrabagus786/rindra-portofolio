import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME || 'andurila19-lgtm';

    try {
        const headers: Record<string, string> = {
            Accept: 'application/vnd.github.v3+json',
        };
        if (token) headers.Authorization = `Bearer ${token}`;

        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
            headers,
            next: { revalidate: 3600 },
        });

        if (!userRes.ok) throw new Error('GitHub user API failed');
        const user = await userRes.json();

        // Fetch repos
        const reposRes = await fetch(
            `https://api.github.com/users/${username}/repos?sort=stars&per_page=10&type=owner`,
            { headers, next: { revalidate: 3600 } }
        );

        const repos = reposRes.ok ? await reposRes.json() : [];

        const totalStars = repos.reduce(
            (acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count,
            0
        );

        const topRepos = repos
            .slice(0, 5)
            .map((repo: { name: string; stargazers_count: number; language: string; description: string }) => ({
                name: repo.name,
                stars: repo.stargazers_count,
                language: repo.language || 'Unknown',
                description: repo.description || '',
            }));

        return NextResponse.json({
            publicRepos: user.public_repos || 0,
            followers: user.followers || 0,
            totalStars,
            topRepos,
            contributions: {
                total: 128, // Basic mock for heatmap support
                thisWeek: 48,
                best: 39,
                average: '0'
            },
            username: username
        });
    } catch {
        return NextResponse.json({
            publicRepos: 0,
            followers: 0,
            totalStars: 0,
            topRepos: [],
            contributions: {
                total: 128,
                thisWeek: 48,
                best: 39,
                average: '0'
            },
            username: username
        });
    }
}
