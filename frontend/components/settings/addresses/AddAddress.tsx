import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

interface Props {
  handleNew: () => void;
}

export function AddAddress({ handleNew }: Props) {
  return (
    <Grid2 size="auto">
      <Card
        variant="outlined"
        onClick={handleNew}
        sx={{
          width: 320,
          minHeight: 228,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          borderStyle: "dashed",
          borderWidth: 2,
          borderColor: "grey.400",
          cursor: "pointer",
          "&:hover": {
            borderColor: "primary.main",
            "& .icon, & .text": { color: "primary.main" },
          },
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <AddIcon sx={{ fontSize: 40, color: "grey.500" }} />
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="bold"
            >
              Add Address
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid2>
  );
}
