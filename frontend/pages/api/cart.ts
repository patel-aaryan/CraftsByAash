import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/store/carts/`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cartId, id } = req.query as { cartId: string; id: string };
  const headers = {
    Authorization: req.headers.authorization,
  };

  if (req.method == "POST") {
    const response = await axios.post(`${url}${cartId}/items/`, req.body, {
      headers,
    });
    return res.status(200).json(response.data);
  } else if (req.method == "DELETE") {
    const response = await axios.delete(`${url}${cartId}/items/${id}/`);
    return res.status(200).json(response.data);
  } else if (req.method == "PATCH") {
    const response = await axios.patch(
      `${url}${cartId}/items/${id}/`,
      req.body,
      { headers }
    );
    return res.status(200).json(response.data);
  }
}
