import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Feedback from "./Feedback";
import userEvent from "@testing-library/user-event";

describe("Feedback", () => {
  beforeEach(() => {
    render(<Feedback location={"/testing?testQuery"}></Feedback>);
  });

  describe("Feedback button", () => {
    test("should display the Feedback button initially", () => {
      expect(
        screen.getByRole("button", { name: "Feedback" })
      ).toBeInTheDocument();
    });

    test("Feedback form should display when button is clicked", () => {
      expect(screen.getByRole("menu")).not.toBeVisible;

      const feedbackButton = screen.getByRole("button", { name: "Feedback" });
      userEvent.click(feedbackButton);
      expect(screen.getByRole("menu")).toBeVisible;
    });
  });

  describe("Feedback Form", () => {
    beforeEach(() => {
      const feedbackButton = screen.getByRole("button", { name: "Feedback" });
      fireEvent.click(feedbackButton);
    });
    test("should have 3 radio buttons", () => {
      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
      expect(screen.getByRole("radio", { name: "Yes" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "No" })).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: "Just Browsing" })
      ).toBeInTheDocument();
    });

    test("should have a textarea input for comments", () => {
      expect(
        screen.getByRole("textbox", { name: "Comments (Required)" })
      ).toBeInTheDocument();
    });

    test("Should have a Submit and cancel button", () => {
      expect(
        screen.getByRole("button", { name: "Submit" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Cancel" })
      ).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    test("should invoke method when success and feedback set", () => {
      jest.spyOn(window, "alert").mockImplementation(() => jest.fn());

      const feedback = screen.getByRole("textbox", {
        name: "Comments (Required)",
      });
      const yesRadio = screen.getByLabelText("Yes");

      fireEvent.change(feedback, { target: { value: "test value" } });
      fireEvent.click(yesRadio);

      expect(feedback).toHaveValue("test value");
      expect(yesRadio).toBeChecked();

      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(window.alert).toBeCalledWith(
        "Thank you, your feedback has been submitted."
      );
    });
    test("Show error when feedback is not set", () => {
      const yesRadio = screen.getByLabelText("Yes");

      fireEvent.click(yesRadio);

      expect(yesRadio).toBeChecked();

      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(screen.getByText("Comment Required")).toBeInTheDocument();
    });
    test("Clear content when cancel is called", () => {
      const feedback = screen.getByRole("textbox", {
        name: "Comments (Required)",
      });
      fireEvent.change(feedback, { target: { value: "test value" } });
      expect(feedback).toHaveValue("test value");

      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
      expect(screen.getByRole("menu")).not.toBeVisible;
      fireEvent.click(screen.getByRole("button", { name: "Feedback" }));
      expect(feedback).toHaveValue("");
    });
  });
});
