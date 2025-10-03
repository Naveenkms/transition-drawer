"use client";
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";

import { Button } from "@/registry/new-york/components/ui/button";
import { cn } from "@/lib/utils";

type Direction = 1 | -1;
type PanelId = string;

type TransitionPanelState = {
  currentPanel: PanelId;
  direction: Direction;
  hasMoreThanOnePanel: boolean;
  pushNewPanel: (panelId: PanelId) => void;
  removePanel: () => void;
};

const initialContext: TransitionPanelState = {
  currentPanel: "",
  direction: 1,
  hasMoreThanOnePanel: false,
  pushNewPanel: () => {},
  removePanel: () => {},
};

const TransitionPanelContext =
  React.createContext<TransitionPanelState>(initialContext);

const panelTransitionVariants = {
  enter: (direction: Direction) => ({
    opacity: 0,
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: Direction) => ({
    opacity: 0,
    x: direction < 0 ? "100%" : "-100%",
  }),
};

type TransitionPanelProps = {
  defaultValue: PanelId;
  children: React.ReactNode;
};

function TransitionPanel({ defaultValue, children }: TransitionPanelProps) {
  const [direction, setDirection] = React.useState<Direction>(1);

  const [stack, setStack] = React.useState<PanelId[]>([defaultValue]);
  const currentPanel = stack[stack.length - 1];
  const hasMoreThanOnePanel = stack.length > 1;

  const pushNewPanel = (panelId: PanelId) => {
    setStack((prevStack) => [...prevStack, panelId]);
    setDirection(1);
  };

  const removePanel = () => {
    if (!hasMoreThanOnePanel) return;
    setStack((prevStack) => prevStack.slice(0, -1));
    setDirection(-1);
  };

  const value = {
    currentPanel,
    direction,
    hasMoreThanOnePanel,
    pushNewPanel,
    removePanel,
  };

  return (
    <AnimatePresence initial={false} custom={direction} mode="popLayout">
      <motion.div
        key={currentPanel}
        variants={panelTransitionVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        custom={direction}
      >
        <TransitionPanelContext value={value}>
          {children}
        </TransitionPanelContext>
      </motion.div>
    </AnimatePresence>
  );
}

const useTransitionPanel = () => {
  const context = React.useContext(TransitionPanelContext);

  if (context === undefined)
    throw new Error("useContentStack must be used within a TransitionPanel");

  return context;
};

type TransitionPanelContentProps = React.ComponentProps<"div"> & {
  value: PanelId;
};

function TransitionPanelContent({
  value,
  className,
  children,
  ...props
}: TransitionPanelContentProps) {
  const { currentPanel } = useTransitionPanel();

  if (value === currentPanel) {
    return (
      <div className={cn("p-2", className)} {...props}>
        <TransitionPanelBackButton className="mb-2" />
        {children}
      </div>
    );
  }
}

type TransitionPanelTriggerProps = React.ComponentProps<typeof Button> & {
  value: PanelId;
};

function TransitionPanelTrigger({
  value,
  onClick,
  children,
  variant = "ghost",
  className,
  ...props
}: TransitionPanelTriggerProps) {
  const { pushNewPanel } = useTransitionPanel();

  return (
    <Button
      onClick={(e) => {
        pushNewPanel(value);
        onClick?.(e);
      }}
      variant={variant}
      className={cn("w-full justify-start", className)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto shrink-0" />
    </Button>
  );
}

function TransitionPanelBackButton({
  onClick,
  children,
  variant = "secondary",
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { hasMoreThanOnePanel, removePanel } = useTransitionPanel();

  return (
    <Button
      onClick={(e) => {
        removePanel();
        onClick?.(e);
      }}
      variant={variant}
      size="sm"
      className={cn(!hasMoreThanOnePanel && "hidden", className)}
      {...props}
    >
      {children || "Back"}
    </Button>
  );
}

export {
  TransitionPanel,
  TransitionPanelContent,
  TransitionPanelTrigger,
  TransitionPanelBackButton,
};
