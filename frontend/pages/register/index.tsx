import AuthCard from "@/components/AuthCard";
import { RegisterForm } from "@/components/auth";
import { Footer } from "@/types/forms";
import { ComingSoon } from "@/components/ComingSoon";
import featureFlags from "@/utils/featureFlags";

export default function Register() {
  const footer: Footer[] = [
    {
      text: "Already have an account?",
      link: "/login",
      linkText: "Log In",
    },
  ];

  if (!featureFlags.auth) return <ComingSoon />;

  return (
    <AuthCard footer={footer}>
      <RegisterForm />
    </AuthCard>
  );
}
