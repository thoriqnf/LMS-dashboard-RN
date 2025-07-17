import { redirect } from "next/navigation";

export default function Dashboard() {
  // Redirect root path to first session
  redirect("/day1/session-1");
}
