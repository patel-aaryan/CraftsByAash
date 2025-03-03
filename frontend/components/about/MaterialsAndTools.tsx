import React from "react";
import { Box, Typography } from "@mui/material";
import MaterialsCard from "@/components/about/MaterialsCard";

const MATERIALS_TOOLS = "Materials and Tools";

export function MaterialsAndTools() {
  const cards = [
    {
      title: "MDF Boards / Plywood",
      image: `${process.env.NEXT_PUBLIC_S3_URL}/about/materials/image1.png`,
      details:
        "Used as a sturdy base instead of mud walls. It is easy to transport or " +
        "create individual pieces for gifting or wall hanging",
    },
    {
      title: "Acrylic / Interior Paint",
      image: `${process.env.NEXT_PUBLIC_S3_URL}/about/materials/image2.png`,
      details:
        "Provide vibrant, long-lasting colors compared to natural pigments.",
    },
    {
      title: "Glass / Synthetic Mirrors",
      image: `${process.env.NEXT_PUBLIC_S3_URL}/about/materials/image3.png`,
      details:
        "Lightweight and safer alternatives to traditional glass mirrors. " +
        "Also available in different colours like gold",
    },
    {
      title: "Clay / Texture Paste",
      image: `${process.env.NEXT_PUBLIC_S3_URL}/about/materials/image4.png`,
      details:
        "Ready-made materials replace traditional mud and cow dung for ease of " +
        "use. Commonly used are texture pastes or epoxy clay for durability",
    },
  ];

  return (
    <>
      <Typography variant="h4" py={2}>
        {MATERIALS_TOOLS}
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        mt={2}
        gap={8}
        px={8}
      >
        {cards.map((card, index) => (
          <MaterialsCard key={index} {...card} />
        ))}
      </Box>
    </>
  );
}
