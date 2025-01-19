import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Order } from "@/types/responses/orderResponses";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

export function OrderHistory() {
  const { data: session } = useSession();
  const token = session?.user?.access;

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!token) return;

    (async () => {
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });
      const data: Order[] = await response.json();
      setOrders(data);
    })();
  }, [token]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      {orders.map((order) => (
        <Card key={order.id} sx={{ mb: 3 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Order #{order.id}</Typography>
                  <Typography variant="body2">
                    Placed on:{" "}
                    {dayjs(order.placed_at).format("dddd, MMMM D, YYYY")}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1">
                    Status: {order.payment_status}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1">
                    Total: ${order.total.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Shipping Address</Typography>
                  <Typography variant="body2">
                    {order.shipping_address.street_name},{" "}
                    {order.shipping_address.city},{" "}
                    {order.shipping_address.state_province},{" "}
                    {order.shipping_address.zip_postal_code}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Billing Address</Typography>
                  <Typography variant="body2">
                    {order.billing_address.street_name},{" "}
                    {order.billing_address.city},{" "}
                    {order.billing_address.state_province},{" "}
                    {order.billing_address.zip_postal_code}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Items</Typography>
                  <List>
                    {order.items.map((item) => (
                      <ListItem key={item.id}>
                        <ListItemText
                          primary={`${item.product.name} (x${item.quantity})`}
                          secondary={`Price: $${item.price.toFixed(
                            2
                          )}, Total: $${(item.price * item.quantity).toFixed(2)}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </Box>
  );
}
