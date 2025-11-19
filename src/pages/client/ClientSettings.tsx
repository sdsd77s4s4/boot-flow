import { SidebarProvider } from "@/components/ui/sidebar";
import { ClientSidebar } from "@/components/sidebars/ClientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientSettings() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ClientSidebar />
        <main className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configure suas preferências aqui.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
}

