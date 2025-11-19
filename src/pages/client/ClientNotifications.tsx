import { SidebarProvider } from "@/components/ui/sidebar";
import { ClientSidebar } from "@/components/sidebars/ClientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientNotifications() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ClientSidebar />
        <main className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Visualize suas notificações aqui.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
}

