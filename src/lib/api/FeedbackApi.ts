import appConfig from "~/config/appConfig";
import { Feedback } from "~/src/types/Feedback";

// TODO: disable feedback in development

export const submitFeedback = async (feedback: Feedback) => {
  await fetch(appConfig.feedback.formURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        Feedback: feedback.feedback,
        Success: feedback.success,
        URL: feedback.url,
      },
    }),
  });
};
