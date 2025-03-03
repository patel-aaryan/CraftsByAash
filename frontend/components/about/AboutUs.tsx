import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const heading = "About Us";
const subheading =
  "We create custom Lippan art with clay and traditional mirrors from Kutch, India";

export default function AboutUs() {
  const imageUrl = `${process.env.NEXT_PUBLIC_S3_URL}/about/image1.png`;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f8f9fa"
      height={400}
      mt={8}
    >
      <Box display="flex" flexDirection="column" maxWidth="50%" mx={8}>
        <Typography variant="h3" fontWeight="bold">
          {heading}
        </Typography>

        <Typography variant="h6" mt={2}>
          {subheading}
        </Typography>
      </Box>

      <Box
        flexShrink={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="40%"
      >
        <Image src={imageUrl} alt="hero" height={375} width={375} />
      </Box>
    </Box>
  );
}
