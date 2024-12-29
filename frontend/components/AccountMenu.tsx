import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { Login, Logout, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { MouseEvent, useState } from "react";

export default function AccountMenu() {
  const router = useRouter();
  const { data: session } = useSession();
  const signedIn = !!session?.user?.access;
  const { firstName } = useUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const handleAuth = async () => {
    if (signedIn) {
      await router.push("/");
      await signOut();
    } else {
      await router.push("/login");
    }
  };

  return (
    <>
      <IconButton color="inherit" aria-label="menu" onClick={handleClick}>
        <Avatar sx={{ width: 28, height: 28 }}>
          {firstName ? firstName[0].toUpperCase() : ""}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/settings">
            <Box display="flex" justifyContent="center" alignItems="center">
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <Typography>Account Settings</Typography>
            </Box>
          </Link>
        </MenuItem>

        <MenuItem onClick={handleAuth}>
          <ListItemIcon>
            {signedIn ? (
              <Logout fontSize="small" />
            ) : (
              <Login fontSize="small" />
            )}
          </ListItemIcon>
          {signedIn ? "Logout" : "Log In"}
        </MenuItem>
      </Menu>
    </>
  );
}
