import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MokokoLogo } from '@/components/MokokoLogo';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <MokokoLogo width={80} height={80} />
          </div>
          <CardTitle className="text-2xl font-bold">모코코의 아크라시아 구하기</CardTitle>
          <CardDescription>팀 프로젝트 일정 조율</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">아이디</Label>
              <Input id="id" placeholder="아이디를 입력하세요" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" placeholder="비밀번호를 입력하세요" required />
            </div>
            <Button type="submit" className="w-full">
              로그인
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">로그인 없이 시작하기</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
