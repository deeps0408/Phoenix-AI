import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudOff, Download, CheckCircle2, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function OfflineSyncPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Offline Sync</h1>
        <p className="text-muted-foreground">Manage your downloaded lessons and ensure you can learn without an internet connection.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <CardTitle>Sync Status: Up to date</CardTitle>
              <CardDescription>Last synced 5 minutes ago</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2"><HardDrive className="size-4" /> Storage Used</span>
              <span className="font-medium">450 MB / 2 GB</span>
            </div>
            <Progress value={22} className="h-2 [&>div]:bg-brand-blue" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="bg-black/20 border-white/5">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Unit 4: Mathematics</h4>
                  <p className="text-xs text-muted-foreground">125 MB</p>
                </div>
                <Button size="icon" variant="ghost" className="text-green-500 hover:text-green-400 hover:bg-green-500/10">
                  <CheckCircle2 className="size-5" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-white/5">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Unit 5: Biology</h4>
                  <p className="text-xs text-muted-foreground">80 MB</p>
                </div>
                <Button size="icon" variant="ghost" className="hover:bg-brand-blue/20 hover:text-brand-blue">
                  <Download className="size-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white">
            <CloudOff className="mr-2 size-4" /> Enable Low-Bandwidth Mode
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
