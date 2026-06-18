"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { TranscriptionStatus, TranscriptionSegment } from "@/types";
import { generateId } from "@/lib/utils";

export interface UseTranscriptionReturn {
  status: TranscriptionStatus;
  segments: TranscriptionSegment[];
  duration: number;
  volume: number;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  resetTranscription: () => void;
}

/**
 * Hook for managing voice transcription recording state.
 * In production this would connect to a WebSocket streaming ASR service.
 */
export function useTranscription(): UseTranscriptionReturn {
  const [status, setStatus] = useState<TranscriptionStatus>("idle");
  const [segments, setSegments] = useState<TranscriptionSegment[]>([]);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const durationRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Mock segments that simulate real-time transcription
  const MOCK_WORDS: Array<{ speaker: "doctor" | "patient"; text: string }> = [
    { speaker: "doctor", text: "Good morning. How are you feeling today?" },
    { speaker: "patient", text: "I've been experiencing some chest discomfort." },
    { speaker: "doctor", text: "Can you describe the pain? Is it sharp or dull?" },
    { speaker: "patient", text: "It's more of a pressure feeling, especially when I walk upstairs." },
    { speaker: "doctor", text: "How long have you been experiencing this?" },
    { speaker: "patient", text: "About two weeks now. It seems to be getting worse." },
  ];
  let mockIndex = 0;

  const measureVolume = useCallback(() => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.fftSize);
    analyserRef.current.getByteTimeDomainData(dataArray);
    const rms = Math.sqrt(
      dataArray.reduce((sum, val) => sum + Math.pow(val - 128, 2), 0) / dataArray.length
    );
    setVolume(Math.min(rms / 50, 1));
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setStatus("recording");

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Set up audio analysis for volume visualization
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Tick duration counter
      durationRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
        measureVolume();
      }, 1000);

      // Simulate incremental transcription
      intervalRef.current = setInterval(() => {
        const word = MOCK_WORDS[mockIndex % MOCK_WORDS.length];
        if (word) {
          setSegments((prev) => [
            ...prev,
            {
              id: generateId("seg"),
              speaker: word.speaker,
              text: word.text,
              startTime: prev.length * 5,
              endTime: prev.length * 5 + 4.8,
              confidence: 0.9 + Math.random() * 0.09,
            },
          ]);
          mockIndex++;
        }
      }, 4000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Microphone access denied or unavailable."
      );
      setStatus("error");
    }
  }, [measureVolume]);

  const stopRecording = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (durationRef.current) clearInterval(durationRef.current);
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    audioContextRef.current?.close();
    setStatus("processing");
    setVolume(0);

    // Simulate processing delay
    setTimeout(() => setStatus("done"), 2000);
  }, []);

  const pauseRecording = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (durationRef.current) clearInterval(durationRef.current);
    setStatus("idle");
  }, []);

  const resumeRecording = useCallback(() => {
    setStatus("recording");
    durationRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
      measureVolume();
    }, 1000);
  }, [measureVolume]);

  const resetTranscription = useCallback(() => {
    stopRecording();
    setSegments([]);
    setDuration(0);
    setError(null);
    setStatus("idle");
  }, [stopRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (durationRef.current) clearInterval(durationRef.current);
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      audioContextRef.current?.close();
    };
  }, []);

  return {
    status,
    segments,
    duration,
    volume,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetTranscription,
  };
}
