import { authClient } from "@/lib/auth-client";

export default async function Dashboard() {
  const session = await authClient.getSession();

  return <div>Dashboard</div>;
}
