"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Open Menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove authentication
    router.push("/signin"); // Redirect to Sign-in page
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width={"100%"}
        // bgcolor="#1d252e"
        // height={80}
      >
        {/* Logo */}
        <Box>
          <Image src={"/logo.svg"} alt="Logo" width={100} height={100} />
        </Box>

        {/* Center Title */}
        <Box>
          <Typography color="white">DATA VIEWER APP</Typography>
        </Box>

        {/* Avatar + Menu */}
        <Box>
          <IconButton onClick={handleMenuOpen}>
            <Avatar />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
