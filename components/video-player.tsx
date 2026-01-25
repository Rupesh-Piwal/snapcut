'use client';

import React from "react"

import { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface VideoPlayerProps {
    src: string | undefined;
    autoPlay?: boolean;
}

export function VideoPlayer({ src, autoPlay = true }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlayPause = () => setIsPlaying(!video.paused);
        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);

        video.addEventListener('play', handlePlayPause);
        video.addEventListener('pause', handlePlayPause);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        if (autoPlay) {
            video.play();
        }

        return () => {
            video.removeEventListener('play', handlePlayPause);
            video.removeEventListener('pause', handlePlayPause);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [autoPlay]);

    const handlePlayPauseClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = percent * duration;
    };

    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div
            className="relative w-full aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl overflow-hidden shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-contain"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

            {/* Custom Controls Container */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {/* Play/Pause Button */}
                <button
                    onClick={handlePlayPauseClick}
                    className="relative group"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {/* Animated ring background */}
                    <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-all duration-300 scale-100 group-hover:scale-110 animate-pulse" />

                    {/* Icon container */}
                    <div className="relative w-20 h-20 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-white/25 transition-all duration-300 shadow-lg">
                        {isPlaying ? (
                            <Pause
                                className="w-8 h-8 text-white fill-white transition-transform duration-300 group-hover:scale-110"
                            />
                        ) : (
                            <Play
                                className="w-8 h-8 text-white fill-white transition-transform duration-300 group-hover:scale-110 ml-1"
                            />
                        )}
                    </div>
                </button>
            </div>

            {/* Progress Bar */}
            <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <div
                    className="h-1 bg-gradient-to-r from-green-500 to-green-600 hover:h-1.5 cursor-pointer transition-all duration-200"
                    style={{
                        width: duration ? `${(currentTime / duration) * 100}%` : '0%',
                    }}
                    onClick={handleProgressClick}
                />
                <div
                    className="h-1 bg-neutral-300/30 hover:bg-neutral-300/50 cursor-pointer transition-all duration-200"
                    style={{
                        width: duration ? `${100 - (currentTime / duration) * 100}%` : '100%',
                    }}
                    onClick={handleProgressClick}
                />
            </div>

            {/* Time Display */}
            <div
                className={`absolute bottom-4 right-4 text-sm font-medium text-white transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
            >
                {formatTime(currentTime)} / {formatTime(duration)}
            </div>
        </div>
    );
}
