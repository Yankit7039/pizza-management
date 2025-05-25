"use client"

import { useState } from "react"
import { Bell, AlertTriangle, Info, CheckCircle, Clock, Filter, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #1234 - 2x Margherita Pizza, 1x Paneer Tikka Pizza",
    time: "2 minutes ago",
    read: false,
    priority: "high",
    icon: CheckCircle,
  },
  {
    id: 2,
    type: "inventory",
    title: "Low Stock Alert",
    message: "Mozzarella cheese is running low (8kg remaining)",
    time: "15 minutes ago",
    read: false,
    priority: "medium",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "system",
    title: "Daily Report Ready",
    message: "Your daily sales report for January 15, 2024 is ready",
    time: "1 hour ago",
    read: true,
    priority: "low",
    icon: Info,
  },
  {
    id: 4,
    type: "order",
    title: "Order Completed",
    message: "Order #1230 has been delivered successfully to Rajesh Kumar",
    time: "2 hours ago",
    read: true,
    priority: "low",
    icon: CheckCircle,
  },
  {
    id: 5,
    type: "inventory",
    title: "Delivery Scheduled",
    message: "Fresh ingredients delivery scheduled for tomorrow at 2:00 PM",
    time: "3 hours ago",
    read: false,
    priority: "medium",
    icon: Clock,
  },
  {
    id: 6,
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance completed successfully",
    time: "1 day ago",
    read: true,
    priority: "low",
    icon: Info,
  },
]

export default function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [notificationSettings, setNotificationSettings] = useState({
    orders: true,
    inventory: true,
    system: false,
    marketing: true,
    email: true,
    push: true,
    sms: false,
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return CheckCircle
      case "inventory":
        return AlertTriangle
      case "system":
        return Info
      default:
        return Bell
    }
  }

  const getNotificationColor = (priority: string, read: boolean) => {
    if (read) return "text-muted-foreground"

    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-blue-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedTab === "all") return true
    if (selectedTab === "unread") return !notification.read
    return notification.type === selectedTab
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground mt-1">Stay updated with your business activities</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="bg-card border-border text-foreground">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="bg-card border-border text-foreground">
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border-border shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{notifications.length}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unread</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
              <p className="text-xs text-red-600 mt-1">Require attention</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {notifications.filter((n) => n.priority === "high").length}
              </div>
              <p className="text-xs text-orange-600 mt-1">Urgent items</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {notifications.filter((n) => n.time.includes("minutes") || n.time.includes("hour")).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Recent notifications</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications List */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-5 bg-card border-border">
                    <TabsTrigger value="all" className="text-foreground">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="text-foreground">
                      Unread {unreadCount > 0 && <Badge className="ml-1 bg-red-500">{unreadCount}</Badge>}
                    </TabsTrigger>
                    <TabsTrigger value="order" className="text-foreground">
                      Orders
                    </TabsTrigger>
                    <TabsTrigger value="inventory" className="text-foreground">
                      Inventory
                    </TabsTrigger>
                    <TabsTrigger value="system" className="text-foreground">
                      System
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={selectedTab} className="mt-6">
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => {
                        const IconComponent = getNotificationIcon(notification.type)
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 border rounded-lg hover:bg-accent transition-colors ${
                              !notification.read
                                ? "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10"
                                : "border-border"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`p-2 rounded-full ${!notification.read ? "bg-orange-100 dark:bg-orange-900/20" : "bg-accent"}`}
                                >
                                  <IconComponent
                                    className={`w-4 h-4 ${getNotificationColor(
                                      notification.priority,
                                      notification.read,
                                    )}`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4
                                      className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                                    >
                                      {notification.title}
                                    </h4>
                                    <Badge className={getPriorityBadge(notification.priority)}>
                                      {notification.priority}
                                    </Badge>
                                    {!notification.read && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-card border-border">
                                  <DropdownMenuLabel className="text-foreground">Actions</DropdownMenuLabel>
                                  <DropdownMenuItem className="text-foreground">
                                    {notification.read ? "Mark as Unread" : "Mark as Read"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-foreground">Archive</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        )
                      })}
                      {filteredNotifications.length === 0 && (
                        <div className="text-center py-8">
                          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No notifications found</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Notification Settings */}
          <div>
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Notification Settings</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Notification Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="orders" className="text-sm text-foreground">
                        Order Updates
                      </Label>
                      <Switch
                        id="orders"
                        checked={notificationSettings.orders}
                        onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, orders: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="inventory" className="text-sm text-foreground">
                        Inventory Alerts
                      </Label>
                      <Switch
                        id="inventory"
                        checked={notificationSettings.inventory}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, inventory: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system" className="text-sm text-foreground">
                        System Updates
                      </Label>
                      <Switch
                        id="system"
                        checked={notificationSettings.system}
                        onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, system: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing" className="text-sm text-foreground">
                        Marketing
                      </Label>
                      <Switch
                        id="marketing"
                        checked={notificationSettings.marketing}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, marketing: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-foreground">Delivery Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email" className="text-sm text-foreground">
                        Email
                      </Label>
                      <Switch
                        id="email"
                        checked={notificationSettings.email}
                        onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, email: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push" className="text-sm text-foreground">
                        Push Notifications
                      </Label>
                      <Switch
                        id="push"
                        checked={notificationSettings.push}
                        onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, push: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms" className="text-sm text-foreground">
                        SMS
                      </Label>
                      <Switch
                        id="sms"
                        checked={notificationSettings.sms}
                        onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, sms: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600">Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
