import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientAI() {
  return (
    <div className="space-y-4 sm:space-y-6 min-h-screen bg-[#09090b] p-3 sm:p-6">
      <Card className="bg-[#1f2937] border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">IA + Voz</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Configure sua IA e voz aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
}

