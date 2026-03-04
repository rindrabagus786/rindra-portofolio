'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus, Send, Star, User, MessageCircle, Loader2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import type { Feedback } from '@/types';

export default function Saran() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(5);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const fetchFeedbacks = useCallback(async () => {
        try {
            const sb = getSupabase();
            if (!sb) return;
            const { data, error } = await sb
                .from('feedbacks')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(6);

            if (!error && data) setFeedbacks(data);
        } catch {
            // Silently fail - feedbacks are supplementary
        }
    }, []);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) {
            setError('Nama dan pesan wajib diisi.');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const sb = getSupabase();
            if (!sb) throw new Error('Supabase not configured');
            const { error: insertError } = await sb
                .from('feedbacks')
                .insert([{ name: name.trim(), message: message.trim(), rating }]);

            if (insertError) throw insertError;

            setSubmitted(true);
            setName('');
            setMessage('');
            setRating(5);
            fetchFeedbacks();

            setTimeout(() => setSubmitted(false), 3000);
        } catch {
            setError('Gagal mengirim saran. Pastikan koneksi Supabase sudah dikonfigurasi.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="saran" className="py-24 relative overflow-hidden bg-black/20">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyber-secondary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-cyber-secondary/10 border border-cyber-secondary/30 text-cyber-secondary font-mono text-xs tracking-widest">
                        <MessageSquarePlus size={14} />
                        <span>MASUKAN_PUBLIK</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        SARAN &{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-secondary to-cyber-primary">
                            MASUKAN
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Bantu saya berkembang. Kirim saran, kritik, atau pesan dukungan Anda.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-cyber-dark/60 backdrop-blur-md border border-gray-800 rounded-xl p-6 space-y-5"
                        >
                            <div>
                                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                                    <User size={12} className="inline mr-1" /> Nama
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Siapa nama Anda?"
                                    className="w-full bg-cyber-black/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyber-primary focus:outline-none focus:ring-1 focus:ring-cyber-primary/50 transition-all font-sans"
                                    maxLength={50}
                                    suppressHydrationWarning
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                                    <MessageCircle size={12} className="inline mr-1" /> Pesan
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tulis saran atau masukan Anda..."
                                    rows={4}
                                    className="w-full bg-cyber-black/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyber-primary focus:outline-none focus:ring-1 focus:ring-cyber-primary/50 transition-all resize-none font-sans"
                                    maxLength={500}
                                    suppressHydrationWarning
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                                    Rating
                                </label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoveredStar(star)}
                                            onMouseLeave={() => setHoveredStar(0)}
                                            className="p-1 transition-transform hover:scale-110"
                                            suppressHydrationWarning
                                        >
                                            <Star
                                                size={24}
                                                className={`transition-colors ${star <= (hoveredStar || rating)
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-600'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm font-mono bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                                    {error}
                                </div>
                            )}

                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 font-mono text-sm"
                                    >
                                        ✓ Terima kasih atas masukan Anda!
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        type="submit"
                                        disabled={submitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 bg-gradient-to-r from-cyber-secondary to-cyber-primary text-cyber-black font-display font-bold text-lg rounded-lg hover:shadow-[0_0_20px_rgba(188,19,254,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                                        suppressHydrationWarning
                                    >
                                        {submitting ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={18} /> KIRIM SARAN
                                            </>
                                        )}
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    {/* Existing Feedbacks */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                            <MessageCircle size={18} className="text-cyber-secondary" />
                            Masukan Terbaru
                        </h3>

                        {feedbacks.length === 0 ? (
                            <div className="bg-cyber-dark/40 border border-gray-800 rounded-xl p-8 text-center">
                                <MessageSquarePlus size={32} className="text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-500 font-mono text-sm">
                                    Belum ada masukan. Jadilah yang pertama!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                                {feedbacks.map((fb, i) => (
                                    <motion.div
                                        key={fb.id || i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-cyber-dark/60 border border-gray-800 rounded-xl p-4 hover:border-cyber-primary/30 transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-display font-bold text-white text-sm">{fb.name}</span>
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star
                                                        key={s}
                                                        size={12}
                                                        className={
                                                            s <= fb.rating
                                                                ? 'text-yellow-400 fill-yellow-400'
                                                                : 'text-gray-700'
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed">{fb.message}</p>
                                        {fb.created_at && (
                                            <div className="text-[10px] font-mono text-gray-600 mt-2" suppressHydrationWarning>
                                                {new Date(fb.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
