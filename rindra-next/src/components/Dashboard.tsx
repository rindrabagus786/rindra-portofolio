'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    BarChart3,
    Github,
    Clock,
    Globe,
    Calendar,
    Zap,
    TrendingUp,
    Users,
    MousePointer2,
    Shield,
    CheckCircle2,
} from 'lucide-react';

// --- Types ---
interface WakaTimeStats {
    totalCodingTime: string;
    languages: { name: string; percent: number; color: string }[];
    dailyAverage: string;
    range: { start: string; end: string };
    bestDay: { date: string; duration: string };
}

interface GithubStats {
    publicRepos: number;
    followers: number;
    totalStars: number;
    contributions: {
        total: number;
        thisWeek: number;
        best: number;
        average: string;
    };
    username: string;
}

interface UmamiStats {
    pageviews: number;
    visitors: number;
    visits: number;
    countries: number;
    events: number;
}

// --- Sub-components ---

function SectionHeader({ title, subtitle, icon: Icon, accentColor }: { title: string, subtitle: string, icon: any, accentColor?: string }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-1 text-cyber-primary">
                <Icon size={24} />
                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">{title}</h3>
            </div>
            <p className="text-sm text-gray-500 font-sans">{subtitle}</p>
        </div>
    );
}

function StatCard({ label, value, subValue, highlight = false }: { label: string, value: string | number, subValue?: string, highlight?: boolean }) {
    return (
        <div className={`p-4 rounded-xl border border-white/5 bg-[#0a0a0a] transition-all hover:bg-[#111] group`}>
            <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-3">{label}</span>
            <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl font-display font-bold ${highlight ? 'text-cyber-primary' : 'text-white'}`}>
                    {value}
                </span>
                {subValue && <span className="text-[10px] text-gray-600 font-mono">{subValue}</span>}
            </div>
        </div>
    );
}

function LanguageBar({ name, percent, color }: { name: string, percent: number, color: string }) {
    return (
        <div className="flex items-center gap-4">
            <span className="w-20 text-[11px] font-mono text-gray-400 truncate uppercase">{name}</span>
            <div className="flex-1 h-2 bg-black rounded-full overflow-hidden border border-white/5">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-cyber-primary shadow-[0_0_8px_var(--color-cyber-primary)] opacity-80"
                />
            </div>
            <span className="w-8 text-right text-[11px] font-mono text-white font-bold">{percent}%</span>
        </div>
    );
}

// --- Main Sections ---

function UmamiSection({ stats }: { stats: UmamiStats }) {
    return (
        <div className="mb-12">
            <SectionHeader
                icon={BarChart3}
                title="Umami"
                subtitle="Pantau trafik dan interaksi real-time dari situs portofolio saya."
            />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                <StatCard label="Dilihat" value={(stats.pageviews || 0).toLocaleString()} highlight />
                <StatCard label="Pengunjung" value={(stats.visitors || 0).toLocaleString()} highlight />
                <StatCard label="Kunjungan" value={(stats.visits || 0).toLocaleString()} highlight />
                <StatCard label="Negara" value={stats.countries || 0} highlight />
                <StatCard label="Acara" value={stats.events || 0} highlight />
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 relative h-52 flex flex-col justify-end">
                <div className="absolute top-6 left-6 flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#a3a375]/50" />
                        <span className="text-[10px] text-gray-600 font-mono">Sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyber-primary" />
                        <span className="text-[10px] text-gray-600 font-mono">Page views</span>
                    </div>
                </div>

                <div className="flex items-end gap-2 h-32">
                    <div className="flex-1 flex flex-col justify-end gap-1">
                        <div className="w-full bg-[#a3a375]/15 h-1/4 rounded-[1px]" />
                        <div className="w-full bg-cyber-primary h-3/4 rounded-[1px] shadow-[0_0_10px_var(--color-cyber-primary)] opacity-50" />
                        <span className="text-[10px] text-gray-700 font-mono text-center mt-3">Feb</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-end gap-1">
                        <div className="w-full bg-[#a3a375]/15 h-1/6 rounded-[1px]" />
                        <div className="w-full bg-cyber-primary h-1/3 rounded-[1px] shadow-[0_0_10px_var(--color-cyber-primary)] opacity-50" />
                        <span className="text-[10px] text-gray-700 font-mono text-center mt-3">Mar</span>
                    </div>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex-1 h-full hidden md:flex flex-col justify-end">
                            <div className="w-full h-0" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function GithubSection({ stats }: { stats: GithubStats }) {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <Github size={24} className="text-white" />
                    <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Kontribusi GitHub</h3>
                </div>
                <span className="text-xs font-mono text-gray-600">@andurila19-lgtm</span>
            </div>
            <p className="text-base text-gray-500 font-sans mb-8">Aktivitas GitHub saya selama setahun terakhir.</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <StatCard label="Total" value={stats.contributions.total} highlight />
                <StatCard label="Minggu ini" value={stats.contributions.thisWeek} highlight />
                <StatCard label="Terbaik" value={stats.contributions.best} highlight />
                <StatCard label="Rata-rata" value={stats.contributions.average} subValue="/ hari" highlight />
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                <div className="flex justify-between text-[10px] text-gray-700 font-mono mb-3 uppercase font-bold">
                    <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
                </div>
                <div className="grid grid-flow-col grid-rows-7 gap-1 h-32 mb-6">
                    {[...Array(350)].map((_, i) => (
                        <div
                            key={i}
                            className={`rounded-[1px] ${i > 330 ? (i % 5 === 0 ? 'bg-cyber-primary' : 'bg-cyber-primary/60') :
                                i === 180 ? 'bg-cyber-primary/30' :
                                    i === 250 ? 'bg-cyber-primary/15' :
                                        'bg-[#1a1a1a]'
                                }`}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Sedikit</span>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 bg-[#1a1a1a] rounded-[1px]" />
                            <div className="w-2.5 h-2.5 bg-cyber-primary/30 rounded-[1px]" />
                            <div className="w-2.5 h-2.5 bg-cyber-primary/60 rounded-[1px]" />
                            <div className="w-2.5 h-2.5 bg-cyber-primary rounded-[1px]" />
                        </div>
                        <span className="text-gray-600">Banyak</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WakatimeSection({ stats }: { stats: WakaTimeStats }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-white" />
                    <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Statistik WakaTime</h3>
                </div>
                <span className="text-xs font-mono text-gray-600">Pembaruan Terakhir: 1 jam yang lalu</span>
            </div>
            <p className="text-base text-gray-500 font-sans mb-8">Aktivitas coding selama 7 hari terakhir.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <StatCard label="Tanggal Mulai" value={stats.range.start} />
                <StatCard label="Tanggal Selesai" value={stats.range.end} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <StatCard label="Rata-rata Waktu Coding Harian" value={stats.dailyAverage} />
                <StatCard label="Total Minggu Ini" value={stats.totalCodingTime} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                <StatCard label="Hari Terbaik" value={stats.bestDay.date} subValue={`(${stats.bestDay.duration})`} />
                <StatCard label="Total Coding Sejak Bergabung" value={stats.totalCodingTime} />
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                <h4 className="text-xs font-mono text-gray-500 mb-6 uppercase tracking-[0.2em] font-bold">Bahasa Teratas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-7">
                    {stats.languages.map((lang, i) => (
                        <LanguageBar key={lang.name} name={lang.name} percent={lang.percent} color={lang.color} />
                    ))}
                </div>
            </div>
        </div>
    );
}


// --- Main Dashboard ---

export default function Dashboard() {
    const [wakatime, setWakatime] = useState<WakaTimeStats | null>(null);
    const [github, setGithub] = useState<GithubStats | null>(null);
    const [umami, setUmami] = useState<UmamiStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [wRes, gRes, uRes] = await Promise.allSettled([
                    fetch('/api/wakatime').then((r) => r.json()),
                    fetch('/api/github').then((r) => r.json()),
                    fetch('/api/umami').then((r) => r.json()),
                ]);

                if (wRes.status === 'fulfilled') setWakatime(wRes.value);
                if (gRes.status === 'fulfilled') setGithub(gRes.value);
                if (uRes.status === 'fulfilled') setUmami(uRes.value);
            } catch (err) {
                console.error('Dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Fallback Data with theme styling
    const umStats = umami || {
        pageviews: 1071,
        visitors: 146,
        visits: 223,
        countries: 18,
        events: 57
    };

    const ghStats = github || {
        username: 'rindrabagus786',
        publicRepos: 12,
        followers: 45,
        totalStars: 89,
        contributions: {
            total: 128,
            thisWeek: 48,
            best: 39,
            average: '0'
        }
    };

    const wkStats = wakatime || {
        totalCodingTime: '2 hrs 28 mins',
        dailyAverage: '29 mins',
        range: { start: 'February 20, 2026', end: 'February 26, 2026' },
        bestDay: { date: 'February 25, 2026', duration: '2 hrs 28 mins' },
        languages: [
            { name: 'TypeScript', percent: 38, color: 'bg-cyber-primary' },
            { name: 'Bash', percent: 35, color: 'bg-cyber-primary' },
            { name: 'TOML', percent: 10, color: 'bg-cyber-primary' },
            { name: 'Markdown', percent: 9, color: 'bg-cyber-primary' },
            { name: 'SQL', percent: 6, color: 'bg-cyber-primary' },
            { name: 'JSON', percent: 1, color: 'bg-cyber-primary' },
        ],
    };

    return (
        <section id="dashboard" className="py-12 relative overflow-hidden bg-cyber-black">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-primary/10 rounded-full blur-[100px] pointer-events-none opacity-20" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyber-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Dashboard Main Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center md:text-left"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary font-mono text-[10px] tracking-[0.3em] uppercase">
                        <Activity size={12} />
                        <span>System_Diagnostics</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-black text-white">
                        DASHBOARD <span className="text-cyber-primary">AKTIVITAS</span>
                    </h2>
                    <div className="h-1 w-24 bg-cyber-primary mt-4" />
                </motion.div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-16 h-16 border-2 border-cyber-primary/20 border-t-cyber-primary rounded-full animate-spin" />
                        <span className="font-mono text-xs text-cyber-primary animate-pulse uppercase tracking-widest">Initialising_Stream...</span>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <UmamiSection stats={umStats} />
                        <GithubSection stats={ghStats} />
                        <WakatimeSection stats={wkStats} />
                    </motion.div>
                )}

                {/* Security/Verify Footer */}
                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-wrap items-center justify-between gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-4 text-xs font-mono">
                        <Shield size={14} className="text-cyber-primary" />
                        <span>ENCRYPTED_DATA_TRANSIT</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span>ALL_SYSTEMS_OPERATIONAL</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                        <MousePointer2 size={14} className="text-cyber-primary" />
                        <span>INTERACTIVE_MODULE_ACTIVE</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
