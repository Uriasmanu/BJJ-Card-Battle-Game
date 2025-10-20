import { Home, User, Settings, Layers } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Jogador",
    url: "/dashboard/profile",
    icon: User, 
  },
  {
    title: "Minhas Técnicas",
    url: "/dashboard/tecnicas",
    icon: Layers, 
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-gray-900 text-white">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}