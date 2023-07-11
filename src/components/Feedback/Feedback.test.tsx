import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import Feedback from "./Feedback";
import { feedbackRender } from "~/src/__tests__/testUtils/render";

describe("Feedback", () => {
  beforeEach(() => {
    feedbackRender(<Feedback location={"/testing?testQuery"} />);
  });

  describe("Form Submission", () => {
    beforeEach(() => {
      const feedbackButton = screen.getByRole("button", {
        name: "Help and Feedback",
      });
      fireEvent.click(feedbackButton);
    });

    const fakeFetch = jest.fn();
    window.fetch = fakeFetch;
    test("should invoke method when success and feedback set", () => {
      const feedback = screen.getByRole("textbox", {
        name: "Comment (Required)",
      });
      const commentRadio = screen.getByLabelText("Comment");
      fireEvent.change(feedback, { target: { value: "test value" } });
      fireEvent.click(commentRadio);

      expect(feedback).toHaveValue("test value");
      expect(commentRadio).toBeChecked();
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
