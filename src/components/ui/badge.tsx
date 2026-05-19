import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold",
  {
    variants: {
      variant: {
        default: "bg-[#EEF4FF] text-[#2563EB]",
        pink: "bg-[#FF3366]/15 text-white",
        green: "bg-[#DCFCE7] text-[#15803D]",
        blue: "bg-[#DBEAFE] text-[#2563EB]",
        purple: "bg-[#EDE9FE] text-[#6D28D9]",
        orange: "bg-[#FFEDD5] text-[#F97316]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
