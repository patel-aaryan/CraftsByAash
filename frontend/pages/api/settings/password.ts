import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/users/set_password/`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let response;
  const headers = { Authorization: req.headers.authorization };

  if (req.method == "POST") {
    response = await axios.post(url, req.body, { headers });
  } else {
    response = await axios.get(url, { headers });
  }
  return res.status(200).json(response.data);
}
