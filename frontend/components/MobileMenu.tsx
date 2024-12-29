import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import featureFlags from "@/utils/featureFlags";

export default function MobileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const ALL_TABS = ["shop", "about", "contact"];
  const TABS = ALL_TABS.filter((tab) => tab !== "shop" || featureFlags.shop);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="md:hidden">
        <IconButton color="inherit" aria-label="menu" onClick={handleClick}>
          <MenuIcon />
        </IconButton>
      </div>

      <div className="md:hidden">
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          {TABS.map((item) => (
            <MenuItem key={item} onClick={handleClose}>
              <Link href={`/${item}`}>{item.toUpperCase()}</Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}
