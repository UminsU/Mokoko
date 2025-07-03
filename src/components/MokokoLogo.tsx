import Image from 'next/image';
import type { ComponentProps } from 'react';

export function MokokoLogo(props: Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'>) {
  return (
    <Image
      src="https://placehold.co/225x225.png"
      alt="Singing Mokoko character"
      width={225}
      height={225}
      data-ai-hint="cute character singing"
      {...props}
    />
  );
}
