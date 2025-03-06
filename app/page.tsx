"use client";
import { Box } from "@mui/material";
import Navbar from "../src/components/navbar/navbar";
import Sidebar from "../src/components/sidebar/sidebar";
import StoreComponent from "../src/components/storeComponents/storeComponent";
import PlanningComponent from "../src/components/planningComponents/planningComponent";
import SKUComponent from "../src/components/skuComponents/skuComponent";
import ChartComponent from "../src/components/chartComponents/chartComponent";
import { usePathname } from "next/navigation";
import { JSX, useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeComponent, setActiveComponent] = useState<JSX.Element | null>(
    null
  );

  useEffect(() => {
    // Function to determine which component to show
    const getActiveComponent = () => {
      if (pathname.includes("/store")) return <StoreComponent />;
      if (pathname.includes("/planning")) return <PlanningComponent />;
      if (pathname.includes("/sku")) return <SKUComponent />;
      if (pathname.includes("/chart")) return <ChartComponent />;
      return null;
    };

    setActiveComponent(getActiveComponent());
  }, [pathname]);

  return (
    <>
      <Box
        bgcolor="#141a21"
        height="100vh"
        width="100vw"
        display="flex"
        flexDirection="column"
      >
        {/* Navbar */}
        <Box height={80} display="flex" alignItems="center" px={2}>
          <Navbar />
        </Box>

        {/* Sidebar + Content */}
        <Box display="flex">
          <Sidebar />
          {/* Dynamically Render the Active Component Inside Layout */}
          <Box bgcolor="#191727" flex={1} p={3}>
            {activeComponent} {/* Renders dynamic page content */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
