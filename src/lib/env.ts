/**
 * Environment variable validation.
 * Throws at build time if required vars are missing.
 */

function getRequired(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
        "Please check your .env.local file."
    );
  }
  return value;
}

function getOptional(key: string, defaultValue = ""): string {
  return process.env[key] ?? defaultValue;
}

/**
 * App configuration derived from environment variables.
 * All values are validated at startup.
 */
export const env = {
  // Node
  nodeEnv: getOptional("NODE_ENV", "development") as
    | "development"
    | "production"
    | "test",

  // App
  appUrl: getOptional("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),

  // Feature flags
  features: {
    voiceTranscription: getOptional("NEXT_PUBLIC_VOICE_TRANSCRIPTION", "true") === "true",
    aiSummary: getOptional("NEXT_PUBLIC_AI_SUMMARY", "true") === "true",
    teleconsult: getOptional("NEXT_PUBLIC_TELECONSULT", "true") === "true",
  },
} as const;

export const isDev = env.nodeEnv === "development";
export const isProd = env.nodeEnv === "production";
