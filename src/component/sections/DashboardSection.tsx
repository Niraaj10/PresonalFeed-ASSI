"use client";

import { useEffect, useState } from "react";

import Feed from "../dashboard/Feed";
import Trending from "../dashboard/Trending";
import Favorites from "../dashboard/Favorites";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type DashboardSectionProps = {
  subTab: "feed" | "trending" | "favorites";
};

export default function DashboardSection({ subTab }: DashboardSectionProps) {

  const { status } = useSession();
  
      useEffect(() => {
          if (status === 'unauthenticated') {
              redirect('/login');
          }
      }, [status]);

  return (
    <div className="flex min-h-screen text-white">
    

      <div className="flex-1 flex flex-col">
       
        <main className="flex-1 overflow-y-auto flex items-start">
           {subTab === "feed" && <Feed />}
          {subTab === "trending" && <Trending />}
          {subTab === "favorites" && <Favorites />} 
          
           {/* {subTab === "feed" && <div>Personalized Feed Content</div>} */}
          {/* {subTab === "trending" && <div>Trending Content</div>} */}
          {/* {subTab === "favorites" && <div>Favorites Content</div>} */}
        </main>
      </div>
    </div>
  );
}
