import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, FileText, Book, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  { title: "Algebra Basics", type: "Video", icon: PlayCircle, duration: "15 mins" },
  { title: "Photosynthesis Study Guide", type: "Document", icon: FileText, duration: "4 pages" },
  { title: "World History Timeline", type: "Interactive", icon: Book, duration: "Self-paced" },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
        <p className="text-muted-foreground">Curated videos, documents, and guides to help you learn.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((res, i) => (
          <Card key={i} className="bg-card/50 backdrop-blur-xl border-white/5 hover:border-brand-blue/30 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <res.icon className="size-8 text-brand-blue" />
                <span className="text-xs font-medium px-2 py-1 bg-white/5 rounded-full">{res.type}</span>
              </div>
              <CardTitle className="mt-4">{res.title}</CardTitle>
              <CardDescription>{res.duration}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-white/5 hover:bg-brand-blue hover:border-brand-blue text-foreground transition-colors mt-2" variant="outline">
                Open Resource <ExternalLink className="ml-2 size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
