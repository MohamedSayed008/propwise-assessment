import React from 'react';
import { IconProps } from './icon.types';

export default function DashboardIcon({
  width = 16,
  height = 16,
  color,
  className,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 13.5 13.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={color ? { color } : undefined}
      className={className}
    >
      <path
        d="M4.75 0.75H1.41667C1.04848 0.75 0.75 1.04848 0.75 1.41667V6.08333C0.75 6.45152 1.04848 6.75 1.41667 6.75H4.75C5.11819 6.75 5.41667 6.45152 5.41667 6.08333V1.41667C5.41667 1.04848 5.11819 0.75 4.75 0.75Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0833 0.75H8.75C8.38181 0.75 8.08333 1.04848 8.08333 1.41667V3.41667C8.08333 3.78486 8.38181 4.08333 8.75 4.08333H12.0833C12.4515 4.08333 12.75 3.78486 12.75 3.41667V1.41667C12.75 1.04848 12.4515 0.75 12.0833 0.75Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0833 6.75H8.75C8.38181 6.75 8.08333 7.04848 8.08333 7.41667V12.0833C8.08333 12.4515 8.38181 12.75 8.75 12.75H12.0833C12.4515 12.75 12.75 12.4515 12.75 12.0833V7.41667C12.75 7.04848 12.4515 6.75 12.0833 6.75Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.75 9.41667H1.41667C1.04848 9.41667 0.75 9.71514 0.75 10.0833V12.0833C0.75 12.4515 1.04848 12.75 1.41667 12.75H4.75C5.11819 12.75 5.41667 12.4515 5.41667 12.0833V10.0833C5.41667 9.71514 5.11819 9.41667 4.75 9.41667Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
