import React, { useState } from "react";
import Image from "next/image";
import { Box, CircularProgress, Modal } from "@mui/material";
import { Masonry } from "@mui/lab";

export function MasonryGrid() {
  const images = Array.from(
    { length: 14 },
    (_, index) =>
      `${process.env.NEXT_PUBLIC_S3_URL}/home/masonry/image${index + 1}.png`
  );

  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOpen = (image: string) => {
    setSelectedImage(image);
    setLoading(true);
  };
  const handleClose = () => {
    setSelectedImage("");
    setLoading(false);
  };
  const handleImageLoad = () => setLoading(false);

  return (
    <>
      <Masonry columns={{ xs: 1, sm: 3, md: 6 }} spacing={2}>
        {images.map((image, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleOpen(image)}
            sx={{ cursor: "pointer" }}
          >
            <Image
              src={image}
              alt={`Image ${index}`}
              width={250}
              height={250}
              priority
            />
          </Box>
        ))}
      </Masonry>

      <Modal
        open={!!selectedImage}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ border: "none", outline: "none" }}>
          {loading && <CircularProgress />}
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected"
              width={500}
              height={500}
              onLoad={handleImageLoad}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
