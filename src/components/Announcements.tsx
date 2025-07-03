"use client";

import { Megaphone, Pencil, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const initialAnnouncements = [
  {
    id: 1,
    title: '주간 일정',
    date: new Date(),
    content: '이번 주 주간 회의는 금요일 오후 3시에서 오후 5시로 변경되었습니다. 모두 착오 없으시길 바랍니다.'
  }
];

export function Announcements() {
  const [isEditing, setIsEditing] = useState(false);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleContentChange = (id: number, content: string) => {
    setAnnouncements(announcements.map(ann => ann.id === id ? { ...ann, content } : ann));
  };

  // For now, assume the user is a manager to show the button.
  // In a real app, this would be based on user role.
  const isManager = true; 

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-primary" />
            <span>공지사항</span>
          </CardTitle>
          {isManager && (
            <Button variant="ghost" size="icon" onClick={handleEditToggle}>
              {isEditing ? <Save className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
              <span className="sr-only">{isEditing ? 'Save' : 'Edit'}</span>
            </Button>
          )}
        </div>
        <CardDescription>프로젝트 관련 중요 업데이트를 확인하세요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map((ann, index) => (
          <div key={ann.id}>
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{ann.title}</h3>
                <p className="text-sm text-muted-foreground">{formatDate(ann.date)}</p>
              </div>
              {isEditing ? (
                <Textarea
                  value={ann.content}
                  onChange={(e) => handleContentChange(ann.id, e.target.value)}
                  className="mt-2"
                />
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  {ann.content}
                </p>
              )}
            </div>
            {index < announcements.length - 1 && <Separator className="mt-4"/>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
