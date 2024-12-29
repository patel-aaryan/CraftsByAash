import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useUser } from "@/context/userContext";
import { Field, StateMap } from "@/types/forms";
import {
  getBase,
  handleBlur,
  handleChange,
  validateRequired,
} from "@/utils/forms";
import LoadingButton from "@mui/lab/LoadingButton";

export function Details() {
  const { firstName, lastName } = useUser();

  const [newFirstName, setNewFirstName] = useState<Field>(
    getBase("First Name"),
  );
  const [newLastName, setNewLastName] = useState<Field>(getBase("Last Name"));

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [canEdit, setCanEdit] = useState(true);
  const handleEdit = () => {
    if (!canEdit) resetForm();
    setCanEdit((prev) => !prev);
  };
  const resetForm = () => {
    setNewFirstName(getBase("First Name", firstName));
    setNewLastName(getBase("Last Name", lastName));
    setIsFormValid(false);
  };

  const stateMap: StateMap = {
    firstName: {
      state: newFirstName,
      setState: setNewFirstName,
      validate: validateRequired,
    },
    lastName: {
      state: newLastName,
      setState: setNewLastName,
      validate: validateRequired,
    },
  };

  useEffect(() => {
    if (firstName && lastName) {
      setNewFirstName((prev) => ({ ...prev, value: firstName }));
      setNewLastName((prev) => ({ ...prev, value: lastName }));
    }
  }, [firstName, lastName]);

  useEffect(() => {
    const allFieldsValid = Object.values(stateMap).every(
      ({ state }) => state.error === "" && state.value,
    );
    const isChanged =
      newFirstName.value !== firstName || newLastName.value !== lastName;

    setIsFormValid(allFieldsValid && isChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFirstName, newLastName]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(newFirstName.value, newLastName.value);
    if (isFormValid) {
      setLoading(true);
      try {
        const payload = {
          first_name: newFirstName.value,
          last_name: newLastName.value,
        };

        await fetch(`/api/settings/name`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      window.location.reload();
    }
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
        label={newFirstName.label}
        name="firstName"
        variant="outlined"
        fullWidth
        required
        value={newFirstName.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!newFirstName.error}
        helperText={newFirstName.error}
        disabled={canEdit}
      />

      <TextField
        label={newLastName.label}
        name="lastName"
        variant="outlined"
        fullWidth
        required
        value={newLastName.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!newLastName.error}
        helperText={newLastName.error}
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
