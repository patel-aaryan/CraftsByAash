import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import featureFlags from "@/utils/featureFlags";

const heading = "Designed to Inspire. Built to Last.";
const subheading = "Explore our collection of unique artworks and decor.";

export function Hero() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f8f9fa"
      height={600}
      overflow="hidden"
      position="relative"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src="/home/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        color="white"
        textAlign="center"
        zIndex={1}
        bgcolor="rgba(0, 0, 0, 0.4)"
      >
        <Typography variant="h3" fontWeight="bold">
          {heading}
        </Typography>
        <Typography variant="h6" mt={2}>
          {subheading}
        </Typography>

        {featureFlags.auth && (
          <Button variant="contained" sx={{ mt: 2 }}>
            <Link href="/register">Get Started</Link>
          </Button>
        )}
      </Box>
    </Box>
  );
}
