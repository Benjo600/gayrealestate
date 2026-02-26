import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

interface ExploreProfileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    onClick?: () => void;
    className?: string;
}

export function ExploreProfileButton({
    label = "Explore Profile",
    onClick,
    className,
    ...props
}: ExploreProfileButtonProps) {
    return (
        <Button
            onClick={onClick}
            className={cn(
                "group relative overflow-hidden w-full",
                "bg-slate-900 hover:bg-slate-800",
                "text-white font-semibold text-base",
                "rounded-xl h-14",
                "border border-slate-800 hover:border-gold-500/50",
                "shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-gold-500/20",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-0.5",
                className
            )}
            size="lg"
            {...props}
        >
            {/* Background gradient effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/10 to-gold-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Button content */}
            <span className="relative flex items-center justify-center gap-3 w-full">
                <span className="tracking-wide">{label}</span>
                <ArrowRight
                    className="w-5 h-5 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-gold-300"
                    strokeWidth={2.5}
                />
            </span>
        </Button>
    );
}
