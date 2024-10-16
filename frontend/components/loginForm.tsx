import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", { username, password, callbackUrl: "/" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </FormControl>

      <FormControl fullWidth margin="dense">
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>

      <div className="flex justify-center my-4">
        <Button
          type="submit"
          variant="contained"
          className="w-full h-12 rounded-lg"
        >
          <Typography className="mx-4">Login</Typography>
        </Button>
      </div>
    </Box>
  );
}
