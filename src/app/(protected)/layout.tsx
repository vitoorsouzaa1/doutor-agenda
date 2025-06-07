import { ReactQueryProvider } from "@/src/providers/react-query";
import { AppSidebar } from "./_components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </main>
    </SidebarProvider>
  );
}
