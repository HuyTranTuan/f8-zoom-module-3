import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavLink } from "react-router";

function MainSidebarLink({ navigate }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink
          to={navigate.url}
          className="flex justify-center items-center p-1.5 w-15 h-15 [&>svg]:size-6"
        >
          {({ isActive }) => (
            <navigate.icon
              className={`${
                isActive ? "text-(--normaltext)" : "text-(--systemtext)"
              }`}
            />
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default MainSidebarLink;
