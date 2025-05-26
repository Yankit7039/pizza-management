"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Pizza,
  Home,
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart2,
  Calendar,
  Bell,
  Settings,
  ChevronRight,
  LogOut,
  Menu,
  PackageOpen,
  ClipboardList,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

export function AppSidebar() {
  const { open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar()
  const pathname = usePathname()
  const { data: session } = useSession()
  const mobile = useIsMobile()

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    if (path !== "/dashboard" && pathname.startsWith(path)) {
      return true
    }
    return false
  }

  const sidebarLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: isActive("/dashboard"),
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
      active: isActive("/dashboard/orders"),
    },
    {
      name: "Menu",
      href: "/dashboard/menu",
      icon: Pizza,
      active: isActive("/dashboard/menu"),
    },
    {
      name: "Inventory",
      href: "/dashboard/inventory",
      icon: PackageOpen,
      active: isActive("/dashboard/inventory"),
    },
    {
      name: "Customers",
      href: "/dashboard/customers",
      icon: Users,
      active: isActive("/dashboard/customers"),
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart2,
      active: isActive("/dashboard/analytics"),
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: ClipboardList,
      active: isActive("/dashboard/reports"),
    },
    {
      name: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
      active: isActive("/dashboard/calendar"),
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      active: isActive("/dashboard/notifications"),
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      active: isActive("/dashboard/settings"),
    },
  ]

  const renderSidebarContent = () => (
    <>
      <div className="px-3 py-2">
        <Link
          href="/dashboard"
          className="flex items-center px-2 py-3 mb-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500"
        >
          <Pizza className="h-6 w-6 text-white" />
          {(open || openMobile) && (
            <span className="ml-3 font-bold text-white">PizzaCraft</span>
          )}
        </Link>

        {/* <Link
          href="/home"
          className={cn(
            "flex items-center px-2 py-2 mt-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors",
            isActive("/home") && "bg-gray-800 text-white"
          )}
        >
          <Home className="h-5 w-5" />
          {(open || openMobile) && <span className="ml-3">Home</span>}
        </Link> */}
      </div>

      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center px-2 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors",
                link.active && "bg-gray-800 text-white"
              )}
            >
              <link.icon className="h-5 w-5" />
              {(open || openMobile) && <span className="ml-3">{link.name}</span>}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-3 py-4 mt-auto">
        <div className="space-y-2">
          <div
            className={cn(
              "px-3 py-2 rounded-lg",
              open || openMobile ? "bg-gray-800/50" : ""
            )}
          >
            {(open || openMobile) && (
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                  {session?.user?.name?.[0] || "U"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white truncate max-w-[140px]">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate max-w-[140px]">
                    {session?.user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start text-gray-400 hover:text-white hover:bg-gray-700",
                !open && !openMobile && "justify-center px-0"
              )}
              onClick={() => {
                // Sign out logic would go here
              }}
            >
              <LogOut className="h-5 w-5" />
              {(open || openMobile) && <span className="ml-2">Sign out</span>}
            </Button>
          </div>

          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-7 text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => setOpen(!open)}
            >
              <ChevronRight
                className={cn("h-4 w-4 transition-transform", open ? "rotate-180" : "")}
              />
            </Button>
          )}
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile overlay */}
      {openMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transition-transform duration-300 lg:hidden",
          openMobile ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {renderSidebarContent()}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen bg-gray-900 border-r border-gray-800 transition-all duration-300 lg:block",
          open ? "w-64" : "w-16"
        )}
      >
        {renderSidebarContent()}
      </aside>
    </>
  )
}