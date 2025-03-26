import React from "react";
import Image from "next/image";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const heading = "About Us";
const subheading =
  "We create custom Lippan art with clay and traditional mirrors from Kutch, India";

export default function AboutUs() {
  const imageUrl = `${process.env.NEXT_PUBLIC_S3_URL}/about/image1.png`;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      justifyContent="center"
      alignItems="center"
      bgcolor="#f8f9fa"
      minHeight={isMobile ? 600 : 400}
      mt={8}
      mr={4}
      py={isMobile ? 4 : 0}
    >
      <Box 
        display="flex" 
        flexDirection="column" 
        maxWidth={isMobile ? "90%" : "50%"}
        mx={isMobile ? 2 : 8}
        mb={isMobile ? 4 : 0}
        order={isMobile ? 1 : 0}
      >
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          fontWeight="bold"
          textAlign={isMobile ? "center" : "left"}
        >
          {heading}
        </Typography>

        <Typography 
          variant={isMobile ? "body1" : "h6"} 
          mt={2}
          textAlign={isMobile ? "center" : "left"}
        >
          {subheading}
        </Typography>
      </Box>

      <Box
        flexShrink={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={isMobile ? "100%" : "40%"}
        order={isMobile ? 0 : 1}
        mb={isMobile ? 2 : 0}
      >
        <Image 
          src={imageUrl} 
          alt="about us" 
          height={isMobile ? 250 : 375} 
          width={isMobile ? 250 : 375}
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
}
