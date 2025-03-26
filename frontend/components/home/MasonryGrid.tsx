import Image from "next/image";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Masonry } from "@mui/lab";

export function MasonryGrid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const images = Array.from(
    { length: 14 },
    (_, index) =>
      `${process.env.NEXT_PUBLIC_S3_URL}/home/masonry/image${index + 1}.png`
  );

  return (
      <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 6 }} spacing={isMobile ? 1 : 2}>
        {images.map((image, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={image}
              alt={`Image ${index}`}
              width={250}
              height={250}
              priority={index < 6} 
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Masonry>
  );
}
