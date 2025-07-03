"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
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

interface AttendanceData {
  [date: string]: Member[];
}

const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const createInitialMembers = (): Member[] => [
  { id: 1, name: '김모코', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: true, dataAiHint: "cute character" },
  { id: 2, name: '이아크', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
  { id: 3, name: '박라샤', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
  { id: 4, name: '최실리안', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
  { id: 5, name: '정카단', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
];

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const initialAttendanceData: AttendanceData = {
    [formatDateKey(yesterday)]: [
        { id: 1, name: '김모코', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: true, dataAiHint: "cute character" },
        { id: 2, name: '이아크', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 3, name: '박라샤', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 4, name: '최실리안', avatar: `https://placehold.co/40x40`, status: 'absent', memo: '예비군', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 5, name: '정카단', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
    ],
    [formatDateKey(today)]: [
        { id: 1, name: '김모코', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: true, dataAiHint: "cute character" },
        { id: 2, name: '이아크', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 3, name: '박라샤', avatar: `https://placehold.co/40x40`, status: 'absent', memo: '병원 진료', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 4, name: '최실리안', avatar: `https://placehold.co/40x40`, status: 'participate', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
        { id: 5, name: '정카단', avatar: `https://placehold.co/40x40`, status: 'pending', memo: '', isCurrentUser: false, dataAiHint: "cute character" },
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMemo, setCurrentMemo] = useState('');

  const selectedDateKey = selectedDate ? formatDateKey(selectedDate) : '';
  const membersForSelectedDate = attendanceData[selectedDateKey] || [];

  useEffect(() => {
    if (selectedDate && !attendanceData[formatDateKey(selectedDate)]) {
      handleDateSelect(selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentUser = membersForSelectedDate.find(m => m.isCurrentUser);
    if (currentUser) {
        setCurrentMemo(currentUser.memo);
    } else {
        setCurrentMemo('');
    }
  }, [membersForSelectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if(date) {
        const dateKey = formatDateKey(date);
        if(!attendanceData[dateKey]){
            setAttendanceData(prev => ({
                ...prev,
                [dateKey]: createInitialMembers()
            }));
        }
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
  
  const CustomDayContent = ({ date }: { date: Date }) => {
    const dateKey = formatDateKey(date);
    const dayData = attendanceData[dateKey];
    let summary: React.ReactNode = null;
    
    if (dayData) {
      const participants = dayData.filter(m => m.status === 'participate').length;
      const absentees = dayData.filter(m => m.status === 'absent').length;
      
      if (participants > 0 || absentees > 0) {
        summary = (
          <div className="absolute bottom-0.5 flex items-center justify-center text-[10px] space-x-0.5">
            {participants > 0 && <span className="font-bold text-primary">{participants}</span>}
            {(participants > 0 && absentees > 0) && <span className="text-muted-foreground">/</span>}
            {absentees > 0 && <span className="font-bold text-destructive">{absentees}</span>}
          </div>
        );
      }
    }

    return (
      <>
        {date.getDate()}
        {summary}
      </>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>프로젝트 출석 관리</CardTitle>
        <CardDescription>
          {selectedDate ? selectedDate.toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "날짜를 선택하세요."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
             <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
                components={{
                    DayContent: CustomDayContent
                }}
             />
        </div>

        {selectedDate && membersForSelectedDate.length > 0 && (
            <div>
                 <h3 className="text-lg font-semibold mb-4 text-center">
                    {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} 출석 현황
                 </h3>
                <div className="space-y-2">
                    {membersForSelectedDate.map((member) => (
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
                                className="w-full space-y-2"
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
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
