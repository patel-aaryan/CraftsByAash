import { useSession } from "next-auth/react";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Addresses, Details, Password, Sidebar } from "@/components/settings";
import { Avatar, Box, Tab, Tabs, Typography } from "@mui/material";
import { useUser } from "@/context/userContext";
import { UserAddress } from "@/types/responses/userResponses";
import featureFlags from "@/utils/featureFlags";
import ComingSoon from "@/components/ComingSoon";
import Unverified from "@/components/Unverified";
import { IconTab } from "@/types/settings";
import { OrderHistory } from "@/components/order/OrderHistory";

export default function Account() {
  const { data: session } = useSession();
  const token = session?.user?.access;
  const { firstName, lastName, is_verified } = useUser();

  const [sideTab, setSideTab] = useState<"settings" | "history">("settings");
  const [settings, setSettings] = useState<IconTab>({ color: "primary" });
  const [history, setHistory] = useState<IconTab>({ color: "inherit" });

  const tabs = ["My Details", "Addresses", "Password"];
  const [tab, setTab] = useState(0);

  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [refreshAddresses, setRefreshAddresses] = useState(0);
  const handleRefresh = () => setRefreshAddresses((prev) => prev + 1);

  useEffect(() => {
    if (!token) return;

    (async () => {
      const response = await fetch("/api/address", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });
      const data: UserAddress[] = await response.json();
      setAddresses(data);
    })();
  }, [token, refreshAddresses]);

  const handleSideTabChange = (tab: string) => {
    if (tab === "history") {
      setSideTab("history");
      setSettings({ color: "inherit" });
      setHistory({ color: "primary" });
    } else {
      setSideTab("settings");
      setSettings({ color: "primary" });
      setHistory({ color: "inherit" });
    }
  };

  const handleChange = (e: SyntheticEvent, newTab: number) => setTab(newTab);

  const getTabContent = () => {
    switch (tab) {
      case 0:
        return <Details />;
      case 1:
        return (
          <Addresses addresses={addresses} handleRefresh={handleRefresh} />
        );
      case 2:
        return <Password />;
    }
  };

  if (!featureFlags.settings) return <ComingSoon />;

  return (
    <Box display="flex">
      <Sidebar
        settingsProps={settings}
        orderProps={history}
        handleChange={handleSideTabChange}
      />
      {is_verified === false && <Unverified />}

      <Box flexGrow={1} px={8} py={12}>
        <Box
          sx={{
            height: "180px",
            background: "linear-gradient(to right, #6E00FF, #009FFD)",
            borderRadius: "8px",
            mb: "20px",
          }}
        />

        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 100, height: 100 }}>
            {firstName ? (
              <Typography variant="h2">{firstName[0].toUpperCase()}</Typography>
            ) : (
              ""
            )}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {firstName} {lastName}
          </Typography>
        </Box>

        {sideTab === "settings" ? (
          <>
            <Tabs value={tab} onChange={handleChange} sx={{ my: "20px" }}>
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab} />
              ))}
            </Tabs>
            {getTabContent()}
          </>
        ) : (
          <OrderHistory />
        )}
      </Box>
    </Box>
  );
}
