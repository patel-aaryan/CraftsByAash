import { Box, IconButton, List, ListItem } from "@mui/material";
import { History, Settings } from "@mui/icons-material";

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: "80px",
        backgroundColor: "white",
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <List>
        <ListItem>
          <IconButton color="primary">
            <Settings />
          </IconButton>
        </ListItem>

        {/*<ListItem>*/}
        {/*  <IconButton>*/}
        {/*    <Place />*/}
        {/*  </IconButton>*/}
        {/*</ListItem>*/}

        <ListItem>
          <IconButton>
            <History />
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );
}
