import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const url = `${process.env.API_URL}/auth/users/reset_password_confirm/`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let response;

  if (req.method === "POST") {
    response = await axios.post(url, req.body);
  } else {
    response = await axios.get(url);
  }
  return res.status(200).json(response.data);
}
