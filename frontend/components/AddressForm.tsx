import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
} from "@mui/material";
import { AddressDetails } from "@/types/forms";
import { UserAddress } from "@/types/responses/userResponses";

interface AddressFormProps {
  address?: UserAddress;
  open: boolean;
  handleClose: () => void;
  handleSubmit: (addressDetails: AddressDetails) => void;
}

export default function AddressForm({
  address,
  open,
  handleClose,
  handleSubmit,
}: AddressFormProps) {
  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    full_name: address?.full_name,
    street_number: address?.street_number,
    street_name: address?.street_name,
    apt_number: address?.apt_number,
    city: address?.city,
    state_province: address?.state_province,
    country: address?.country,
    zip_postal_code: address?.zip_postal_code,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressDetails((prevDetails: AddressDetails) => ({
      ...prevDetails,
      [name]: value ? value : null,
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Enter Address Details</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          pt={2}
        >
          <TextField
            name="full_name"
            value={addressDetails.full_name}
            onChange={handleInputChange}
            label="Full Name (First and Last)"
            variant="outlined"
            fullWidth
          />

          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 4 }}>
              <TextField
                name="apt_number"
                value={addressDetails.apt_number}
                onChange={handleInputChange}
                fullWidth
                label="Apartment Number"
                variant="outlined"
              />
            </Grid2>

            <Grid2 size={{ xs: 4 }}>
              <TextField
                name="street_number"
                value={addressDetails.street_number}
                onChange={handleInputChange}
                fullWidth
                label="Street Number"
                variant="outlined"
              />
            </Grid2>

            <Grid2 size={{ xs: 4 }}>
              <TextField
                name="street_name"
                value={addressDetails.street_name}
                onChange={handleInputChange}
                fullWidth
                label="Street Name"
                variant="outlined"
              />
            </Grid2>
          </Grid2>

          {/* City and Postal Code */}
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                name="city"
                value={addressDetails.city}
                onChange={handleInputChange}
                label="City"
                variant="outlined"
                fullWidth
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                name="zip_postal_code"
                value={addressDetails.zip_postal_code}
                onChange={handleInputChange}
                label="Postal Code"
                variant="outlined"
                fullWidth
              />
            </Grid2>
          </Grid2>

          {/* Province and Country */}
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                name="state_province"
                value={addressDetails.state_province}
                onChange={handleInputChange}
                label="Province"
                variant="outlined"
                fullWidth
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                name="country"
                value={addressDetails.country}
                onChange={handleInputChange}
                label="Country"
                variant="outlined"
                fullWidth
              />
            </Grid2>
          </Grid2>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit(addressDetails)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
