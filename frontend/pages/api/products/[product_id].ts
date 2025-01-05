import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ProductResults } from "@/types/responses/productResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResults>,
) {
  const { product_id } = req.query;
  const url = `${process.env.API_URL}/store/products/${product_id}/`;
  const response = await axios.get<ProductResults>(url);
  return res.status(200).json(response.data);
}
