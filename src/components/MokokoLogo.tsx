import type { ComponentProps } from 'react';

export function MokokoLogo(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="32" cy="38" r="24" fill="#B2E4A3" />
      <path
        d="M32 62C19.2975 62 8 50.7025 8 38C8 35.8423 8.34997 33.751 8.99915 31.7854C14.7351 43.084 22.5855 50.8522 32 50.8522C41.4145 50.8522 49.2649 43.084 55.0008 31.7854C55.6501 33.751 56 35.8423 56 38C56 50.7025 44.7025 62 32 62Z"
        fill="#84C9A7"
      />
      <path
        d="M32 2C37.5228 2 42 6.47715 42 12C42 12.792 41.8953 13.5603 41.7019 14.2981C38.9312 11.2315 35.6662 9.5 32 9.5C28.3338 9.5 25.0688 11.2315 22.2981 14.2981C22.1047 13.5603 22 12.792 22 12C22 6.47715 26.4772 2 32 2Z"
        fill="#98D7A5"
      />
      <circle cx="24" cy="34" r="3" fill="#3A6351" />
      <circle cx="40" cy="34" r="3" fill="#3A6351" />
    </svg>
  );
}
