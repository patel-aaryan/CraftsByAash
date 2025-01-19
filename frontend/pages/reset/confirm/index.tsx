import React from "react";
import { useRouter } from "next/router";
import featureFlags from "@/utils/featureFlags";
import ComingSoon from "@/components/ComingSoon";
import CenterCard from "@/components/CenterCard";
import { ConfirmResetForm } from "@/components/auth";

type routerQuery = {
  uid: string;
  token: string;
};

export default function Confirm() {
  const router = useRouter();
  const { uid, token } = router.query as routerQuery;

  if (!featureFlags.auth) return <ComingSoon />;

  if (!uid || !token) return null;

  return (
    <CenterCard>
      <ConfirmResetForm uid={uid} passwordToken={token} />
    </CenterCard>
  );
}
