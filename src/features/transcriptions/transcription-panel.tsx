"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, RotateCcw, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { cn, formatDuration, formatConfidence } from "@/lib/utils";
import { useTranscription } from "@/hooks/use-transcription";
import type { TranscriptionSegment } from "@/types";

// ─── Volume Visualizer ────────────────────────────────────────────────────────

function VolumeVisualizer({ volume, active }: { volume: number; active: boolean }) {
  const barCount = 14;
  return (
    <div className="flex items-center justify-center gap-0.5 h-10" aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => {
        const position = i / (barCount - 1);
        const distFromCenter = Math.abs(position - 0.5) * 2;
        const baseHeight = 0.15 + (1 - distFromCenter) * 0.85;
        const height = active
          ? Math.max(0.1, baseHeight * (0.3 + volume * 0.7 + Math.random() * 0.2))
          : 0.12;

        return (
          <motion.div
            key={i}
            animate={{ scaleY: height }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className={cn(
              "w-1 rounded-full origin-center",
              active
                ? "bg-gradient-to-t from-primary-600 to-primary-400"
                : "bg-slate-200"
            )}
            style={{ height: 40 }}
          />
        );
      })}
    </div>
  );
}

// ─── Segment Item ─────────────────────────────────────────────────────────────

function SegmentItem({ segment }: { segment: TranscriptionSegment }) {
  const isDoctor = segment.speaker === "doctor";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-2.5", isDoctor ? "flex-row" : "flex-row-reverse")}
    >
      <Avatar
        name={isDoctor ? "Dr. Michael Chen" : "Patient"}
        size="xs"
        className="shrink-0 mt-0.5"
      />
      <div
        className={cn(
          "max-w-[78%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed",
          isDoctor
            ? "bg-primary-50 border border-primary-100 text-slate-800 rounded-tl-sm"
            : "bg-slate-100 border border-slate-200 text-slate-700 rounded-tr-sm"
        )}
      >
        <p>{segment.text}</p>
        <p className={cn(
          "text-[10px] mt-1 font-medium",
          isDoctor ? "text-primary-400" : "text-slate-400"
        )}>
          {isDoctor ? "Doctor" : "Patient"} · {formatConfidence(segment.confidence)}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Transcription Panel ──────────────────────────────────────────────────────

export function TranscriptionPanel() {
  const {
    status,
    segments,
    duration,
    volume,
    error,
    startRecording,
    stopRecording,
    resetTranscription,
  } = useTranscription();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [segments]);

  const isRecording  = status === "recording";
  const isProcessing = status === "processing";
  const isDone       = status === "done";
  const hasError     = status === "error";

  return (
    <Card className="flex flex-col h-full min-h-[480px]">
      <CardHeader>
        <div className="flex items-start justify-between">
          {/* Title row */}
          <div className="flex items-center gap-2.5">
            <div className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300",
              isRecording ? "bg-red-50" : "bg-accent-50"
            )}>
              <Mic
                className={cn(
                  "h-4.5 w-4.5 transition-colors duration-300",
                  isRecording ? "text-red-500 recording-dot" : "text-accent-600"
                )}
                strokeWidth={2}
              />
            </div>
            <div>
              <CardTitle>Voice Transcription</CardTitle>
              <CardDescription>AI-powered clinical documentation</CardDescription>
            </div>
          </div>

          {/* Status badge + timer */}
          <div className="flex items-center gap-2">
            {isRecording && (
              <Badge variant="destructive" pulse>Recording</Badge>
            )}
            {isProcessing && (
              <Badge variant="warning" pulse>Processing</Badge>
            )}
            {isDone && (
              <Badge variant="success">
                <CheckCircle2 className="h-3 w-3" /> Complete
              </Badge>
            )}
            {hasError && (
              <Badge variant="destructive">
                <AlertCircle className="h-3 w-3" /> Error
              </Badge>
            )}
            {(isRecording || isDone) && (
              <span className="text-[12px] font-mono text-slate-500 tabular-nums">
                {formatDuration(Math.floor(duration / 60))}:{String(duration % 60).padStart(2, "0")}
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-4">
        {/* Visualizer area */}
        <div className={cn(
          "flex items-center justify-center rounded-xl border py-4 transition-all duration-300",
          isRecording
            ? "border-red-200 bg-red-50/50"
            : "border-slate-100 bg-slate-50"
        )}>
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2 py-1">
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
                <p className="text-sm text-slate-600 font-medium">Processing…</p>
              </div>
              <Progress value={65} gradient color="primary" size="sm" className="w-40 mt-1" />
            </div>
          ) : (
            <VolumeVisualizer volume={volume} active={isRecording} />
          )}
        </div>

        {/* Error */}
        {hasError && error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Transcript scroll */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-3 min-h-[180px] max-h-[260px] pr-1"
          aria-label="Transcription output"
          aria-live="polite"
        >
          <AnimatePresence initial={false}>
            {segments.length === 0 && !isRecording ? (
              <div className="flex h-full min-h-[160px] flex-col items-center justify-center text-center gap-2">
                <Sparkles className="h-7 w-7 text-slate-200" />
                <p className="text-[13px] text-slate-400 font-medium">
                  Press Start Recording to begin
                </p>
                <p className="text-[11px] text-slate-400">
                  AI will transcribe and summarize your session
                </p>
              </div>
            ) : (
              segments.map((seg) => (
                <SegmentItem key={seg.id} segment={seg} />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
          {!isRecording && !isProcessing ? (
            <Button onClick={startRecording} disabled={isDone} className="flex-1" size="lg">
              <Mic className="h-4 w-4" />
              {isDone ? "Transcription Complete" : "Start Recording"}
            </Button>
          ) : (
            <Button onClick={stopRecording} variant="destructive" className="flex-1" size="lg">
              <Square className="h-4 w-4 fill-current" />
              Stop Recording
            </Button>
          )}

          <Button
            onClick={resetTranscription}
            variant="outline"
            size="icon-lg"
            aria-label="Reset transcription"
            disabled={isProcessing}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
