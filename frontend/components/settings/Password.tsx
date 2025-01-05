import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Field, StateMap } from "@/types/forms";
import {
  getBase,
  handleBlur,
  handleChange,
  validatePassword,
  validateRequired,
} from "@/utils/forms";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSession } from "next-auth/react";
import { getPasswordProps } from "@/utils/forms/props";

export function Password() {
  const { data: session } = useSession();
  const token = session?.user?.access;

  const [oldPass, setOldPass] = useState<Field>(getBase("Password"));
  const [newPass, setNewPass] = useState<Field>(getBase("New Password"));
  const [confirm, setConfirm] = useState<Field>(getBase("Confirm Password"));

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleTogglePassword = (
    setState: Dispatch<SetStateAction<boolean>>,
  ) => {
    setState((prev) => !prev);
  };

  const resetForm = () => {
    console.log("lol");
    setOldPass(getBase("Password"));
    setNewPass(getBase("New Password"));
    setConfirm(getBase("Confirm Password"));
    setIsFormValid(false);
  };

  const stateMap: StateMap = {
    oldPassword: {
      state: oldPass,
      setState: setOldPass,
      validate: validateRequired,
    },
    newPassword: {
      state: newPass,
      setState: setNewPass,
      validate: validatePassword,
    },
    confirmPassword: {
      state: confirm,
      setState: setConfirm,
      validate: validatePassword,
    },
  };

  useEffect(() => {
    const allFieldsValid = Object.values(stateMap).every(
      ({ state }) => state.error === "" && state.value,
    );
    setIsFormValid(allFieldsValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldPass, newPass, confirm]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(newPass.value, confirm.value);
    if (newPass.value !== confirm.value) {
      setConfirm((prev) => ({
        ...prev,
        value: "",
        error: "Passwords do not match",
      }));
      setNewPass((prev) => ({ ...prev, value: "" }));
      return;
    }

    if (!isFormValid) return;

    setLoading(true);
    try {
      const payload = {
        new_password: newPass.value,
        current_password: oldPass.value,
      };
      console.log(payload);

      await fetch(`/api/settings/password`, {
        method: "POST",
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
        label={oldPass.label}
        name="oldPassword"
        type={showOldPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        required
        value={oldPass.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!oldPass.error}
        helperText={oldPass.error}
        slotProps={getPasswordProps(
          showOldPassword,
          setShowOldPassword,
          handleTogglePassword,
        )}
      />

      <TextField
        label={newPass.label}
        name="newPassword"
        type={showNewPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        required
        value={newPass.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!newPass.error}
        helperText={newPass.error}
        slotProps={getPasswordProps(
          showNewPassword,
          setShowNewPassword,
          handleTogglePassword,
        )}
      />
      <TextField
        label={confirm.label}
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        required
        value={confirm.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!confirm.error}
        helperText={confirm.error}
        slotProps={getPasswordProps(
          showConfirmPassword,
          setShowConfirmPassword,
          handleTogglePassword,
        )}
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

        <Button variant="outlined" onClick={resetForm}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
