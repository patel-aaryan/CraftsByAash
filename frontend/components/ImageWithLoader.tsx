import React, { useState } from "react";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

interface Props {
  source: string;
  alt: string;
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
}

export function ImageWithLoader({ source, alt, width, height }: Props) {
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => setLoading(false);

  return (
    <>
      {loading && <CircularProgress />}
      <Image
        src={source}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleImageLoad}
      />
    </>
  );
}
