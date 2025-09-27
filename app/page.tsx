"use client";
import { HomeIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NestedDrawer } from "@/components/ui/nested-drawer";
import { NestedDrawerDemo } from "@/components/nested-drawer-demo";

export default function Home() {
  const [animationDirection, setAnimationDirection] = React.useState<
    "forward" | "backward"
  >("forward");

  const [value, setValue] = React.useState(0);

  const variants = {
    enter: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const navigate = () => {};

  const goBack = () => {};

  console.log(value);

  return (
    <div className="min-h-screen flex items-center justify-center">
        <NestedDrawerDemo />
    </div>
  );
}
