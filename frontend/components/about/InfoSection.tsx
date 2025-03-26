import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Props {
  heading: string;
  imageSrc: string;
  imageAlt: string;
  imageSize: { width: number; height: number };
  paragraphs: string[];
  reverse?: boolean;
}

export function InfoSection({
  heading,
  imageSrc,
  imageAlt,
  imageSize,
  paragraphs,
  reverse = false,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      mb={8}
      flexDirection={isMobile ? "column" : reverse ? "row" : "row-reverse"}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={isMobile ? "100%" : "40%"}
        mb={isMobile ? 3 : 0}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={isMobile ? Math.round(imageSize.width * 0.8) : imageSize.width}
          height={
            isMobile ? Math.round(imageSize.height * 0.8) : imageSize.height
          }
          style={{ objectFit: "contain" }}
          priority
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        maxWidth={isMobile ? "100%" : "50%"}
        mx={isMobile ? "auto" : 0}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          py={2}
          textAlign={isMobile ? "center" : "left"}
        >
          {heading}
        </Typography>
        {paragraphs.map((paragraph, index) => (
          <Typography
            key={index}
            variant="body1"
            mt={index > 0 ? 1 : 0}
            textAlign={isMobile ? "center" : "left"}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
