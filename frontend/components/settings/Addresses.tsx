import React, { useState } from "react";
import { Grid2 } from "@mui/material";
import { AddAddress, AddressCard } from "@/components/settings";
import { UserAddress } from "@/types/responses/userResponses";
import AddressForm from "@/components/AddressForm";
import { AddressDetails } from "@/types/forms";
import { useSession } from "next-auth/react";

interface Props {
  addresses: UserAddress[];
  handleRefresh: () => void;
}

export function Addresses({ addresses, handleRefresh }: Props) {
  const { data: session } = useSession();
  const token = session?.user?.access;

  const [address, setAddress] = useState<UserAddress>();
  const [postOrPut, setPostOrPut] = useState<"POST" | "PUT">();
  const [open, setOpen] = useState(false);

  const handleNew = () => {
    setAddress(undefined);
    setPostOrPut("POST");
    setOpen(true);
  };

  const handleEdit = (addr: UserAddress) => {
    setAddress(addr);
    setPostOrPut("PUT");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleRemove = async (address_id: string) => {
    await fetch(`/api/address/${address_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });

    handleRefresh();
  };

  const handleSubmit = async (addressDetails: AddressDetails) => {
    if (!postOrPut) return;
    if (!address && postOrPut === "PUT") return;
    console.log(addressDetails);

    const url =
      postOrPut === "POST"
        ? "/api/address"
        : `/api/address/${address?.address_id}`;

    try {
      const response = await fetch(url, {
        method: postOrPut,
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(addressDetails),
      });

      if (!response.ok) {
        console.error("Fetch request failed:", response.statusText);
        return;
      }

      handleClose();
      setPostOrPut(undefined);
      handleRefresh();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <Grid2 container spacing={2}>
      {addresses.map((addr, index) => (
        <Grid2 key={index} size="auto">
          <AddressCard
            address={addr}
            onEdit={() => handleEdit(addr)}
            onRemove={() => handleRemove(addr.address_id)}
          />
        </Grid2>
      ))}

      <AddAddress handleNew={handleNew} />

      {open && (
        <AddressForm
          address={address}
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
    </Grid2>
  );
}
