import { Avatar, Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Box padding={2}>
          {/* logo */}
          <Image src={"/logo.svg"} alt="" width={100} height={100} />
        </Box>
        <Box>
          {/* center part */}
          <Typography>DATA VIEWER APP</Typography>
        </Box>
        <Box>
          {/* accoubnt */}
          <Avatar />
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
