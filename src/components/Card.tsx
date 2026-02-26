import type { ReactElement } from "react";
import type { Section } from "../types";

interface CardProps {
  section: Section;
  title: string;
  icon: ReactElement;
  onClick: () => void;
}

export const Card = ({ title, icon, onClick }: CardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative p-8 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 min-h-[220px] w-full overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative flex flex-col items-center justify-center text-center space-y-5 h-full">
        {/* Icon with subtle glow */}
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative w-16 h-16 text-gray-600 dark:text-gray-400 group-hover:text-primary group-hover:scale-110 transition-all duration-500">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors duration-500 tracking-wide">
          {title}
        </h3>
      </div>

      {/* Minimal accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500"></div>
    </button>
  );
};
