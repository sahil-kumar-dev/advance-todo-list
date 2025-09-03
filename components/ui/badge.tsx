import * as React from "react";
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
				pending:
					"border-transparent bg-error text-white [a&]:hover:bg-error/90",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

type BadgeVariant = "default" | "completed" | "pending";

function Badge({
	className,
	variant = "default",
	children,
}: {
	variant?: BadgeVariant;
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<span className={cn(badgeVariants({ variant }), className)}>
			{children ?? variant.charAt(0).toUpperCase() + variant.slice(1)}
		</span>
	);
}

export { Badge, badgeVariants };
