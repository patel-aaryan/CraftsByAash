import React from "react";
import { useRouter } from "next/router";
import CenterCard from "@/components/CenterCard";
import { Box, Button, Typography } from "@mui/material";

export default function ComingSoon() {
  const router = useRouter();
  const goBack = () => router.push("/");

  return (
    <CenterCard>
      <Typography variant="h4" align="center" gutterBottom>
        Exciting News Ahead!
      </Typography>

      <Box py={2}>
        <Typography align="center" gutterBottom>
          We are working behind the scenes to bring you an incredible new
          feature that will enhance your experience. Stay tuned as we put the
          finishing touches on this amazing addition.
        </Typography>
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 1, pt: 1 }}
        onClick={goBack}
        fullWidth
      >
        <Typography align="center">Return to Home</Typography>
      </Button>
    </CenterCard>
  );
}
