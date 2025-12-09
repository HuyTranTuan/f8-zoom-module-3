import { useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SunIcon } from "../ui/icons/lucide-sun";
import { MoonIcon } from "../ui/icons/lucide-moon";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth";

function NavbarMenu({ children }) {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="h-fit!" align="start">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex! justify-between px-1! py-3!">
              {t("appearance")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="px-1.5! py-3!">
              <DropdownMenuLabel className="text-center ">
                {t("appearance")}
              </DropdownMenuLabel>
              <DropdownMenuGroup className="flex ">
                <DropdownMenuItem
                  className={`flex-1 justify-center ${
                    theme === "light" ? "bg-amber-600" : ""
                  }`}
                  onClick={() => setTheme("light")}
                >
                  <SunIcon className="w-5.5! h-full! " />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`flex-1 justify-center ${
                    theme === "dark" ? "bg-threaditemhoverbg" : ""
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  <MoonIcon />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`flex-1 justify-center ${
                    theme === "auto" ? "bg-threaditemhoverbg" : ""
                  }`}
                  onClick={() => setTheme("auto")}
                >
                  <span>{t("auto")}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuItem className="flex! justify-between px-1! py-3!">
            {t("insights")}
          </DropdownMenuItem>
          <DropdownMenuItem className="flex! justify-between px-1! py-3!">
            {t("settings")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className=" border-2 border-systemtext" />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t("feeds")}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="flex! justify-between px-1! py-3!">
                  {t("for_you")}
                </DropdownMenuItem>
                <DropdownMenuItem className="flex! justify-between px-1! py-3!">
                  {t("following")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex! justify-between px-1! py-3!">
                  {t("ghost_posts")}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="flex! justify-between px-1! py-3!">
            {t("saved")}
          </DropdownMenuItem>
          <DropdownMenuItem className="flex! justify-between px-1! py-3!">
            {t("liked")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex! justify-between px-1! py-3!">
            {t("report_a_problem")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-between! px-1! py-3! text-red-500"
            onClick={handleLogout}
          >
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

NavbarMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavbarMenu;
