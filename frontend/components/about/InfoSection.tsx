import { Box, Typography } from "@mui/material";
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
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      mb={8}
      flexDirection={reverse ? "row" : "row-reverse"}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="40%"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageSize.width}
          height={imageSize.height}
        />
      </Box>

      <Box display="flex" flexDirection="column" maxWidth="50%">
        <Typography variant="h4" py={2}>
          {heading}
        </Typography>
        {paragraphs.map((paragraph, index) => (
          <Typography key={index} variant="body1" mt={index > 0 ? 1 : 0}>
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
