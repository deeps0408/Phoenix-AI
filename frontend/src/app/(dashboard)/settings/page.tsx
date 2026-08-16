"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account, accessibility preferences, and notifications.
        </p>
      </div>

      <Card className="border-0 shadow-md bg-card/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Accessibility (Feature 15)</CardTitle>
          <CardDescription>Customize Phoenix AI for your needs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Dyslexia-Friendly Font</Label>
              <p className="text-sm text-muted-foreground">Change global font to OpenDyslexic.</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">High Contrast Mode</Label>
              <p className="text-sm text-muted-foreground">Increase color contrast for better visibility.</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Voice-First Interaction</Label>
              <p className="text-sm text-muted-foreground">Automatically enable microphone on lessons.</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md bg-card/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Data Sync</CardTitle>
          <CardDescription>Manage offline caching for low-bandwidth areas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3 border rounded-md">
            <div>
              <p className="font-medium">Lessons Cache</p>
              <p className="text-sm text-muted-foreground">145 MB used</p>
            </div>
            <Button variant="outline" size="sm">Clear Cache</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
