import AuthCard from "@/components/AuthCard";
import { LoginForm } from "@/components/auth";
import { Footer } from "@/types/forms";
import featureFlags from "@/utils/featureFlags";
import { ComingSoon } from "@/components/ComingSoon";

export default function Login() {
  const footer: Footer[] = [
    {
      text: "Don't have an account?",
      link: "/register",
      linkText: "Create Account",
    },
    {
      text: "Forgot your Password?",
      link: "/reset",
      linkText: "Reset Password",
    },
  ];

  if (!featureFlags.auth) return <ComingSoon />;

  return (
    <AuthCard footer={footer}>
      <LoginForm />
    </AuthCard>
  );
}
