import appConfig from "~/config/appConfig";
import { Feedback } from "~/src/types/Feedback";

// TODO: disable feedback in development

export const submitFeedback = async (feedback: Feedback) => {
  return await fetch(appConfig.feedback.formURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        Feedback: feedback.feedback,
        Category: feedback.category,
        URL: feedback.url,
      },
    }),
  });
};
