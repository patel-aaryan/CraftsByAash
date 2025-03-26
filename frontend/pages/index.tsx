import React from "react";
import { Box, Typography } from "@mui/material";
import { Carousel, Hero, MasonryGrid } from "@/components/home";

const BEST_CREATIONS = "Our Best Creations, Just For You";
const ARTWORK_IN_ACTION = "See Our Artwork in Action";

export default function Home() {
  const items = [
    { label: BEST_CREATIONS, component: <Carousel /> },
    { label: ARTWORK_IN_ACTION, component: <MasonryGrid /> },
  ];
  return (
    <>
      <Hero />

      <Box px={8} py={2}>
        {items.map((item, index) => (
          <Box key={index}>
            <Typography 
              variant="h4" 
              sx={{ 
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.125rem' },
                fontWeight: 600,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              {item.label}
            </Typography>
            {item.component}
          </Box>
        ))}
      </Box>
    </>
  );
}
