import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import sgMail from "@sendgrid/mail";
import { OrderCreate } from "@/types/responses/orderResponses";
import { COMPANY } from "@/utils/constants";

const sendGridApiKey = process.env.SENDGRID_API_KEY;
if (!sendGridApiKey) throw new Error("SENDGRID_API_KEY is not defined");
sgMail.setApiKey(sendGridApiKey);
async function sendOrderConfirmation(order: OrderCreate, email: string) {
  if (!process.env.EMAIL) return;

  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject: `Order Confirmation - ${COMPANY}`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h1 style="color: #4CAF50;">Order Summary</h1>
      <p>Thank you for your purchase! Here are the details of your order:</p>

      <section style="margin-bottom: 20px;">
        <h2 style="color: #4CAF50;">Order Details</h2>
        <p><strong>Placed At:</strong> ${new Date(order.placed_at).toLocaleString()}</p>
        <p><strong>Total Amount:</strong> $${order.total.toFixed(2)}</p>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr>
              <th style="border-bottom: 2px solid #4CAF50; padding: 8px;">Product</th>
              <th style="border-bottom: 2px solid #4CAF50; padding: 8px;">Quantity</th>
              <th style="border-bottom: 2px solid #4CAF50; padding: 8px;">Price</th>
              <th style="border-bottom: 2px solid #4CAF50; padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item) => `
              <tr>
                <td style="padding: 8px;">${item.product.name}</td>
                <td style="padding: 8px;">${item.quantity}</td>
                <td style="padding: 8px;">$${item.product.price.toFixed(2)}</td>
                <td style="padding: 8px;">$${item.price.toFixed(2)}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </section>

      <section style="margin-bottom: 20px;">
        <h2 style="color: #4CAF50;">Shipping & Billing</h2>

        <h3>Shipping Address</h3>
        <p>
          ${order.shipping_address.street_number} ${order.shipping_address.street_name}, 
          ${order.shipping_address.apt_number ? `Apt ${order.shipping_address.apt_number},` : ""}
          ${order.shipping_address.city}, 
          ${order.shipping_address.state_province}, 
          ${order.shipping_address.country}, 
          ${order.shipping_address.zip_postal_code}
        </p>
        ${order.phone ? `<p><strong>Phone:</strong> ${order.phone}</p>` : ""}

        <h3>Billing Address</h3>
        <p>
          ${order.billing_address.street_number} ${order.billing_address.street_name}, 
          ${order.billing_address.apt_number ? `Apt ${order.billing_address.apt_number},` : ""}
          ${order.billing_address.city}, 
          ${order.billing_address.state_province}, 
          ${order.billing_address.country}, 
          ${order.billing_address.zip_postal_code}
        </p>
      </section>

      <footer style="margin-top: 30px; font-size: 0.9em; color: #777;">
        <p>If you have any questions about your order, please contact us at 
          <a href="mailto:${process.env.EMAIL}">${process.env.EMAIL}</a>.
        </p>
      </footer>
    </div>
  `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
}

const url = `${process.env.NEXT_PUBLIC_API_URL}/store/orders/`;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email } = req.query;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const headers = { Authorization: req.headers.authorization };
  const response = await axios.post<OrderCreate>(url, req.body, { headers });
  const order: OrderCreate = response.data;

  await sendOrderConfirmation(order, email);
  return res.status(200).json(order);
}
