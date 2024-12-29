import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/users/`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response;
  if (req.method == "POST") {
    response = await axios.post(url, req.body);
  } else {
    response = await axios.post(url, req.body);
  }
  return res.status(200).json(response.data);
}
