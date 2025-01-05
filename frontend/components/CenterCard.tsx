import React, { FC, ReactNode } from "react";
import Link from "next/link";
import { Box, Card, Typography } from "@mui/material";
import { Footer } from "@/types/forms";

interface Props {
  children: ReactNode;
  footer?: Footer[];
}

const CenterCard: FC<Props> = ({
  children,

  footer,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          maxWidth: 600,
          width: "100%",
          m: "0 auto",
        }}
      >
        {children}

        <Box display="flex" flexDirection="column" gap={1}>
          {footer &&
            footer.map((item, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="center"
                textAlign="center"
              >
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", mx: 0.5 }}
                >
                  {item.text}
                </Typography>

                <div className="text-indigo-500 hover:underline mx-1">
                  <Link href={item.link}>{item.linkText}</Link>
                </div>
              </Box>
            ))}
        </Box>
      </Card>
    </Box>
  );
};

export default CenterCard;
