<script setup lang="ts">
import { Folder, LayoutDashboard, CalendarDays, Search, Blocks, Workflow, Sparkles } from 'lucide-vue-next';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider
} from '@/components/ui/sidebar'

const items = [
  {
    title: "MaS-Scholar",
    url: "#",
    icon: Folder,
  },
  {
    title: "Search",
    url: "#",
    icon: Search
  },
  {
    title: "Ai",
    url: "#",
    icon: Sparkles
  },
  {
    title: "Workflow",
    url: "#",
    icon: Workflow,
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
    title: 'Plugins',
    url: '#',
    icon: Blocks,
  }
];
</script>

<template>
  <SidebarProvider>
    <div class="flex flex-row h-screen">
      <Sidebar class="w-[42px]" collapsible="icon">
        <SidebarContent>
          <SidebarGroup class="p-1">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem v-for="item in items" :key="item.title" class="flex justify-center items-center">
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
      <main class="flex-grow">
        <div class="p-4">
          <SidebarTrigger />
        </div>
        <div class="p-4">
          <h1 class="text-2xl font-bold mb-4">项目视图</h1>
          <p class="text-gray-600 dark:text-gray-400">这里是项目的主要内容区域</p>
        </div>
      </main>
    </div>
  </SidebarProvider>
</template>
