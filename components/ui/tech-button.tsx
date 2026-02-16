import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const techButtonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 relative group",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                bracket: "bg-transparent text-foreground hover:text-primary",
                ghost: "hover:bg-accent hover:text-accent-foreground",
            },
            size: {
                default: "h-12 px-8 py-2",
                sm: "h-9 px-3",
                lg: "h-14 px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface TechButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof techButtonVariants> {
    asChild?: boolean
    withBrackets?: boolean
}

const TechButton = React.forwardRef<HTMLButtonElement, TechButtonProps>(
    ({ className, variant, size, asChild = false, withBrackets = false, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(techButtonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {withBrackets && (
                    <>
                        {/* Top Left Bracket */}
                        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground/30 transition-all duration-300 group-hover:border-primary group-hover:w-full group-hover:h-full" />
                        {/* Bottom Right Bracket */}
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground/30 transition-all duration-300 group-hover:border-primary group-hover:w-full group-hover:h-full" />
                    </>
                )}
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>
            </Comp>
        )
    }
)
TechButton.displayName = "TechButton"

export { TechButton, techButtonVariants }
