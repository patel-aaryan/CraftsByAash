import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import featureFlags from "@/utils/featureFlags";
import { ComingSoon } from "@/components/ComingSoon";

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    (async () => {
      if (!token) return;

      try {
        const response = await fetch(`/api/verify?token=${token}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          setStatus("success");
        } else {
          const errorData = await response.json();
          console.error(errorData.error);
          setStatus("error");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setStatus("error");
      }
    })();
  }, [token]);

  const renderMessage = () => {
    switch (status) {
      case "success":
        return (
          <Typography>Your email has been successfully verified!</Typography>
        );
      case "error":
        return (
          <Typography>Invalid or expired token. Please try again.</Typography>
        );
      default:
        return <Typography>Verifying your email...</Typography>;
    }
  };

  if (!featureFlags.auth) return <ComingSoon />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {renderMessage()}
      {status === "success" && (
        <Button
          variant="contained"
          sx={{ mt: 2, px: 2, py: 1, borderRadius: 2 }}
          onClick={() => router.push("/login")}
        >
          Go to Login
        </Button>
      )}
    </div>
  );
}
