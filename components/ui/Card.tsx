import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6", className)}>
            {children}
        </div>
    );
}

export function CardHeader({ title, description, className }: { title: string; description?: string, className?: string }) {
    return (
        <div className={cn("mb-4", className)}>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
            {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
        </div>
    );
}
