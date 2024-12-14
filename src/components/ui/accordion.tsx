"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "~/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "py-2 px-4 rounded-lg bg-[#151616] duration-150 transition-all",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left",
        "[&[data-state=open]>#toggle>#open]:opacity-0",
        "[&[data-state=closed]>#toggle>#open]:opacity-100",
        "[&[data-state=open]>#toggle>#closed]:opacity-100",
        "[&[data-state=closed]>#toggle>#closed]:opacity-0",
        className,
      )}
      {...props}
    >
      {children}
      <div id="toggle" className="relative w-20 h-4">
        <span
          id="open"
          className="absolute top-1/2 -translate-y-1/2 right-4 shrink-0 text-muted-foreground transition-all duration-200"
        >
          Open
        </span>
        <span
          id="closed"
          className="absolute top-1/2 -translate-y-1/2 right-4 shrink-0 text-muted-foreground transition-all duration-200"
        >
          Close
        </span>
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
