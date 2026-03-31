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
                "text-white font-semibold text-base",
                "rounded-xl h-14",
                "border border-white/20",
                "shadow-lg hover:shadow-purple-500/30 transition-all duration-500",
                "hover:-translate-y-0.5",
                className
            )}
            style={{ background: 'linear-gradient(135deg, #770088 0%, #4B0082 35%, #004CFF 100%)' }}
            size="lg"
            {...props}
        >
            {/* Shimmer sweep on hover */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)', backgroundSize: '200% 100%' }} />

            {/* Button content */}
            <span className="relative flex items-center justify-center gap-3 w-full">
                <span className="tracking-wide">{label}</span>
                <ArrowRight
                    className="w-5 h-5 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-white"
                    strokeWidth={2.5}
                />
            </span>
        </Button>
    );
}
