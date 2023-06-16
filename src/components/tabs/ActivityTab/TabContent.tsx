import React from "react";
import { cn } from "@/lib/utils";

export type TabContentProps = {
  label: string;
  icon: ({ className }: { className: string }) => React.ReactNode;
  active: boolean;
};

export const TabContent: React.FC<TabContentProps> = ({
  label,
  icon,
  active,
}) => {
  return (
    <button
      className={cn(
        "dark:border-jacarta-600 dark:bg-jacarta-700 group dark:hover:bg-accent hover:bg-accent border-jacarta-100 mr-2.5 mb-2.5 inline-flex items-center rounded-xl border bg-white px-4 py-3 hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent",
        active && "bg-accent text-white dark:bg-accent"
      )}
    >
      {icon({
        className: cn(
          "fill-jacarta-700 mr-2 h-4 w-4 group-hover:fill-white dark:fill-white",
          active && "fill-white"
        ),
      })}
      <span className="text-2xs font-medium">{label}</span>
    </button>
  );
};
