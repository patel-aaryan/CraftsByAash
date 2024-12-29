import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { UserAddress } from "@/types/responses/userResponses";

interface Props {
  address: UserAddress;
  onEdit: () => void;
  onRemove: () => void;
}

export function AddressCard({ address, onEdit, onRemove }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        height: 260,
        p: 2,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          {address.full_name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {address.street_number} {address.street_name}
        </Typography>

        {address.apt_number && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {address.apt_number}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {address.city}, {address.state_province}, {address.country}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {address.zip_postal_code}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", gap: 4 }}>
        <Button size="small" variant="contained" onClick={onEdit} fullWidth>
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={onRemove}
          fullWidth
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
