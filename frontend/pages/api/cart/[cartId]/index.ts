import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cartId, id } = req.query as { cartId: string; id: string };
  const url = `${process.env.API_URL}/store/carts/`;
  const headers = { Authorization: req.headers.authorization };

  let response;

  if (req.method === "POST") {
    response = await axios.post(`${url}${cartId}/items/`, req.body, {
      headers,
    });
  } else if (req.method === "DELETE") {
    response = await axios.delete(`${url}${cartId}/items/${id}/`);
  } else if (req.method === "PATCH") {
    response = await axios.patch(`${url}${cartId}/items/${id}/`, req.body, {
      headers,
    });
  } else if (req.method === "GET" || true) {
    response = await axios.get(url, { headers });
  }
  return res.status(200).json(response.data);
}
