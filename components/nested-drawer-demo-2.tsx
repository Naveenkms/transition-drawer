import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import {
  ContentStack,
  ContentStackBackButton,
  ContentStackButton,
  ContentStackContent,
  ContentStackGroup,
  ContentStackItem,
} from "./ui/content-stack";

export function NestedDrawerDemo2() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden>
        <ContentStack defaultValue="main">
          <ContentStackContent value="main">
            <ContentStackGroup>
              <ContentStackItem>
                <ContentStackButton value="home">Home</ContentStackButton>
              </ContentStackItem>
              <ContentStackItem>
                <ContentStackButton value="products">
                  Products
                </ContentStackButton>
              </ContentStackItem>
            </ContentStackGroup>
          </ContentStackContent>
          <ContentStackContent value="home">
            <ContentStackBackButton />
            <ContentStackGroup>
              <ContentStackItem>
                <ContentStackButton value="products">
                  Home Item 1
                </ContentStackButton>
              </ContentStackItem>
            </ContentStackGroup>
          </ContentStackContent>
          <ContentStackContent value="products">
            Products Sub
          </ContentStackContent>
        </ContentStack>
      </DrawerContent>
    </Drawer>
  );
}
