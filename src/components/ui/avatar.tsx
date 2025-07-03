
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import NextImage from "next/image"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & { unoptimized?: boolean }
>(({ className, src, alt, unoptimized, style, ...props }, ref) => {
  // 시몬 아바타인 경우 일반 img 태그 사용
  if (src?.includes('simon-avatar')) {
    return (
      <AvatarPrimitive.Image ref={ref} asChild>
        <img
          src={src}
          alt={alt || ""}
          style={style}
          className={cn("aspect-square h-full w-full object-cover", className)}
          onLoad={() => console.log('Simon avatar loaded successfully')}
          onError={(e) => {
            console.error('Simon avatar failed to load:', src);
          }}
          {...(props as any)}
        />
      </AvatarPrimitive.Image>
    );
  }

  return (
    <AvatarPrimitive.Image ref={ref} asChild>
      <NextImage
        src={src || ""}
        alt={alt || ""}
        fill
        unoptimized={unoptimized}
        style={style}
        className={cn("aspect-square h-full w-full object-cover", className)}
        {...(props as any)}
      />
    </AvatarPrimitive.Image>
  );
})
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
