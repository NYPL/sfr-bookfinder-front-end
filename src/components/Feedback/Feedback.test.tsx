import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Feedback from "./Feedback";

describe("Feedback", () => {
  beforeEach(() => {
    render(<Feedback location={"/testing?testQuery"} />);
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
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
