import React from "react";
import logo from "@/assets/logo.png";
import {
  FolderHeart,
  UserRound,
  Settings,
  MessageCircleQuestionMark,
  LogOut,
  Download,
} from "lucide-react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import footerImg from "@/assets/img13.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "react-oidc-context";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: TbLayoutDashboardFilled },
  { title: "All Courses", url: "/courses", icon: FolderHeart },
  { title: "Team", url: "/team", icon: UserRound },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: MessageCircleQuestionMark },
  { title: "Logout", url: "/", icon: LogOut, action: "logout" },
];

const CLIENT_ID = "3j1a58ccpror7mna7fda8a7mv9";
const LOGOUT_URI = "https://d11hc25q0b3oxs.cloudfront.net";
const COGNITO_DOMAIN = "https://us-east-13jpufxkdy.auth.us-east-1.amazoncognito.com";

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const handleClick = (item) => {
    if (item.action === "logout") {
      auth.removeUser();
      window.location.replace(`${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${encodeURIComponent(LOGOUT_URI)}`);
    } else {
      navigate(item.url);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="mt-4">
              <img className="w-42" src={logo} alt="Logo" />
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="pt-10 space-y-0.5">
              {items.map((item) => {
                const isActive =
                  item.action !== "logout" && location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title} className="relative">
                    <SidebarMenuButton asChild>
                      <button
                        type="button"
                        onClick={() => handleClick(item)}
                        className={`relative flex w-full items-center font-raleway gap-3 rounded-lg px-3 py-6 text-[15px] font-medium transition
                          ${isActive
                            ? "text-emerald-900 bg-[#f2f8f4] font-semibold"
                            : "text-gray-500"
                          }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1.5 rounded-r-md bg-forestGreen" />
                        )}
                        <item.icon
                          className={`w-5 h-5 ${
                            isActive ? "text-emerald-900" : "text-gray-500"
                          }`}
                        />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="relative overflow-hidden px-2 py-4 rounded-tr-xl rounded-tl-xl">
        <img
          src={footerImg}
          className="absolute object-top inset-0 w-full h-full object-cover"
          alt="background"
        />
        <div className="relative z-10 font-raleway">
          <div className="bg-white w-fit p-1.5 rounded-full">
            <Download className="text-forestGreen" />
          </div>
          <div className="text-white pt-2 pb-4">
            <h2 className="text-[24px] font-semibold">
              Download <span>our <br /> Mobile App.</span>
            </h2>
          </div>
          <button className="text-white font-medium bg-linear-to-br from-[#0F5132] from-55% to-[#25a163] hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 rounded-full w-full py-3">
            Download
          </button>
        </div>
      </div>
    </Sidebar>
  );
};