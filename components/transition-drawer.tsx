import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Archive, HomeIcon, Info, ReceiptText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerHandle,
} from "@/components/ui/drawer";
import { AnimateHeight } from "./ui/animate-height";
import {
  TransitionPanel,
  TransitionPanelContent,
  TransitionPanelTrigger,
} from "./ui/transition-panel";
import { Button, buttonVariants } from "./ui/button";

export function TransitionDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent asChild className="overflow-hidden w-md mx-auto">
        <AnimateHeight>
          <DrawerHandle />
          <VisuallyHidden>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
            </DrawerHeader>
          </VisuallyHidden>
          <TransitionPanel defaultValue="root">
            <TransitionPanelContent value="root">
              <ul className="divide-y divide-border">
                <li>
                  <TransitionPanelTrigger value="home">
                    <HomeIcon />
                    Home
                  </TransitionPanelTrigger>
                </li>
                <li>
                  <TransitionPanelTrigger value="products">
                    <Archive />
                    Products
                  </TransitionPanelTrigger>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/about">
                      <ReceiptText />
                      About
                    </Link>
                  </Button>
                </li>
                <li>
                  <TransitionPanelTrigger value="more-info">
                    <Info />
                    More Info
                  </TransitionPanelTrigger>
                </li>
              </ul>
            </TransitionPanelContent>

            <TransitionPanelContent value="home">
              <ul>
                <li>
                  <TransitionPanelTrigger value="products">
                    Products
                  </TransitionPanelTrigger>
                </li>
              </ul>
            </TransitionPanelContent>

            <TransitionPanelContent value="products">
              <h6 className=" text-center font-semibold">Products</h6>
              <ul className="divide-y divide-border">
                <li
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-start hover:bg-inherit",
                  })}
                >
                  Item 1
                </li>
                <li
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-start hover:bg-inherit",
                  })}
                >
                  Item 2
                </li>
                <li
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-start hover:bg-inherit",
                  })}
                >
                  Item 3
                </li>
              </ul>
            </TransitionPanelContent>
            <TransitionPanelContent value="more-info">
              <Image
                src="https://avatars.githubusercontent.com/u/89766436?v=4"
                width={100}
                height={100}
                alt="avatar"
                className="rounded-md overflow-hidden aspect-video w-full"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                repellat repudiandae est? Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Expedita molestias delectus, ut
                sint adipisci voluptatum obcaecati. Iure illo ex blanditiis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                mollitia qui facilis.
              </p>
            </TransitionPanelContent>
          </TransitionPanel>
        </AnimateHeight>
      </DrawerContent>
    </Drawer>
  );
}
