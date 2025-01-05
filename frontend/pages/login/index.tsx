import CenterCard from "@/components/CenterCard";
import { LoginForm } from "@/components/auth";
import { Footer } from "@/types/forms";
import featureFlags from "@/utils/featureFlags";
import ComingSoon from "@/components/ComingSoon";

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
    <CenterCard footer={footer}>
      <LoginForm />
    </CenterCard>
  );
}
