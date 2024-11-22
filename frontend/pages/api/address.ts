import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { UserAddress } from "@/types/responses/userResponses";

const url = `${process.env.NEXT_PUBLIC_API_URL}/store/address/`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = {
    Authorization: req.headers.authorization,
  };

  const response = await axios.get<UserAddress[]>(url, { headers });

  return res.status(200).json(response.data);
}
