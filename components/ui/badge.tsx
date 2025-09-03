import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs md:text-sm font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				completed:
					"border-transparent bg-success text-white [a&]:hover:bg-secondary/90",
				inProgress:
					"border-transparent bg-progress text-white [a&]:hover:bg-secondary/90",
				overdue:
					"border-transparent bg-error text-white [a&]:hover:bg-error/90",
				notStarted:
					"border-transparent bg-[#fbbf24] text-secondary-foreground [a&]:hover:bg-[#fbbf24]/90",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function Badge({
	className,
	variant,
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	return (
		<span className={cn(badgeVariants({ variant }), className)}>
			{variant!
				.replace(/([A-Z])/g, " $1")
				.replace(/^./, (str) => str.toUpperCase())}
		</span>
	);
}

export { Badge, badgeVariants };
