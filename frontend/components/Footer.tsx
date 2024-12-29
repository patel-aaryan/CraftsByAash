import { Box, Divider, IconButton, Typography } from "@mui/material";
import {
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  Phone,
  Twitter,
} from "@mui/icons-material";
import Link from "next/link";
import { EMAIL, ETSY, PHONE } from "@/utils/constants";

export default function Footer() {
  const contacts = [
    { icon: <Email sx={{ mx: 1 }} />, link: `mailto:${EMAIL}`, text: EMAIL },
    { icon: <Phone sx={{ mx: 1 }} />, link: `tel:${PHONE}`, text: PHONE },
  ];

  const socials = [
    { icon: <Facebook />, link: "https://facebook.com" },
    { icon: <Twitter />, link: "https://twitter.com" },
    { icon: <Instagram />, link: "https://instagram.com" },
    { icon: <LinkedIn />, link: "https://linkedin.com" },
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
        textAlign="center"
        gap={2}
      >
        <Box flex="1 1 30%">
          <Typography variant="h6" color="#1e88e5" fontWeight="bold" mb={1}>
            Customer Care
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Support</Typography>
            <Typography>FAQ</Typography>
          </Box>
        </Box>

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

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            {socials.map((social, index) => (
              <IconButton
                key={index}
                href={social.link}
                target="_blank"
                color="primary"
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 2 }} />

      {/* Footer Bottom */}
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
