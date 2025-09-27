"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { Button } from "./button";

type Value = string;

type ContentStackState = {
  currentVisibleContentValue: Value;
  currentVisibleStackIndex: number;
  push: (value: Value) => void;
  back: () => void;
  reset: () => void;
};

const initialContext: ContentStackState = {
  currentVisibleContentValue: "",
  currentVisibleStackIndex: 0,
  push: (value: Value) => {},
  back: () => {},
  reset: () => {},
};

const ContentStackContext =
  React.createContext<ContentStackState>(initialContext);

const useContentStack = () => {
  const context = React.useContext(ContentStackContext);

  if (context === undefined)
    throw new Error("useContentStack must be used within a ContentStack");

  return context;
};

type ContentStackProps = {
  defaultValue: Value;
  children: React.ReactNode;
};

function ContentStack({ defaultValue, children }: ContentStackProps) {
  const [stack, setStack] = React.useState<Value[]>([defaultValue]);

  const currentVisibleStackContent = stack[stack.length - 1];
  const currentVisibleStackIndex = stack.length - 1;

  const push = (value: Value) => {
    setStack((prevValues) => [...prevValues, value]);
  };

  const back = () => {
    if (stack.length > 1) setStack((prevValues) => prevValues.slice(0, -1));
  };

  const reset = () => {
    setStack([defaultValue]);
  };

  return (
    <ContentStackContext
      value={{
        currentVisibleContentValue: currentVisibleStackContent,
        currentVisibleStackIndex,
        push,
        back,
        reset,
      }}
    >
      {children}
    </ContentStackContext>
  );
}

type ContentStackContentProps = React.ComponentProps<"div"> & {
  value: string;
};

function ContentStackContent({
  value,
  className,
  children,
  ...props
}: ContentStackContentProps) {
  const { currentVisibleContentValue } = useContentStack();

  const isContentVisible = value === currentVisibleContentValue;

  return (
    <div
      data-state={isContentVisible ? "visible" : "hidden"}
      className={cn(
        "flex-col gap-2 p-4",
        className,
        isContentVisible ? "flex" : "hidden"
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type ContentStackGroupProps = React.ComponentProps<"ul"> & {
  children: React.ReactNode;
};

function ContentStackGroup({
  className,
  children,
  ...props
}: ContentStackGroupProps) {
  return (
    <ul className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </ul>
  );
}

type ContentStackItemProps = React.ComponentProps<"li">;

function ContentStackItem({ ...props }: ContentStackItemProps) {
  return <li {...props} />;
}

type ContentStackButtonProps = React.ComponentProps<"button"> & {
  value: string;
};

function ContentStackButton({
  value,
  children,
  ...props
}: ContentStackButtonProps) {
  const { push } = useContentStack();

  const navigateToContent = () => {
    push(value);
  };

  return (
    <button onClick={navigateToContent} data-value={value} {...props}>
      {children}
    </button>
  );
}

type ContentStackBackButtonProps = React.ComponentProps<typeof Button>;

function ContentStackBackButton({
  onClick,
  ...props
}: ContentStackBackButtonProps) {
  const { back } = useContentStack();

  return (
    <Button
      onClick={(e) => {
        back();
        onClick?.(e);
      }}
      {...props}
    >
      Back
    </Button>
  );
}

export {
  useContentStack,
  ContentStack,
  ContentStackContent,
  ContentStackGroup,
  ContentStackItem,
  ContentStackButton,
  ContentStackBackButton,
};
