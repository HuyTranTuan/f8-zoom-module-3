import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { MenuIcon } from "@/components/ui/icons/lucide-menu";
import { HouseIcon } from "@/components/ui/icons/lucide-house";
import { SearchIcon } from "@/components/ui/icons/lucide-search";
import { PlusIcon } from "@/components/ui/icons/lucide-plus";
import { HeartIcon } from "@/components/ui/icons/lucide-heart";
import { UserIcon } from "@/components/ui/icons/lucide-user";
import Logo from "@/components/Logo";
import NavbarMenu from "@/components/NavbarMenu";

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
import { NavLink } from "react-router";
import { TranslationOutlinedIcon } from "@/components/ui/icons/ant-design-translation-outlined";
import { LanguagesIcon } from "@/components/ui/icons/lucide-languages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: HouseIcon,
  },
  {
    title: "Search",
    url: "/search",
    icon: SearchIcon,
  },
  {
    title: "Add",
    url: "/add",
    icon: PlusIcon,
  },
  {
    title: "Activities",
    url: "/activities",
    icon: HeartIcon,
  },
  {
    title: "Account",
    url: "/account",
    icon: UserIcon,
  },
];

function MainSidebar({ classNames, isAuthenticated }) {
  const [isToggle, setIsToggle] = useState(false);
  const [isToggleAppearance, setIsToggleAppearance] = useState(false);
  const [isToggleFeed, setIsToggleFeed] = useState(false);

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Sidebar className={classNames}>
      <SidebarContent className="justify-between! p-2.5!">
        <SidebarGroup className="w-full aspect-3/4! flex justify-center items-center">
          <SidebarGroupLabel className="w-full h-full">
            <Logo path={"/"} />
          </SidebarGroupLabel>
        </SidebarGroup>

        <SidebarGroup className="justify-center items-center p-1.5">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex justify-center items-center p-1.5 w-15 h-15 [&>svg]:size-6"
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={`${
                              isActive
                                ? "text-(--normaltext)"
                                : "text-(--systemtext)"
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="justify-center items-center gap-2.5">
          {/* Translate Button */}
          <SidebarGroupLabel className="[&>svg]:size-6">
            <DropdownMenu className="relative">
              <DropdownMenuTrigger asChild>
                <LanguagesIcon className="stroke-2 text-normaltext size-6 hover:cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute flex bottom-full left-[30px] overflow-hidden p-2.5">
                <DropdownMenuItem
                  className="px-3! py-2.5! cursor-pointer !hover:bg-systemtext grow flex justify-center"
                  onClick={() => handleLanguageChange("en")}
                >
                  EN
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-3! py-2.5! cursor-pointer !hover:bg-systemtext grow flex justify-center"
                  onClick={() => handleLanguageChange("vn")}
                >
                  VN
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupLabel>

          <SidebarGroupLabel className="[&>svg]:size-6">
            <NavbarMenu>
              <MenuIcon className="stroke-2! text-normaltext hover:cursor-pointer" />
            </NavbarMenu>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

MainSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
};

export default MainSidebar;
