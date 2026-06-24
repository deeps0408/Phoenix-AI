"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-blue">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and learning journey details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md bg-card/60 backdrop-blur-sm md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-orange to-brand-purple flex items-center justify-center text-white text-4xl font-bold">
              SJ
            </div>
            <div>
              <h2 className="text-xl font-bold">Sarah Jenkins</h2>
              <p className="text-muted-foreground">Grade 8 Student</p>
            </div>
            <Button variant="outline" className="w-full">Change Avatar</Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-card/60 backdrop-blur-sm md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your contact and school details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" defaultValue="Sarah" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" defaultValue="Jenkins" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="school">School / District (If applicable)</Label>
              <Input id="school" defaultValue="Phoenix Public School" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="primary-lang">Primary Language</Label>
              <Input id="primary-lang" defaultValue="English" />
            </div>

            <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 mt-4">
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
