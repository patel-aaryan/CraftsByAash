import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ProductResults } from "@/types/responses/productResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResults>
) {
  const response = await axios.get<ProductResults>(
    `${process.env.NEXT_PUBLIC_API_URL}/store/products/`
  );
  return res.status(200).json(response.data);
}
