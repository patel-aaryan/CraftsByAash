import React from "react";
import CenterCard from "@/components/CenterCard";
import { ResetForm } from "@/components/auth";
import featureFlags from "@/utils/featureFlags";
import { ComingSoon } from "@/components/ComingSoon";

export default function Reset() {
  if (!featureFlags.auth) return <ComingSoon />;

  return (
    <CenterCard>
      <ResetForm />
    </CenterCard>
  );
}
