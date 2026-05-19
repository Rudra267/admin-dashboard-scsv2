import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#2563EB] text-white shadow-[0_12px_24px_rgba(37,99,235,0.24)] hover:-translate-y-0.5 hover:bg-[#1D4ED8]",
        ghost: "bg-transparent text-[#081B4B] hover:bg-[#F1F5FF]",
        outline:
          "border border-[#E6ECF5] bg-white text-[#081B4B] shadow-[0_10px_25px_rgba(8,27,75,0.045)] hover:-translate-y-0.5 hover:border-[#BFD1F8]",
        pink: "bg-gradient-to-r from-[#FF3366] to-[#D91B8C] text-white shadow-[0_12px_24px_rgba(236,72,153,0.28)] hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3",
        icon: "h-11 w-11 rounded-[14px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
