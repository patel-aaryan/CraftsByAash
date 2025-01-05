import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import {
  getBase,
  handleBlur,
  handleChange,
  validateRequired,
} from "@/utils/forms";
import { LoadingButton } from "@mui/lab";
import { useUser } from "@/context/userContext";
import { StateMap } from "@/types/forms";

export function EmailSettings() {
  const { data: session } = useSession();
  const token = session?.user?.access;

  const { email } = useUser();
  const [newEmail, setNewEmail] = useState(getBase("Email"));

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [canEdit, setCanEdit] = useState(true);
  const handleEdit = () => {
    if (!canEdit) resetForm();
    setCanEdit((prev) => !prev);
  };

  const resetForm = () => {
    setNewEmail(getBase("Email"));
    setIsFormValid(false);
  };

  const stateMap: StateMap = {
    email: {
      state: newEmail,
      setState: setNewEmail,
      validate: validateRequired,
    },
  };

  useEffect(() => {
    if (!email) return;

    setNewEmail((prev) => ({ ...prev, value: email }));
  }, [email]);

  useEffect(() => {
    const allFieldsValid = Object.values(stateMap).every(
      ({ state }) => state.error === "" && state.value,
    );
    const isChanged = newEmail.value !== email;

    setIsFormValid(allFieldsValid && isChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEmail]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const payload = { email: newEmail.value };

      await fetch(`/api/settings/email`, {
        method: "PATCH",
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
        label={newEmail.label}
        name="email"
        variant="outlined"
        fullWidth
        required
        value={newEmail.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!newEmail.error}
        helperText={newEmail.error}
        disabled={canEdit}
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

        <Button variant="outlined" onClick={handleEdit}>
          {canEdit ? "Edit" : "Cancel"}
        </Button>
      </Box>
    </Box>
  );
}
