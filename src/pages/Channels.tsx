import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Channels = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([
    { id: 1, name: "WhatsApp" },
    { id: 2, name: "Instagram" },
    { id: 3, name: "Facebook" },
  ]);
  const [newChannel, setNewChannel] = useState("");

  const handleAddChannel = () => {
    if (newChannel.trim() !== "") {
      setChannels([...channels, { id: Date.now(), name: newChannel }]);
      setNewChannel("");
    }
  };

  const handleDeleteChannel = (id: number) => {
    setChannels(channels.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Canais</h1>
            <p className="text-muted-foreground">Configure seus canais multicanal</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Novo Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Label htmlFor="newChannel">Nome do Canal</Label>
                <Input
                  id="newChannel"
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value)}
                  placeholder="Ex: Telegram, Slack, Discord..."
                />
              </div>
              <Button onClick={handleAddChannel} variant="default" className="h-10">
                <Plus className="w-4 h-4 mr-2" /> Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Canais Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {channels.length === 0 && (
                <li className="text-muted-foreground">Nenhum canal cadastrado.</li>
              )}
              {channels.map((channel) => (
                <li key={channel.id} className="flex items-center justify-between p-2 border rounded-md">
                  <span>{channel.name}</span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteChannel(channel.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Channels;