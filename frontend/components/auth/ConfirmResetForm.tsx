import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  getBase,
  getPasswordProps,
  handleBlur,
  handleChange,
  validatePassword,
} from "@/utils/forms";
import { Field, StateMap } from "@/types/forms";
import { VerificationModal } from "@/components/auth/VerificationModal";

interface Props {
  uid: string;
  passwordToken: string;
}

export function ConfirmResetForm({ uid, passwordToken }: Props) {
  const [password, setPassword] = useState<Field>(getBase("Password"));
  const [confirm, setConfirm] = useState<Field>(getBase("Confirm"));

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleTogglePassword = (
    setState: Dispatch<SetStateAction<boolean>>,
  ) => {
    setState((prev) => !prev);
  };

  const stateMap: StateMap = {
    password: {
      state: password,
      setState: setPassword,
      validate: validatePassword,
    },
    confirm: {
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
  }, [password, confirm]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password.value !== confirm.value) {
      setConfirm((prev) => ({
        ...prev,
        error: "Passwords do not match",
      }));
      return;
    }

    if (!isFormValid) return;

    try {
      setLoading(true);
      const payload = {
        uid: uid,
        token: passwordToken,
        new_password: password.value,
      };
      const response = await fetch("/api/password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setModalOpen(true);
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        display="flex"
        flexDirection="column"
        gap={2}
        my={2}
        mx={2}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Reset Your Password
        </Typography>

        <TextField
          label="New Password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          required
          value={password.value}
          onChange={handleChange(stateMap)}
          onBlur={handleBlur(stateMap)}
          error={!!password.error}
          helperText={password.error}
          slotProps={getPasswordProps(
            showPassword,
            setShowPassword,
            handleTogglePassword,
          )}
        />

        <TextField
          label="Confirm Password"
          name="confirm"
          type={showConfirm ? "text" : "password"}
          variant="outlined"
          fullWidth
          required
          value={confirm.value}
          onChange={handleChange(stateMap)}
          onBlur={handleBlur(stateMap)}
          error={!!confirm.error}
          helperText={confirm.error}
          slotProps={getPasswordProps(
            showConfirm,
            setShowConfirm,
            handleTogglePassword,
          )}
        />

        <Box display="flex" justifyItems="center" my={1}>
          <LoadingButton
            loading={loading}
            variant="contained"
            type="submit"
            fullWidth
          >
            <Typography sx={{ mx: 2 }}>Submit</Typography>
          </LoadingButton>
        </Box>
      </Box>
      {modalOpen && <VerificationModal />}
    </>
  );
}
