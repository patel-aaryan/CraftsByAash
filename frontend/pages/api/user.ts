import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { UserMe } from "@/types/responses/userResponses";
import { CartResults } from "@/types/responses/cartResponses";

const url = `${process.env.NEXT_PUBLIC_API_URL}/store`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = { Authorization: req.headers.authorization };

  const userData = await axios.get<UserMe>(`${url}/users/me/`, { headers });
  const cartData = await axios.get<CartResults[]>(`${url}/carts/`, { headers });

  let cartId;
  if (!cartData.data.length) {
    const newCart = await axios.post<CartResults>(
      `${url}/carts/`,
      {},
      { headers }
    );
    cartId = newCart.data.cart_id;
  } else {
    cartId = cartData.data[0].cart_id;
  }
  const response = { ...userData.data, cart_id: cartId };
  return res.status(200).json(response);
}
