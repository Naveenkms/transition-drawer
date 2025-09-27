"use client";

import * as React from "react";
import { Boxes, ChevronRight, ChevronLeft } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export type NavItem = {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  onSelect?: () => void;
  children?: NavItem[];
};

type Level = {
  title: string;
  items: NavItem[];
};

export function NestedDrawer({
  items,
  trigger,
  title = "Menu",
  description,
  className,
}: {
  items: NavItem[];
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [stack, setStack] = React.useState<Level[]>([{ title, items }]);

  const current = stack[stack.length - 1];

  function push(item: NavItem) {
    if (item.children && item.children.length) {
      setStack((s) => [...s, { title: item.title, items: item.children! }]);
    } else if (item.onSelect) {
      item.onSelect();
      setOpen(false);
    }
  }

  function back() {
    if (stack.length > 1) setStack((s) => s.slice(0, -1));
  }

  function reset() {
    setStack([{ title, items }]);
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          // Reset to root when closing so the drawer always opens at top level
          reset();
        }
      }}
    >
      <DrawerTrigger asChild>
        {trigger ?? <Button variant="default">Open Drawer</Button>}
      </DrawerTrigger>
      <DrawerContent
        className={cn("bg-card", className)}
        aria-label="Nested navigation drawer"
      >
        <DrawerHeader className="px-4 pb-1 pt-3">
          <div className="mx-auto h-0 w-0" aria-hidden="true" />
          <div className="flex items-center justify-between flex-1 w-full">
            {stack.length > 1 ? (
              <button
                type="button"
                aria-label="Go back"
                onClick={back}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <span className="px-2 py-1 text-sm text-muted-foreground sr-only">
                Back
              </span>
            )}
            <div className="flex-1 text-center">
              <DrawerTitle className="text-balance">
                {current.title}
              </DrawerTitle>
              {description && stack.length === 1 ? (
                <DrawerDescription className="mt-0.5">
                  {description}
                </DrawerDescription>
              ) : null}
            </div>
            {stack.length > 1 ? (
              <div className="w-[64px]" aria-hidden="true" />
            ) : null}
          </div>
        </DrawerHeader>

        <nav role="navigation" aria-label="In-drawer list">
          <ul className="divide-y divide-border">
            {current.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => push(item)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-muted/50 focus-visible:outline-none"
                  )}
                  aria-haspopup={item.children ? "listbox" : undefined}
                  aria-label={item.title}
                >
                  <span className="mt-0.5 shrink-0 rounded-md bg-secondary p-2 text-secondary-foreground">
                    {item.icon ?? <Boxes className="h-4 w-4" />}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">
                      {item.title}
                    </span>
                    {item.description ? (
                      <span className="block text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                  {item.children ? (
                    <ChevronRight
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
