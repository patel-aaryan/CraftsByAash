import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const headers = { Authorization: req.headers.authorization };
  const { address_id } = req.query;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/store/address/${address_id}/`;

  let response;
  if (req.method == "PUT") {
    response = await axios.put(url, req.body, { headers });
  } else if (req.method == "DELETE") {
    response = await axios.delete(url, { headers });
  } else if (req.method == "GET" || true) {
    response = await axios.get(url, { headers });
  }
  return res.status(200).json(response.data);
}
