import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative">
        {/* Subtle background gradients for depth */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-blue/5 to-transparent -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/5 blur-[100px] rounded-full -z-10" />
        
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
