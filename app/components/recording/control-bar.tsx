"use client";

import React, { useState, useEffect } from "react";
import {
  Mic,
  Video,
  VideoOff,
  GripVertical,
  Square,
  RotateCcw,
  Pause,
  Trash2,
  Pen,
  MousePointer2,
  Target,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlBarProps {
  status:
  | "idle"
  | "dest"
  | "initializing"
  | "recording"
  | "stopping"
  | "completed"
  | "error";
  onStartRecording: () => void;
  onStopRecording: () => void;
  webcamEnabled: boolean;
  onToggleWebcam: () => void;
  recordingDuration?: number; // Pass duration for the timer if available
  onReset?: () => void;
  onPause?: () => void;
  onDelete?: () => void;
}

export function ControlBar({
  status,
  onStartRecording,
  onStopRecording,
  webcamEnabled,
  onToggleWebcam,
  recordingDuration = 0,
  onReset,
  onPause,
  onDelete,
}: ControlBarProps) {
  const [formattedTime, setFormattedTime] = useState("00:00");

  useEffect(() => {
    const mins = Math.floor(recordingDuration / 60);
    const secs = recordingDuration % 60;
    setFormattedTime(
      `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`,
    );
  }, [recordingDuration]);

  if (status === "idle") {
    return (
      <div className="h-24 flex flex-col items-center justify-center pb-6 gap-4">
        {/* Webcam Toggle - Before Recording */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleWebcam}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium",
              webcamEnabled
                ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 ring-1 ring-purple-500/30"
                : "bg-white/10 text-white/50 hover:bg-white/20",
            )}
            title="Toggle Webcam"
          >
            {webcamEnabled ? (
              <Video className="w-4 h-4" />
            ) : (
              <VideoOff className="w-4 h-4" />
            )}
            <span>{webcamEnabled ? "Webcam On" : "Webcam Off"}</span>
          </button>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartRecording}
          className="group relative flex items-center justify-center gap-3 bg-white hover:bg-white/95 text-black px-8 py-3.5 rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer font-semibold text-base"
        >
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
          <span>Start Recording</span>
        </button>
      </div>
    );
  }

  return (
    <div className="h-16 flex items-center justify-center pointer-events-none pb-6">
      {/* Floating Bar Container */}
      <div className="pointer-events-auto bg-[#1a1a1a]/95 backdrop-blur-xl rounded-full shadow-[0_8px_40px_rgb(0,0,0,0.5)] border border-white/10 p-1 flex items-center gap-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
        {/* Main Controls Group */}
        <div className="flex items-center bg-[#0a0a0a] rounded-full px-2 py-1 gap-1.5">
          {/* Stop Button */}
          <button
            onClick={onStopRecording}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#1a1a1a] transition-all text-white/60 hover:text-red-400 group"
            title="Stop Recording"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full group-hover:bg-red-500/20 transition-all duration-200">
              <div className="w-3 h-3 bg-white rounded-[3px] shadow-sm transform group-hover:scale-110 transition-transform" />
            </div>
          </button>

          {/* Timer */}
          <div className="px-4 font-mono text-white font-semibold min-w-20 text-center select-none text-base">
            {formattedTime}
          </div>

          {/* Restart */}
          <button
            onClick={onReset}
            className="w-9 h-9 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
            title="Restart"
          >
            <RotateCcw className="w-4.5 h-4.5" />
          </button>

          {/* Pause */}
          <button
            onClick={onPause}
            className="w-9 h-9 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
            title="Pause"
          >
            <Pause className="w-4.5 h-4.5" />
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="w-9 h-9 flex items-center justify-center rounded-full text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            title="Delete"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-9 bg-white/10" />

        {/* Tools Group */}
        <div className="text-white/40">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:text-white hover:bg-white/10 transition-all duration-200">
            <Pen className="w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-9 bg-white/10" />

        {/* Toggles Group */}
        <div className="flex items-center gap-2 pr-1.5">
          {/* Cam Toggle */}
          <button
            onClick={onToggleWebcam}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200",
              webcamEnabled
                ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 ring-1 ring-purple-500/30"
                : "bg-white/10 text-white/40 hover:bg-white/20",
            )}
            title="Toggle Webcam"
          >
            {webcamEnabled ? (
              <Video className="w-4 h-4" />
            ) : (
              <VideoOff className="w-4 h-4" />
            )}
          </button>

          {/* Mic Toggle */}
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 cursor-pointer hover:bg-emerald-500/30 transition-all duration-200 ring-1 ring-emerald-500/30">
            <Mic className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
