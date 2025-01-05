import Link from "next/link";
import React, { MouseEvent, useState } from "react";
import { useUser } from "@/context/userContext";
import { Alert } from "@mui/lab";
import { Box, IconButton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { Close } from "@mui/icons-material";

export default function Unverified() {
  const { data: session } = useSession();
  const token = session?.user?.access;
  const { email } = useUser();

  const [open, setOpen] = useState(true);
  const [resent, setResent] = useState(false);
  const handleResend = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      await fetch(`/api/resend`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });

      setResent(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1200,
        maxWidth: "80%",
      }}
    >
      {!resent ? (
        <Alert severity="error">
          <Typography>
            Your account is unverified. Please check your email or{" "}
            <Link
              href={"/"}
              onClick={handleResend}
              style={{ textDecoration: "underline" }}
            >
              resend verification
            </Link>
          </Typography>
        </Alert>
      ) : (
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => setOpen(false)}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          <Typography>
            An Email has been sent to {email} Please check your email
          </Typography>
        </Alert>
      )}
    </Box>
  );
}
