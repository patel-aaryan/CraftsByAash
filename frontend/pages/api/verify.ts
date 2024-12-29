import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/core/verify-email/`;
    const response = await axios.get(url, {
      params: { token },
      headers: { "Content-Type": "application/json" },
    });
    return res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
