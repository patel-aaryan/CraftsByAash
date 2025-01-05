import { Box, Button, TextField } from "@mui/material";
import {
  getBase,
  handleBlur,
  handleChange,
  validateRequired,
} from "@/utils/forms";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "@/context/userContext";
import { StateMap } from "@/types/forms";

export function PhoneSettings() {
  const { data: session } = useSession();
  const token = session?.user?.access;

  const { phone } = useUser();
  const [newPhone, setNewPhone] = useState(getBase("Phone"));

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [canEdit, setCanEdit] = useState(true);
  const handleEdit = () => {
    if (!canEdit) resetForm();
    setCanEdit((prev) => !prev);
  };

  const resetForm = () => {
    setNewPhone(getBase("Phone"));
    setIsFormValid(false);
  };

  const stateMap: StateMap = {
    phone: {
      state: newPhone,
      setState: setNewPhone,
      validate: validateRequired,
    },
  };

  useEffect(() => {
    if (!phone) {
      setCanEdit(true);
      return;
    }

    setNewPhone((prev) => ({ ...prev, value: phone }));
  }, [phone]);

  useEffect(() => {
    const allFieldsValid = Object.values(stateMap).every(
      ({ state }) => state.error === "" && state.value,
    );
    const isChanged = newPhone.value !== phone;

    setIsFormValid(allFieldsValid && isChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPhone]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const payload = { phone: newPhone.value };

      await fetch(`/api/settings/phone`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    window.location.reload();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={500}
    >
      <TextField
        label={newPhone.label}
        name="phone"
        variant="outlined"
        fullWidth
        required
        value={newPhone.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!newPhone.error}
        helperText={newPhone.error}
        disabled={canEdit && !!phone}
      />

      <Box>
        <LoadingButton
          loading={loading}
          disabled={!isFormValid}
          type="submit"
          variant="contained"
          sx={{ mr: 2 }}
        >
          Save
        </LoadingButton>

        {phone && (
          <Button variant="outlined" onClick={handleEdit}>
            {canEdit ? "Edit" : "Cancel"}
          </Button>
        )}
      </Box>
    </Box>
  );
}
