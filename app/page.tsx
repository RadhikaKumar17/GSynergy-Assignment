"use client";
import { Box, Typography } from "@mui/material";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";

export default function Home() {
  return (
    <Box
      bgcolor={"#141a21"}
      height={"100vh"}
      width={"100vw"}
      display="flex"
      flexDirection="column"
    >
      {/* Navbar */}
      <Box
        height={80}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
      >
        <Navbar />
      </Box>

      {/* Main Container: Sidebar + Content */}
      <Box display="flex" flex={1}>
        {
          <Box
            width={{ xs: 200, md: 200 }}
            display="flex"
            flexDirection="column"
            p={2}
            sx={{
              position: { xs: "absolute", md: "relative" },
              height: "100vh",
              zIndex: 10,
            }}
          >
            <Sidebar />
          </Box>
        }

        {/* Content */}
        <Box
          bgcolor={"#191f27"}
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography color="white">CONTENT</Typography>
        </Box>
      </Box>
    </Box>
  );
}
