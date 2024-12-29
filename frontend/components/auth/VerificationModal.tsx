import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";

export function VerificationModal() {
  return (
    <Modal
      open={true}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          maxWidth: 500,
        }}
      >
        <Box display="flex" justifyContent="center" mb={1}>
          <CheckCircleOutlineIcon color="success" fontSize="large" />
        </Box>

        <Typography variant="h6" mb={2} gutterBottom>
          A verification link has been sent to your email
        </Typography>

        <Typography variant="body1">
          Please click on the link that has just been sent to your email account
          to verify your email.
        </Typography>

        <Link href="/login">
          <Button fullWidth variant="contained" sx={{ mt: 2 }}>
            Log In
          </Button>
        </Link>
      </Paper>
    </Modal>
  );
}
