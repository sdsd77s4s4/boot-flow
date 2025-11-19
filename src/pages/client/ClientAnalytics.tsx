import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientAnalytics() {
  return (
    <div className="space-y-4 sm:space-y-6 min-h-screen bg-[#09090b] p-3 sm:p-6">
      <Card className="bg-[#1f2937] border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Análises</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Visualize suas análises aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
}

