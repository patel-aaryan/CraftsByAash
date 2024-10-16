import LoginForm from "@/components/loginForm";
import { Card, Typography } from "@mui/material";
import Link from "next/link";

function Login() {
  return (
    <div className="my-52 flex justify-center">
      <Card
        className="p-8 rounded-lg max-w-lg"
        sx={{
          boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        }}
      >
        <LoginForm />

        <div className="text-center flex justify-center">
          <Typography variant="body1" className="text-center mx-1">
            Don&#39;t have an account?
          </Typography>

          <Link
            className="text-indigo-500 hover:underline mx-1"
            href="/register"
          >
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;
