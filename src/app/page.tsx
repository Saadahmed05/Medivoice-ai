import { redirect } from "next/navigation";

/**
 * Root route redirects to the dashboard.
 * In production this would check authentication state first.
 */
export default function RootPage() {
  redirect("/dashboard");
}
