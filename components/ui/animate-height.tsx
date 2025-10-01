"use client";
import * as React from "react";
import { motion } from "motion/react";
import useMeasure from "react-use-measure";

type AnimateHeightProps = React.ComponentProps<typeof motion.div> & {
  children: React.ReactNode;
};

export function AnimateHeight({ children, ...props }: AnimateHeightProps) {
  const [ref, bounds] = useMeasure();

  return (
    <motion.div
      animate={{ height: bounds.height > 0 ? bounds.height : "auto" }}
      {...props}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}
