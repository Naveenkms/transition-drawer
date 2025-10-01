import {
  fireEvent,
  render,
  screen,
  type RenderResult,
} from "@testing-library/react";
import { axe } from "vitest-axe";

import {
  TransitionPanel,
  TransitionPanelContent,
  TransitionPanelTrigger,
} from "./transition-panel";

const TRIGGER_TEXT = "Trigger";
const CONTENT_TEXT = "Content";

function TransitionPanelTest() {
  return (
    <TransitionPanel defaultValue="root">
      <TransitionPanelContent value="root">
        <TransitionPanelTrigger value="trigger">
          {TRIGGER_TEXT}
        </TransitionPanelTrigger>
      </TransitionPanelContent>
      <TransitionPanelContent value="trigger">
        {CONTENT_TEXT}
      </TransitionPanelContent>
    </TransitionPanel>
  );
}

describe("given a default TransitionPanel", () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(<TransitionPanelTest />);
  });

  it("should have no accessibility violations", async () => {
    expect(await axe(rendered.container)).toHaveNoViolations();
  });

  describe("when clicking the trigger", () => {
    beforeEach(() => {
      const trigger = rendered.getByText(TRIGGER_TEXT);
      fireEvent.click(trigger);
    });

    it("should show the corresponding content", async () => {
      expect(await screen.findByText(CONTENT_TEXT)).toBeInTheDocument();
    });

    it("should show a back button", async () => {
      expect(
        await screen.findByRole("button", { name: /back/i })
      ).toBeInTheDocument();
    });

    describe("and then clicking the back button", () => {
      beforeEach(async () => {
        const backButton = await screen.findByRole("button", { name: /back/i });
        fireEvent.click(backButton);
      });

      it("should go back to the previous panel", async () => {
        expect(await screen.findByText(TRIGGER_TEXT)).toBeInTheDocument();
      });
    });
  });

  it("should show a class hidden in the back button when on the root panel", async () => {
    expect(await screen.findByRole("button", { name: /back/i })).toHaveClass(
      "hidden"
    );
  });
});
