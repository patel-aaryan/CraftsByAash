import { Box, IconButton, List, ListItem } from "@mui/material";
import { History, Settings } from "@mui/icons-material";
import { IconTab } from "@/types/settings";

interface Props {
  settingsProps: IconTab;
  orderProps: IconTab;
  handleChange: (tab: string) => void;
}

export function Sidebar({ settingsProps, orderProps, handleChange }: Props) {
  return (
    <Box
      width={80}
      boxShadow={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <List>
        <ListItem>
          <IconButton onClick={() => handleChange("settings")}>
            <Settings {...settingsProps} />
          </IconButton>
        </ListItem>

        <ListItem>
          <IconButton onClick={() => handleChange("history")}>
            <History {...orderProps} />
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );
}
