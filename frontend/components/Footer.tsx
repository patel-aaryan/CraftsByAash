import {
  Box,
  Divider,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Email, Instagram, Phone } from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const EMAIL = process.env.NEXT_PUBLIC_EMAIL || "someone@example.com";
  const PHONE = process.env.NEXT_PUBLIC_PHONE || "+1 (123) 456-7890";
  const ETSY = process.env.NEXT_PUBLIC_ETSY || "https://www.etsy.com/";
  const INSTAGRAM =
    process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/";

  const contacts = [
    { icon: <Email sx={{ mx: 1 }} />, link: `mailto:${EMAIL}`, text: EMAIL },
    { icon: <Phone sx={{ mx: 1 }} />, link: `tel:${PHONE}`, text: PHONE },
  ];

  return (
    <Box
      component="footer"
      bgcolor="#f8f9fa"
      p={3}
      borderTop="1px solid #e0e0e0"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        flexDirection={isMobile ? "column" : "row"}
        textAlign="center"
        gap={2}
      >
        {/* <Box flex="1 1 30%">
          <Typography variant="h6" color="#1e88e5" fontWeight="bold" mb={1}>
            Customer Care
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Support</Typography>
            <Typography>FAQ</Typography>
          </Box>
        </Box> */}

        <Box flex="1 1 30%">
          <Typography variant="h6" color="#1e88e5" fontWeight="bold" mb={1}>
            Contact Us
          </Typography>

          <Box display="flex" flexDirection="column" gap={1}>
            {contacts.map((contact, index) => (
              <Typography key={index} variant="body2">
                {contact.icon}
                <Link href={contact.link}>{contact.text}</Link>
              </Typography>
            ))}
          </Box>
        </Box>

        <Box flex="1 1 30%">
          <Typography variant="h6" color="#1e88e5" fontWeight="bold" mb={1}>
            Follow Us
          </Typography>
          <Typography>
            Etsy:{" "}
            <Link href={ETSY} target="_blank">
              CraftsByAash
            </Link>
          </Typography>

          <Typography>
            <Instagram sx={{ color: "#e4405f" }} />{" "}
            <Link href={INSTAGRAM} target="_blank">
              craftsby.aash
            </Link>
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ textAlign: "center" }}
      >
        © {new Date().getFullYear()} CraftsByAash. All rights reserved.
      </Typography>
    </Box>
  );
}
