import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const url = `${process.env.API_URL}/auth/users/me/`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let response;
  const headers = { Authorization: req.headers.authorization };

  if (req.method === "PATCH") {
    response = await axios.patch(url, req.body, { headers });
  } else {
    response = await axios.get(url);
  }
  return res.status(200).json(response.data);
}
