import { NextApiRequest, NextApiResponse } from "next";
import appConfig from "~/config/appConfig";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req", req);
  console.log("res", res);

  res.statusCode
  //   fetch(appConfig.feedback.formURL, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       fields: {
  //         Email: req.body.email,
  //         Feedback: req.body.feedback,
  //         Success: req.body.success,
  //         URL: `${this.props.location.pathname}${this.props.location.search}`,
  //       },
  //     }),
  //   });
  return res;
};
