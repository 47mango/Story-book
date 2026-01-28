import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'big';
}

const sizeClasses = {
  small: "text-sm px-1.5 py-0.5",
  medium: "text-base px-2 py-1",
  big: "text-lg px-3 py-1.5",
};

const Badge = ({
  children,
  className = "bg-blue-500",
  size = "medium",
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
