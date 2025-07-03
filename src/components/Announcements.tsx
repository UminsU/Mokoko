import { Megaphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function Announcements() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-6 w-6 text-primary" />
          <span>리더 공지사항</span>
        </CardTitle>
        <CardDescription>프로젝트 관련 중요 업데이트를 확인하세요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold">주간 회의 시간 변경 안내</h3>
            <p className="text-sm text-muted-foreground">{formatDate(today)}</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            이번 주 주간 회의는 금요일 오후 3시에서 오후 5시로 변경되었습니다. 모두 착오 없으시길 바랍니다.
          </p>
        </div>
        <Separator />
        <div>
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold">새로운 기능 배포 완료</h3>
             <p className="text-sm text-muted-foreground">{formatDate(yesterday)}</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            사용자 프로필 기능이 새롭게 추가되었습니다. 각자 프로필 정보를 업데이트 해주세요.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
