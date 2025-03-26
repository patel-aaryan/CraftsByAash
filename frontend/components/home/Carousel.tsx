import React, { useState, useEffect } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Image from "next/image";

export function Carousel() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  });

  return (
    <Box
      maxWidth={isMobile ? "95%" : "80%"}
      m="auto"
      overflow="hidden"
      position="relative"
      bgcolor="#f1f1f1"
      borderRadius={isMobile ? 4 : 8}
      boxShadow={3}
      p={isMobile ? 2 : 4}
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
                height={isMobile ? 150 : 300}
                width={isMobile ? 150 : 300}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: isMobile ? '300px' : '500px',
                  objectFit: 'contain',
                }}
                priority
              />
              
            </Box>
          </Box>
        ))}
      </Box>

      {/* Navigation dots for mobile */}
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setImageIndex(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: index === imageIndex ? '#000' : 'rgba(0,0,0,0.3)',
              margin: '0 5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </Box>

      {/* Hide navigation buttons on mobile, rely on swipe */}
      {!isMobile && (
        <>
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
        </>
      )}
    </Box>
  );
}
