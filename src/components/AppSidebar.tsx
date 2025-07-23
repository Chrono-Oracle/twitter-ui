'use client'

import { Bell, Bookmark, CircleEllipsis, Hash, Home,  LayoutList,  Mail, Twitter, User } from "lucide-react"

// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
//   useUser,
// } from '@clerk/nextjs'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { ModeToggle } from "./ThemeToggle"
import { Button } from "./ui/button"
import { SidebarFooter } from "./sidebar"



// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Explore",
    url: "#",
    icon: Hash,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
  },
  {
    title: "Messages",
    url: "#",
    icon: Mail,
  },
  {
    title: "Bookmarks",
    url: "#",
    icon: Bookmark,
  },
  {
    title: "Lists",
    url: "#",
    icon: LayoutList,
  },
  {
    title: "Profile",
    url: "/home/profile",
    icon: User,
  },
  {
    title: "More",
    url: "#",
    icon: CircleEllipsis,
  },
]



export function AppSidebar() {

  const handleLogout = () => {
    localStorage.removeItem('user');
  }

  // const { isLoaded, isSignedIn, user } = useUser();

  // if (isLoaded && isSignedIn && user) {
  //   const userEmail = user?.emailAddresses[0]?.emailAddress || null;
  //   const userFullName = user?.fullName;
  // }

  return (
    <Sidebar>
      <SidebarHeader><Twitter fill="#1DA1F2" stroke="#1DA1F2" /></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <div className="flex flex-col gap-2">
                  <ModeToggle />
                  <Button className="w-full rounded-full bg-[#1DA1F2] hover:bg-[#3b71bd]">Tweet</Button>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>


      <SidebarFooter>
        {/* <SignedOut>
          <div className="flex justify-between">
            <Button className="bg-[#1DA1F2] hover:bg-[#3b71bd]">
              <SignInButton />
            </Button>
            <Button className="bg-[#004a77] hover:bg-[#3b71bd]">
              <SignUpButton />
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-2">
            <UserButton />
            <div>
              <h4 className="font-semibold text-[.9rem]">{user?.fullName}</h4>
              <p className="text-gray-500 text-[.7rem]">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>
        </SignedIn> */}
        <Button onClick={handleLogout}>
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}