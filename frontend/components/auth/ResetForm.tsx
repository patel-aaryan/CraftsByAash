import React, { ChangeEvent, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { validateEmail } from "@/utils/forms";
import { VerificationModal } from "@/components/auth/VerificationModal";

export function ResetForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setError(validateEmail(value, true));
  };

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setEmail(value);
    setError(validateEmail(value, true));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      setLoading(true);
      const payload = { email: email };
      const response = await fetch("/api/password/reset", {
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
      console.error(error);
      alert("Something went wrong. Please try again.");
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
          Forgot Password?
        </Typography>

        <TextField
          label="Enter your email"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={email}
          error={!!error}
          helperText={error}
          required
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
