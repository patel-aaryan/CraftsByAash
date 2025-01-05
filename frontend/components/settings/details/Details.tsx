import React from "react";
import { Box } from "@mui/material";
import {
  EmailSettings,
  NameSettings,
  PhoneSettings,
} from "@/components/settings";

export function Details() {
  return (
    <Box display="flex" justifyContent="space-evenly" gap={2}>
      <Box width="100%">
        <NameSettings />
      </Box>

      <Box width="100%">
        <EmailSettings />
      </Box>

      <Box width="100%">
        <PhoneSettings />
      </Box>
    </Box>
  );
}
