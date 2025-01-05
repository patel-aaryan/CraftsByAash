import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const url = `${process.env.API_URL}/core/resend/`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const headers = { Authorization: req.headers.authorization };
  const response = await axios.get(url, { headers });
  return res.status(200).json(response.data);
}
