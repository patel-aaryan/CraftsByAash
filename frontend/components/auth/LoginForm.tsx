import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { IncorrectCredentials } from "@/components/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import { Field, StateMap } from "@/types/forms";
import {
  getBase,
  handleBlur,
  handleChange,
  validatePassword,
  validateUsername,
} from "@/utils/forms";
import { getPasswordProps } from "@/utils/forms/props";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState<Field>(getBase("Username"));
  const [password, setPassword] = useState<Field>(getBase("Password"));
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = (
    setState: Dispatch<SetStateAction<boolean>>,
  ) => {
    setState((prev) => !prev);
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const stateMap: StateMap = {
    username: {
      state: username,
      setState: setUsername,
      validate: validateUsername,
    },
    password: {
      state: password,
      setState: setPassword,
      validate: validatePassword,
    },
  };

  useEffect(() => {
    const allFieldsValid = Object.values(stateMap).every(
      ({ state }) => state.error === "" && state.value,
    );
    setIsFormValid(allFieldsValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setLoading(true);
      try {
        const response = await signIn("credentials", {
          username: username.value,
          password: password.value,
          redirect: false,
          callbackUrl: "/",
        });
        if (response?.error) handleOpen();

        if (response?.url) router.push("/");
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
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
        Log In
      </Typography>

      <TextField
        label="Username"
        name="username"
        value={username.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!username.error}
        helperText={username.error}
        required
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={password.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!password.error}
        helperText={password.error}
        required
        slotProps={getPasswordProps(
          showPassword,
          setShowPassword,
          handleTogglePassword,
        )}
      />

      <Box display="flex" justifyItems="center" my={1}>
        <LoadingButton
          loading={loading}
          variant="contained"
          disabled={!isFormValid}
          sx={{ mt: 1, pt: 1 }}
          type="submit"
          fullWidth
        >
          <Typography sx={{ mx: 2 }}>Log In</Typography>
        </LoadingButton>
      </Box>

      <IncorrectCredentials open={open} handleClose={handleClose} />
    </Box>
  );
}
