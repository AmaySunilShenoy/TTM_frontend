"use client";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { RiHomeFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Manage from "@/components/Dashboard/Manage";
import AddPoi from "@/components/Dashboard/AddPoi";

const Dashboard = () => {
  const [value, setValue] = useState(1);
 
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  
  return (
    <>
    <RiHomeFill className="text-white text-3xl absolute z-50 top-5 right-5 cursor-pointer" onClick={() => router.push('/home')} />
    <Box
      sx={{ width: "100%", typography: "body1", padding: 2, text: "white" }}
      className="bg-background"
    >
      {/* Multi change tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="POI tabs"
        textColor="inherit"
        indicatorColor="primary"
      >
        <Tab value={1} label="Manage POIs" />
        <Tab value={2} label="Add POI" />
      </Tabs>

      {/* Tab to view and delete POIs */}
      {value === 1 && (
        <Manage />
      )}

      {/* Tab to add a new POI */}
      {value === 2 && (
        <AddPoi />
      )}
    </Box>
    
  </>
  );
};

export default Dashboard;
