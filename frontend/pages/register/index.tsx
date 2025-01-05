import CenterCard from "@/components/CenterCard";
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
    <CenterCard footer={footer}>
      <RegisterForm />
    </CenterCard>
  );
}
