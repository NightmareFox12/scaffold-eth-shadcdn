import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuLinks } from "./Header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./shad/ui/sidebar";
import { NextPage } from "next";

const AppSidebar: NextPage = () => {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            {menuLinks.map(({ label, href, icon }) => {
              const isActive = pathname === href;

              return (
                <SidebarMenuItem key={href} className="px-2">
                  <SidebarMenuButton
                    className={`${
                      isActive ? "bg-secondary" : ""
                    } hover:bg-secondary p-2`}
                    asChild
                  >
                    <Link href={href}>
                      {icon}
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
