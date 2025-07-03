import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MokokoLogoProps {
  width: number;
  height: number;
  className?: string;
}

export function MokokoLogo({ width, height, className }: MokokoLogoProps) {
  return (
    <Image
      src="https://upload3.inven.co.kr/upload/2023/08/11/bbs/i13137837364.jpg?MW=800"
      alt="Mokoko Logo"
      width={width}
      height={height}
      className={cn('rounded-full object-cover', className)}
    />
  );
}
