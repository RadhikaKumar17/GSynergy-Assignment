"use client";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Store", path: "/store" },
  { name: "SKU", path: "/sku" },
  { name: "Planning", path: "/planning" },
  { name: "Charts", path: "/chart" },
];

const Sidebar = () => {
  const pathname = usePathname(); // Get current route

  return (
    <Box width={200} bgcolor="#1e252e" height="100vh" p={2}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.name}
            component={Link}
            href={item.path}
            sx={{
              bgcolor:
                pathname === item.path ||
                (pathname === "/" && item.path === "/store")
                  ? "#374151"
                  : "transparent",
              color: "white",
              borderRadius: "4px",
              "&:hover": { bgcolor: "#374151" },
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
