import React, { Dispatch, SetStateAction } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const getPasswordProps = (
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,
  handler: (setState: Dispatch<SetStateAction<boolean>>) => void,
) => ({
  input: {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => handler(setState)} edge="end">
          {state ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  },
});
