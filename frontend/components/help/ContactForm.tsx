import { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Fade,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Field, StateMap } from "@/types/forms";
import {
  getBase,
  handleBlur,
  handleChange,
  validateEmail,
  validateRequired,
} from "@/utils/forms";
import { Alert } from "@mui/lab";

// file upload pending
export function ContactForm() {
  const menuItems = [
    "Custom Order",
    "Product/Order Issues",
    "Technical Support",
    "Other",
  ];

  const [firstName, setFirstName] = useState<Field>(getBase("First Name"));
  const [lastName, setLastName] = useState<Field>(getBase("Last Name"));
  const [reason, setReason] = useState<Field>(getBase("Reason"));
  const [email, setEmail] = useState<Field>(getBase("Email"));
  const [phone, setPhone] = useState<Field>(getBase("Phone"));
  const [message, setMessage] = useState<Field>(getBase("Message"));

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
    reason: {
      state: reason,
      setState: setReason,
      validate: validateRequired,
    },
    email: {
      state: email,
      setState: setEmail,
      validate: validateEmail,
    },
    phone: {
      state: phone,
      setState: setPhone,
      validate: validateRequired,
    },
    message: {
      state: message,
      setState: setMessage,
      validate: validateRequired,
    },
  };

  useEffect(() => {
    const allFieldsValid = Object.values(stateMap).every(
      ({ state }) => state.error === "" && state.value,
    );
    setIsFormValid(allFieldsValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, reason, email, email, phone, message]);

  const resetForm = () => {
    setFirstName(getBase("First Name"));
    setLastName(getBase("Last Name"));
    setReason(getBase("Reason"));
    setEmail(getBase("Email"));
    setPhone(getBase("Phone"));
    setMessage(getBase("Message"));
    setIsFormValid(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isFormValid) {
      setLoading(true);
      const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        reason: reason.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        resetForm();
        setSuccessMessage("Your message has been sent successfully!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        alert("Error! A problem has occurred while submitting your data.");
      }
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt:8 }}>
      <Typography variant="h5" mb={1}>
        How Can We Help?
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box display="flex">
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            fullWidth
            value={firstName.value}
            onChange={handleChange(stateMap)}
            onBlur={handleBlur(stateMap)}
            error={!!firstName.error}
            helperText={firstName.error}
            margin="normal"
            sx={{ mr: 2 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            fullWidth
            required
            value={lastName.value}
            onChange={handleChange(stateMap)}
            onBlur={handleBlur(stateMap)}
            error={!!lastName.error}
            helperText={lastName.error}
            margin="normal"
            sx={{ ml: 2 }}
          />
        </Box>

        <TextField
          label="Reason for Contact"
          name="reason"
          variant="outlined"
          fullWidth
          required
          value={reason.value}
          onChange={handleChange(stateMap)}
          onBlur={handleBlur(stateMap)}
          error={!!reason.error}
          helperText={reason.error}
          select
          margin="normal"
        >
          {menuItems.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <Box display="flex">
          <TextField
            label="Email"
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
            margin="normal"
            sx={{ mr: 2 }}
          />

          <TextField
            label="Phone Number"
            name="phone"
            variant="outlined"
            fullWidth
            required
            value={phone.value}
            onChange={handleChange(stateMap)}
            onBlur={handleBlur(stateMap)}
            error={!!phone.error}
            helperText={phone.error}
            margin="normal"
            sx={{ ml: 2 }}
          />
        </Box>

        <TextField
          label="Message"
          name="message"
          variant="outlined"
          fullWidth
          required
          value={message.value}
          onChange={handleChange(stateMap)}
          onBlur={handleBlur(stateMap)}
          error={!!message.error}
          helperText={message.error}
          margin="normal"
          multiline
          rows={6}
        />
        <LoadingButton
          loading={loading}
          variant="contained"
          disabled={!isFormValid}
          sx={{ mt: 1, pt: 1 }}
          type="submit"
          fullWidth
        >
          <Typography>Submit</Typography>
        </LoadingButton>

        <Fade in={!!successMessage} timeout={500}>
          <Box>
            {successMessage && (
              <Alert
                severity="success"
                sx={{ boxShadow: 3, borderRadius: 1, mt: 1 }}
              >
                {successMessage}
              </Alert>
            )}
          </Box>
        </Fade>
      </Box>
    </Paper>
  );
}
