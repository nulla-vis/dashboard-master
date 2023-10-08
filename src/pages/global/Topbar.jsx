import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Popover,
  List,
  Button,
  Typography,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = ({ logout, setError }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {

    fetch('http://127.0.0.1:3131/auth/logout/', {
      method: "POST",
      credentials: "include"
    }).then(response => {
      // Parse the JSON response
      return response.json();
    }).then((data) => {
      if (data.status == "success" || data.statusCode == 200) {
        logout()
      } else {
        setError("SOMETHING WENT WRONG")
      }
    })

    
    // Close the popover after logout
    handlePopoverClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleIconClick}>
          <PersonOutlinedIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <List>
            <Button variant="text" onClick={handleLogout} fullWidth>
              <Typography variant="body1" color={colors.grey[100]}>
                Logout
              </Typography>
            </Button>
          </List>
        </Popover>
      </Box>
    </Box>
  );
};

export default Topbar;
