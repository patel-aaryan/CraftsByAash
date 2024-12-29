import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Props {
  title: string;
  image: string;
  details: string;
}

export function MaterialsCard({ title, image, details }: Props) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Card sx={{ borderRadius: 4, width: "100%" }}>
      <CardHeader title={title} titleTypographyProps={{ align: "center" }} />
      <CardMedia sx={{ height: 240 }} image={image} title={title} />

      <Divider />

      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleExpandClick} fullWidth>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <Typography>{details}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

MaterialsCard.displayName = "MaterialsCard";

export default MaterialsCard;
