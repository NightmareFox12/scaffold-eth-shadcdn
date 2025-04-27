import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./shad/ui/sidebar";
import { NextPage } from "next";

const AppSidebar: NextPage = () => {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
