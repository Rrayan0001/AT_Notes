import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ChartsDashboard } from "@/components/charts-dashboard";

export const metadata = { title: "My charts — AXIOM" };

export default async function ChartsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <ChartsDashboard />;
}
