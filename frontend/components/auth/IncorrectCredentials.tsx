import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import Link from "next/link";

interface IncorrectCredentialsProps {
  open: boolean;
  handleClose: () => void;
}

export function IncorrectCredentials({
  open,
  handleClose,
}: IncorrectCredentialsProps) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        textAlign="center"
        bgcolor="#f5f5f5"
        borderBottom="1px solid #ccc"
      >
        Username or Password is Incorrect
      </DialogTitle>

      <DialogActions
        sx={{ display: "flex", justifyContent: "space-evenly", p: 2 }}
      >
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            "&:hover": { bgcolor: "#1565c0" },
          }}
        >
          Try Again
        </Button>
        <Link href="/reset">
          <Button
            variant="contained"
            sx={{
              bgcolor: "#d32f2f",
              color: "#fff",
              "&:hover": { bgcolor: "#c62828" },
            }}
          >
            Forgot Password
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
}
