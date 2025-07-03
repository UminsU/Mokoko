"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

type AttendanceStatus = 'participate' | 'absent' | 'pending';

interface Member {
  id: number;
  name: string;
  avatar: string;
  status: AttendanceStatus;
  memo: string;
  isCurrentUser: boolean;
  dataAiHint: string;
}

const initialMembers: Member[] = [
  { id: 1, name: '김모코', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: true, dataAiHint: "cute character" },
  { id: 2, name: '이아크', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
  { id: 3, name: '박라샤', avatar: `https://placehold.co/40x40`, status: 'absent', memo: '병원 진료', isCurrentUser: false, dataAiHint: "cute character" },
  { id: 4, name: '최실리안', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
  { id: 5, name: '정카단', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
];

const StatusBadge = ({ status }: { status: AttendanceStatus }) => {
    const statusConfig: Record<AttendanceStatus, { text: string; variant: 'default' | 'destructive' | 'secondary' }> = {
        participate: { text: '참여', variant: 'default' },
        absent: { text: '불참', variant: 'destructive' },
        pending: { text: '미정', variant: 'secondary' },
    };

    const { text, variant } = statusConfig[status];

    return <Badge variant={variant}>{text}</Badge>;
};

export function AttendanceManager() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [currentMemo, setCurrentMemo] = useState('');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    setDateString(new Date().toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    const currentUser = members.find(m => m.isCurrentUser);
    if(currentUser) {
        setCurrentMemo(currentUser.memo);
    }
  }, []);

  const handleStatusChange = (id: number, status: AttendanceStatus) => {
    setMembers(members.map(m => {
        if (m.id === id) {
            if (status === 'participate') {
                setCurrentMemo('');
                return { ...m, status, memo: '' };
            }
            return { ...m, status };
        }
        return m;
    }));
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMemo(e.target.value);
  }

  const handleSaveMemo = (id: number) => {
    setMembers(members.map(m => (m.id === id ? { ...m, memo: currentMemo } : m)));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>오늘의 프로젝트 출석</CardTitle>
        <CardDescription>{dateString}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {members.map((member) => (
          <div key={member.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg transition-colors hover:bg-secondary/50 border-b last:border-b-0">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.dataAiHint}/>
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.isCurrentUser ? "나" : "팀원"}</p>
              </div>
            </div>

            {member.isCurrentUser ? (
              <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 space-y-2">
                <div className="flex justify-start sm:justify-end gap-2">
                  <Button
                    variant={member.status === 'participate' ? 'default' : 'outline'}
                    onClick={() => handleStatusChange(member.id, 'participate')}
                    className="transition-all duration-200"
                  >
                    <Check className="mr-2 h-4 w-4" /> 참여
                  </Button>
                  <Button
                    variant={member.status === 'absent' ? 'destructive' : 'outline'}
                    onClick={() => handleStatusChange(member.id, 'absent')}
                    className="transition-all duration-200"
                  >
                    <X className="mr-2 h-4 w-4" /> 불참
                  </Button>
                </div>
                {member.status === 'absent' && (
                  <div
                    className="w-full space-y-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                    data-state="open"
                  >
                    <Textarea placeholder="불참 사유를 입력하세요..." value={currentMemo} onChange={handleMemoChange} className="w-full" />
                    <Button onClick={() => handleSaveMemo(member.id)} size="sm" className="w-full sm:w-auto float-right">사유 저장</Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-end text-right min-w-[100px]">
                <StatusBadge status={member.status} />
                {member.status === 'absent' && member.memo && (
                  <p className="text-sm text-muted-foreground mt-1">사유: {member.memo}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
