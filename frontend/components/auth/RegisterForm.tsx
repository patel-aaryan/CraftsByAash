import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { VerificationModal } from "@/components/auth";
import { Field, StateMap } from "@/types/forms";
import {
  getBase,
  getPasswordProps,
  handleBlur,
  handleChange,
  validateEmail,
  validatePassword,
  validateRequired,
  validateUsername,
} from "@/utils/forms";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export function RegisterForm() {
  const [firstName, setFirstName] = useState<Field>(getBase("First Name"));
  const [lastName, setLastName] = useState<Field>(getBase("Last Name"));
  const [email, setEmail] = useState<Field>(getBase("Email"));
  const [username, setUsername] = useState<Field>(getBase("Username"));
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
    firstName: {
      state: firstName,
      setState: setFirstName,
      validate: validateRequired,
    },
    lastName: {
      state: lastName,
      setState: setLastName,
      validate: validateRequired,
    },
    email: { state: email, setState: setEmail, validate: validateEmail },
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
  }, [firstName, lastName, email, username, password, confirm]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password.value !== confirm.value) {
      setConfirm((prev) => ({
        ...prev,
        error: "Passwords do not match",
      }));
      return;
    }

    if (isFormValid) {
      setLoading(true);
      try {
        const payload = {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          username: username.value,
          password: password.value,
        };

        const response = await fetch(`/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) setModalOpen(true);
      } catch (error) {
        console.error(error);
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
      my={2}
      mx={2}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>

      <TextField
        label={firstName.label}
        name="firstName"
        variant="outlined"
        fullWidth
        required
        value={firstName.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!firstName.error}
        helperText={firstName.error}
      />

      <TextField
        label={lastName.label}
        name="lastName"
        variant="outlined"
        fullWidth
        required
        value={lastName.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!lastName.error}
        helperText={lastName.error}
      />

      <TextField
        label={email.label}
        name="email"
        type="email"
        variant="outlined"
        fullWidth
        required
        value={email.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!email.error}
        helperText={email.error}
      />

      <TextField
        label={username.label}
        name="username"
        variant="outlined"
        fullWidth
        required
        value={username.value}
        onChange={handleChange(stateMap)}
        onBlur={handleBlur(stateMap)}
        error={!!username.error}
        helperText={username.error}
      />

      <TextField
        label={password.label}
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
        label={confirm.label}
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

      <LoadingButton
        loading={loading}
        variant="contained"
        disabled={!isFormValid}
        sx={{ mt: 1, pt: 1 }}
        type="submit"
        fullWidth
      >
        <Typography sx={{ mx: 2 }}>Register</Typography>
      </LoadingButton>

      {modalOpen && <VerificationModal />}
    </Box>
  );
}
