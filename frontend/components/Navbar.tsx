import { useRouter } from "next/router";
import Link from "next/link";
import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu";
import { COMPANY } from "@/utils/constants";
import featureFlags from "@/utils/featureFlags";

export default function NavBar() {
  const router = useRouter();
  const { pathname } = router;
  const ALL_TABS = ["shop", "about", "contact"];
  const TABS = ALL_TABS.filter((tab) => tab !== "shop" || featureFlags.shop);

  const styles = "transition duration-200";
  const getTextStyle = (item = "") => {
    return pathname === `/${item}` ? "text-teal-300" : "hover:text-gray-300";
  };

  return (
    // bg-blue-500
    <AppBar position="fixed" sx={{ bgcolor: "#3B82F6" }}>
      <Toolbar
        sx={{
          minWidth: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Box display="flex">
          <Link href="/">
            <div className={`${styles} ${getTextStyle()}`}>
              <Typography variant="h6" fontWeight={700}>
                {COMPANY}
              </Typography>
            </div>
          </Link>
        </Box>

        <div className="hidden md:flex">
          <Box
            display="flex"
            justifyContent="space-between"
            gap={6}
            fontWeight={600}
          >
            {TABS.map((item, index) => (
              <Link href={`/${item}`} key={index}>
                <div className={`${styles} text-sm ${getTextStyle(item)}`}>
                  <ListItem disableGutters sx={{ listStyle: "none" }}>
                    {item.toUpperCase()}
                  </ListItem>
                </div>
              </Link>
            ))}
          </Box>
        </div>

        <Box display="flex" alignItems="center" gap={2}>
          <MobileMenu />

          {featureFlags.cart && (
            <IconButton color="inherit" aria-label="cart">
              <Link href="/cart">
                <ShoppingCart />
              </Link>
            </IconButton>
          )}

          {featureFlags.settings && <AccountMenu />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
