import React from "react";
import AuthCard from "@/components/AuthCard";
import { ResetForm } from "@/components/auth";
import featureFlags from "@/utils/featureFlags";
import { ComingSoon } from "@/components/ComingSoon";

export default function Reset() {
  if (!featureFlags.auth) return <ComingSoon />;

  return (
    <AuthCard>
      <ResetForm />
    </AuthCard>
  );
}
