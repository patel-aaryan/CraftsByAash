import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/store/address/`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = { Authorization: req.headers.authorization };

  let response;
  if (req.method == "POST") {
    response = await axios.post(url, req.body, { headers });
  } else if (req.method == "GET" || true) {
    response = await axios.get(url, { headers });
  }
  return res.status(200).json(response.data);
}
