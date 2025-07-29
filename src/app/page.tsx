"use client";

import Header from "@/component/Header";
import DashboardSection from "@/component/sections/DashboardSection";
import HomeSection from "@/component/sections/HomeSection";
import ProfileSection from "@/component/sections/ProfileSection";
import SessionSync from "@/component/SessionSync";
import Sidebar from "@/component/Sidebar";
import { useState } from "react";



export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [dashboardSubTab, setDashboardSubTab] = useState<"feed" | "trending" | "favorites">("feed");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeSection />;
      case "dashboard":
        return <DashboardSection subTab={dashboardSubTab} />;
      case "profile":
        return <ProfileSection />;
      default:
        return <HomeSection />;
    }
  };
  // const { data: session } = useSession();
  // console.log(session?.user)



  return (
    <div className="font-sans flex flex-col relative overflow-hidden min-h-screen bg-black hiddenScroll">
      <SessionSync />

      <div className="spin my-auto ">
        <div className="bg-glow-red"></div>
        <div className="bg-glow-purple"></div>
      </div>
      <div className="bg-glow-green"></div>

      <Header />

      <div className="relative mt-20 z-10 overflow-y-scroll hideScroll flex p-10 gap-5">

        <Sidebar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          dashboardSubTab={dashboardSubTab}
          setDashboardSubTab={setDashboardSubTab}
        />

        <div className="h-[82vh] overflow-hidden hideScroll rounded-2xl flex flex-col items-start-start w-full">{renderContent()}</div>


      </div>
    </div>
  );
}






