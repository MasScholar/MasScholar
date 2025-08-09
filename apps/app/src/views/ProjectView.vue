<script setup lang="ts">
import { Folder, LayoutDashboard, CalendarDays, Search, Blocks } from 'lucide-vue-next';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@masscholar/ui'

const items = [
  {
    title: "MaS-Scholar",
    url: "#",
    icon: Folder,
  },
  {
    title: "Project Manager",
    url: "#",
    icon: LayoutDashboard
  },
  {
    title: "Calendar",
    url: "#",
    icon: CalendarDays
  },
  {
    title: "Search",
    url: "#",
    icon: Search
  },
  {
    title: 'Plugins',
    url: '#',
    icon: Blocks,
  }
];
</script>
<template>
  <div class="flex flex-row h-screen">
    <Sidebar class="w-[42px]">
      <SidebarContent>
        <SidebarGroup class="p-1">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                  <a :href="item.url">
                    <component :is="item.icon" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>

        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
    <main>
      <SidebarTrigger />
      <router-view />
    </main>
  </div>
</template>
