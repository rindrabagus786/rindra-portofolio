'use client';

import { useState, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggle = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    }, []);

    return (
        <>
            <audio ref={audioRef} src="/te-conoci-slowed-cut.mp3" loop preload="none" />
            <button
                onClick={toggle}
                className="fixed bottom-5 left-5 z-50 p-3 rounded-full bg-cyber-gray/50 backdrop-blur-sm text-cyber-primary hover:bg-cyber-primary hover:text-cyber-black transition-colors"
                aria-label="Toggle Music"
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
        </>
    );
}
