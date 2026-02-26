import React from 'react'
import { cn } from '../../lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full outline-none focus:outline-none cursor-pointer overflow-hidden transition-all duration-300",
    {
        variants: {
            variant: {
                default: "bg-brand-500/10 hover:bg-brand-500/20 border-brand-500/20 text-brand-100",
                solid: "bg-brand-600 hover:bg-brand-700 text-white border-transparent hover:border-white/20 shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_-2px_rgba(124,58,237,0.6)] hover:scale-105 active:scale-95",
                ghost: "border-white/10 bg-white/5 hover:bg-white/10 text-white hover:border-white/20 active:scale-95",
            },
            size: {
                default: "px-8 py-3 text-base font-medium",
                sm: "px-4 py-1 text-sm",
                lg: "px-10 py-4 text-lg font-semibold",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { neon?: boolean }

const NeonButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        const [isClicked, setIsClicked] = React.useState(false)

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            setIsClicked(true)
            setTimeout(() => setIsClicked(false), 800)
            if (props.onClick) props.onClick(e)
        }

        return (
            <button
                className={cn(buttonVariants({ variant, size }), "relative outline-none", className)}
                ref={ref}
                {...props}
                onClick={handleClick}
            >
                {/* Radiation effect */}
                {isClicked && (
                    <span
                        className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                        style={{
                            background: "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7, #ec4899)",
                            opacity: 0.4
                        }}
                    />
                )}

                {/* Rainbow background layer for 'solid' variant on hover */}
                {variant === 'solid' && (
                    <span className="absolute inset-0 bg-[linear-gradient(to_right,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#a855f7,#ec4899)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-rainbow bg-[length:200%_auto] -z-0" />
                )}

                {/* Top line glow */}
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-brand-500 via-brand-400 to-transparent hidden", neon && "block")} />

                {/* Content wrapper to stay above rainbow layer */}
                <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

                {/* Bottom line glow */}
                <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-brand-500 via-brand-400 to-transparent hidden", neon && "block")} />
            </button>
        );
    }
);

NeonButton.displayName = 'NeonButton';

export { NeonButton, buttonVariants };
