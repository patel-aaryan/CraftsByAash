import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserAddress } from "@/types/responses/userResponses";
import AddressForm from "./AddressForm";
import { useSession } from "next-auth/react";
import { AddressDetails } from "@/types/forms";

interface ExpandablePanelProps {
  label: string;
  addressList: UserAddress[];
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  isExpanded: boolean;
  handleRefresh: () => void;
}

export default function ExpandablePanel({
  label,
  addressList,
  address,
  setAddress,
  isExpanded,
  handleRefresh,
}: ExpandablePanelProps) {
  const { data: session } = useSession();
  const token = session?.user?.access;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddressChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: UserAddress | null,
  ) => {
    setAddress(newValue?.address_id || "");
  };

  const handleSubmit = (addressDetails: AddressDetails) => {
    (async () => {
      await fetch(`/api/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(addressDetails),
      });
    })();
    handleClose();
    handleRefresh();
  };

  return (
    <Accordion disableGutters defaultExpanded={isExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <Autocomplete
            options={addressList}
            onChange={handleAddressChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Saved Addresses"
                value={addressList.find((addr) => addr.address_id === address)}
              />
            )}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button onClick={handleOpen} variant="contained" color="primary">
            Add
          </Button>

          {open && (
            <AddressForm
              open={open}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
            />
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
