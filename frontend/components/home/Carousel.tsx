import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Image from "next/image";

export function Carousel() {
  const images = [
    `${process.env.NEXT_PUBLIC_S3_URL}/home/carousel/image1.png`,
    `${process.env.NEXT_PUBLIC_S3_URL}/home/carousel/image2.png`,
    `${process.env.NEXT_PUBLIC_S3_URL}/home/carousel/image3.png`,
    `${process.env.NEXT_PUBLIC_S3_URL}/home/carousel/image4.png`,
  ];

  const [imageIndex, setImageIndex] = useState(0);

  const handleNext = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  });

  return (
    <Box
      maxWidth="80%"
      m="auto"
      overflow="hidden"
      position="relative"
      bgcolor="#f1f1f1"
      borderRadius={8}
      boxShadow={3}
      p={4}
    >
      <Box
        {...swipeHandlers}
        sx={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${imageIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            flex="0 0 100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box boxShadow={3}>
              <Image
                src={image}
                alt={`Image ${index}`}
                height={500}
                width={500}
                priority
              />
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "35px",
          transform: "translateY(-50%)",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          boxShadow: 3,
          color: "#fff",
          "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "35px",
          transform: "translateY(-50%)",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          boxShadow: 3,
          color: "#fff",
          "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
}
