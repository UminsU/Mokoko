
"use client";

import { useState, type CSSProperties } from 'react';
import { Lightbulb, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Suggestion {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: Date;
  dataAiHint: string;
  avatarStyle?: CSSProperties;
}

const simonAvatarUrl = "https://img.lostark.co.kr/armory/1/F5F6C16AD364A6EC4CCC5194E9F48360F4D53D708220F33314646117B91D2ECC.jpg?v=20250703014043";
const simonAvatarStyle = { objectPosition: '-215px -83px' };

const initialSuggestions: Suggestion[] = [
  { id: 1, author: '꾸루', avatar: 'https://placehold.co/40x40', content: '피자 회식 한번 했으면 좋겠습니다!', date: new Date(), dataAiHint: "cute character" },
];

export function TeamSuggestions() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [newSuggestion, setNewSuggestion] = useState('');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  };

  const handleSubmit = () => {
    if (newSuggestion.trim() === '') return;

    const newEntry: Suggestion = {
      id: suggestions.length + 1,
      // In a real app, author would come from logged-in user context
      author: '시몬', 
      avatar: simonAvatarUrl,
      content: newSuggestion,
      date: new Date(),
      dataAiHint: "cute character",
      avatarStyle: simonAvatarStyle,
    };

    setSuggestions([newEntry, ...suggestions]);
    setNewSuggestion('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <span>건의사항</span>
        </CardTitle>
        <CardDescription>자유롭게 의견을 남겨주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Textarea
            placeholder="여기에 건의사항을 입력하세요..."
            value={newSuggestion}
            onChange={(e) => setNewSuggestion(e.target.value)}
          />
          <Button onClick={handleSubmit} size="sm" className="float-right">
            <Send className="mr-2 h-4 w-4" />
            등록
          </Button>
        </div>
        <div className="pt-10 space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={suggestion.id}>
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={suggestion.avatar} alt={suggestion.author} data-ai-hint={suggestion.dataAiHint} style={suggestion.avatarStyle} />
                  <AvatarFallback>{suggestion.author.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{suggestion.author}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(suggestion.date)}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{suggestion.content}</p>
                </div>
              </div>
              {index < suggestions.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
