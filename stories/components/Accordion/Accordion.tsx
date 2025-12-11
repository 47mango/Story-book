"use client";

import * as React from "react";

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  type: AccordionType;
  collapsible?: boolean;
  openValues: string[];
  toggleValue: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

type AccordionItemContextValue = {
  value: string;
  open: boolean;
};

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

// 간단한 className 유틸
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
  collapsible?: boolean;
  defaultValue?: string | string[];
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      collapsible = false,
      defaultValue,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [openValues, setOpenValues] = React.useState<string[]>(() => {
      if (!defaultValue) return [];
      if (Array.isArray(defaultValue)) return defaultValue;
      return [defaultValue];
    });

    const toggleValue = (value: string) => {
      setOpenValues((prev) => {
        const isOpen = prev.includes(value);

        // 하나만 열리는 모드
        if (type === "single") {
          if (isOpen) {
            // 접을 수 있는(single + collapsible) 경우 -> 다 닫기
            return collapsible ? [] : prev;
          }
          // 다른 것들 닫고 이거만 열기
          return [value];
        }

        // 여러 개 열리는 모드
        if (isOpen) {
          return prev.filter((v) => v !== value);
        } else {
          return [...prev, value];
        }
      });
    };

    const contextValue = React.useMemo<AccordionContextValue>(
      () => ({
        type,
        collapsible,
        openValues,
        toggleValue,
      }),
      [type, collapsible, openValues]
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("w-full", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const accordion = React.useContext(AccordionContext);
    if (!accordion) {
      throw new Error("AccordionItem must be used within <Accordion>");
    }

    const open = accordion.openValues.includes(value);

    const itemContextValue = React.useMemo<AccordionItemContextValue>(
      () => ({ value, open }),
      [value, open]
    );

    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          className={cn(
            "border-b bg-background text-foreground",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const accordion = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);

  if (!accordion || !item) {
    throw new Error("AccordionTrigger must be used within <AccordionItem>");
  }

  const open = item.open;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    accordion.toggleValue(item.value);
    props.onClick?.(e);
  };

  const contentId = `accordion-content-${item.value}`;

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      data-state={open ? "open" : "closed"}
      onClick={handleClick}
      className={cn(
        "flex w-full items-center justify-between gap-2 px-4 py-3",
        "text-left text-sm font-medium",
        "transition-colors hover:bg-muted",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {/* 간단한 화살표 아이콘 */}
      <span
        className={cn(
          "inline-block transform transition-transform",
          open && "rotate-180"
        )}
        aria-hidden="true"
      >
        ▾
      </span>
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const item = React.useContext(AccordionItemContext);

  if (!item) {
    throw new Error("AccordionContent must be used within <AccordionItem>");
  }

  const open = item.open;
  const contentId = `accordion-content-${item.value}`;

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
      className={cn(
        "overflow-hidden",
        // 간단한 애니메이션: max-height + opacity
        "transition-[max-height,opacity] duration-200 ease-out",
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        className
      )}
      {...props}
    >
      <div className="px-4 py-3 text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";
