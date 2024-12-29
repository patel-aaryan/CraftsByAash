import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

const sendGridApiKey = process.env.SENDGRID_API_KEY;
if (!sendGridApiKey) throw new Error("SENDGRID_API_KEY is not defined");
sgMail.setApiKey(sendGridApiKey);

interface RequestBody {
  firstName: string;
  lastName: string;
  reason: string;
  email: string;
  phone: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { firstName, lastName, reason, email, phone, message }: RequestBody =
      req.body;

    if (!process.env.EMAIL) {
      return res.status(500).json({ error: "Host email doesn't exist" });
    }

    if (!email) return res.status(400).json({ error: "Email is required" });

    const msg = {
      to: email,
      from: process.env.EMAIL,
      subject: `New message from ${firstName} ${lastName} - ${reason}`,
      text: message,
      html: `<p>You have a new help form submission</p>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Reason for Contact:</strong> ${reason}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>`,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
