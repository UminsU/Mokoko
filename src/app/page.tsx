import { Announcements } from "@/components/Announcements";
import { AttendanceManager } from "@/components/AttendanceManager";
import { MokokoLogo } from "@/components/MokokoLogo";
import { TeamSuggestions } from "@/components/TeamSuggestions";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <MokokoLogo width={32} height={32} />
              <span className="font-bold text-lg hidden sm:inline">모코코의 아크라시아 구하기</span>
            </Link>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <Announcements />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <AttendanceManager />
          </div>
          <div className="space-y-8">
            <TeamSuggestions />
          </div>
        </div>
      </main>

      <footer className="py-6 mt-8 border-t">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} 모코코 팀. All rights reserved.
          </div>
      </footer>
    </div>
  );
}
