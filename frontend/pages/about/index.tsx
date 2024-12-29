import React from "react";
import { Box } from "@mui/material";
import AboutUs from "@/components/about/AboutUs";
import { InfoSection, MaterialsAndTools } from "@/components/about";

const LippanArtParagraphs = [
  "Lippan art, also known as Lippan Kaam, is a traditional mural craft originating " +
    "from the Kutch region of Gujarat, India. This exquisite art form involves " +
    "creating intricate patterns using a mixture of mud and clay, often adorned " +
    "with small, hand-cut mirrors that catch and reflect light in captivating ways. " +
    "Renowned for its geometric motifs, floral designs, and vibrant aesthetic, " +
    "Lippan art has traditionally adorned the walls of rural homes, temples, and " +
    "community spaces. The reflective mirrors not only enhance its beauty but also " +
    "symbolize prosperity and joy, while the earthen tones of the mud harmonize " +
    "with the natural surroundings.",
  "Primarily practiced by the women of Kutch, Lippan art reflects their " +
    "creativity, patience, and deep connection to their cultural heritage. Beyond " +
    "its functional and decorative role in village life, this craft has gained " +
    "recognition on a global scale. It is now featured in modern interior design, " +
    "art exhibitions, and workshops, showcasing the enduring legacy of this " +
    "intricate and meaningful art form.",
];

const HistoryParagraphs = [
  "Lippan art, or Lippan Kaam, is a traditional mural craft from the Kutch " +
    "region of Gujarat, India. Crafted using a mixture of mud, clay, and cow dung " +
    "for durability, it is adorned with small hand-cut mirrors (aabhla), creating " +
    "intricate, shimmering designs. Historically, this art decorated the walls of " +
    "village homes and bhungas, showcasing geometric patterns, floral motifs, and " +
    "culturally significant elements like peacocks, camels, the sun, and moon.",
  "Once confined to rural homes and personal shrines, Lippan art now thrives as a " +
    "celebrated heritage craft. It is showcased in galleries, museums, and modern " +
    "interiors, from customized murals and decor to DIY crafts and framed artworks. " +
    "Its vibrant appeal makes it popular in festive and wedding decor, blending " +
    "tradition with contemporary design. Lippan art remains a testament to the rich " +
    "cultural identity and artistic legacy of Kutch.",
];

export default function About() {
  const imageSize = { width: 600, height: 600 };

  return (
    <>
      <AboutUs />

      <Box display="flex" justifyContent="center" mx="auto">
        <Box py={8} px={12} gap={2}>
          <InfoSection
            heading="What is Lippan Art"
            imageSrc="/about/image2.png"
            imageAlt="Lippan Art"
            imageSize={imageSize}
            paragraphs={LippanArtParagraphs}
            reverse={false}
          />

          <InfoSection
            heading="History"
            imageSrc="/about/image3.png"
            imageAlt="History of Lippan Art"
            imageSize={imageSize}
            paragraphs={HistoryParagraphs}
            reverse={true}
          />

          <MaterialsAndTools />
        </Box>
      </Box>
    </>
  );
}
