"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

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

interface AttendanceData {
  [date: string]: Member[];
}

const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const createInitialMembers = (): Member[] => [
    { id: 1, name: '시몬', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: true, dataAiHint: "cute character" },
    { id: 2, name: '꾸루', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
    { id: 3, name: '유렌', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
    { id: 4, name: '달새', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
    { id: 5, name: '하늘', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
    { id: 6, name: '김포', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
    { id: 7, name: '밥콩', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
];

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const initialAttendanceData: AttendanceData = {
    [formatDateKey(yesterday)]: [
        { id: 1, name: '시몬', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: true, dataAiHint: "cute character" },
        { id: 2, name: '꾸루', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 3, name: '유렌', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 4, name: '달새', avatar: `https://placehold.co/40x40`, status: 'absent', memo: '예비군', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 5, name: '하늘', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 6, name: '김포', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 7, name: '밥콩', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
    ],
    [formatDateKey(today)]: [
        { id: 1, name: '시몬', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: true, dataAiHint: "cute character" },
        { id: 2, name: '꾸루', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 3, name: '유렌', avatar: `https://placehold.co/40x40`, status: 'absent', memo: '병원 진료', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 4, name: '달새', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 5, name: '하늘', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 6, name: '김포', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 7, name: '밥콩', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
    ],
};


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
  const [attendanceData, setAttendanceData] = useState<AttendanceData>(initialAttendanceData);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [currentMemo, setCurrentMemo] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [month, setMonth] = useState(new Date());

  const selectedDateKey = selectedDate ? formatDateKey(selectedDate) : '';
  const membersForSelectedDate = attendanceData[selectedDateKey] || [];

  useEffect(() => {
    if (selectedDate) {
      const members = attendanceData[formatDateKey(selectedDate)] || [];
      const currentUser = members.find(m => m.isCurrentUser);
      if (currentUser) {
          setCurrentMemo(currentUser.memo);
      } else {
          setCurrentMemo('');
      }
    }
  }, [selectedDate, attendanceData]);
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
        const dateKey = formatDateKey(date);
        if(!attendanceData[dateKey]){
            setAttendanceData(prev => ({
                ...prev,
                [dateKey]: createInitialMembers()
            }));
        }
        setSelectedDate(date);
        setIsDialogOpen(true);
    }
  };

  const updateAttendanceForDate = (dateKey: string, updatedMembers: Member[]) => {
    setAttendanceData(prev => ({
      ...prev,
      [dateKey]: updatedMembers
    }));
  };

  const handleStatusChange = (id: number, status: AttendanceStatus) => {
    if (!selectedDate) return;
    
    const updatedMembers = membersForSelectedDate.map(m => {
        if (m.id === id) {
            if (status === 'participate') {
                setCurrentMemo('');
                return { ...m, status, memo: '' };
            }
            return { ...m, status };
        }
        return m;
    });
    updateAttendanceForDate(selectedDateKey, updatedMembers);
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMemo(e.target.value);
  }

  const handleSaveMemo = (id: number) => {
    if (!selectedDate) return;

    const updatedMembers = membersForSelectedDate.map(m => (m.id === id ? { ...m, memo: currentMemo } : m));
    updateAttendanceForDate(selectedDateKey, updatedMembers);
  }
  
  const CustomDayContent = ({ date, displayMonth }: { date: Date; displayMonth: Date }) => {
    if (date.getMonth() !== displayMonth.getMonth()) {
      return (
        <div className="flex flex-col h-full">
          <span className="self-end p-1 text-muted-foreground">{date.getDate()}</span>
        </div>
      );
    }

    const dateKey = formatDateKey(date);
    const dayData = attendanceData[dateKey];

    return (
      <div className="flex flex-col h-full w-full">
        <span className="self-end p-1">{date.getDate()}</span>
        {dayData && (
          <div className="flex-grow flex flex-col justify-end p-1 gap-1 overflow-y-auto">
            {dayData.some(m => m.status === 'participate') && (
              <div title="Participants" className="flex flex-wrap -space-x-2 overflow-hidden">
                {dayData.filter(m => m.status === 'participate').map(m => (
                  <Avatar key={m.id} className="h-5 w-5 border-2 border-background">
                    <AvatarImage src={m.avatar} alt={m.name} data-ai-hint={m.dataAiHint} />
                    <AvatarFallback>{m.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            )}
            {dayData.some(m => m.status === 'absent') && (
              <div title="Absentees" className="flex flex-wrap -space-x-2 overflow-hidden">
                {dayData.filter(m => m.status === 'absent').map(m => (
                  <Avatar key={m.id} className="h-5 w-5 border-2 border-destructive bg-destructive/20">
                    <AvatarImage src={m.avatar} alt={m.name} data-ai-hint={m.dataAiHint} />
                    <AvatarFallback className="text-destructive-foreground text-xs">{m.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>모코코의 아크라시아 구하기</CardTitle>
        <CardDescription>
          날짜를 클릭하여 출석을 관리하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          month={month}
          onMonthChange={setMonth}
          className="p-0"
          classNames={{
            months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
            month: 'space-y-4 w-full',
            caption_label: 'text-lg font-medium',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell: 'text-muted-foreground rounded-md w-full font-normal text-[0.8rem]',
            row: 'flex w-full mt-2',
            cell: 'h-28 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
            day: cn(buttonVariants({ variant: 'ghost' }), 'h-full w-full p-0 font-normal aria-selected:opacity-100 border items-start justify-start'),
            day_selected: 'bg-primary/20 text-primary-foreground',
            day_today: 'bg-secondary text-accent-foreground',
            day_outside: 'text-muted-foreground/50',
            day_disabled: 'text-muted-foreground opacity-50',
          }}
          components={{
            DayContent: (props) => <CustomDayContent {...props} displayMonth={month} />
          }}
        />

        {selectedDate && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} 출석 현황
                </DialogTitle>
                <DialogDescription>
                  참여 또는 불참을 선택하고, 불참 시 사유를 남겨주세요.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2 py-4 max-h-[60vh] overflow-y-auto">
                {membersForSelectedDate.map((member) => (
                  <div key={member.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg transition-colors hover:bg-secondary/50 border-b last:border-b-0">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.dataAiHint}/>
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.isCurrentUser ? "대표자" : "팀원"}</p>
                      </div>
                    </div>

                    {member.isCurrentUser ? (
                      <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 space-y-2">
                        <div className="flex justify-start sm:justify-end gap-2">
                          <Button
                            size="sm"
                            variant={member.status === 'participate' ? 'default' : 'outline'}
                            onClick={() => handleStatusChange(member.id, 'participate')}
                            className="transition-all duration-200"
                          >
                            <Check className="mr-2 h-4 w-4" /> 참여
                          </Button>
                          <Button
                            size="sm"
                            variant={member.status === 'absent' ? 'destructive' : 'outline'}
                            onClick={() => handleStatusChange(member.id, 'absent')}
                            className="transition-all duration-200"
                          >
                            <X className="mr-2 h-4 w-4" /> 불참
                          </Button>
                        </div>
                        {member.status === 'absent' && (
                          <div className="w-full space-y-2 pt-2">
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
              </div>

              <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      닫기
                    </Button>
                  </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
