"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ShoppingCart,
  TrendingUp,
  Users,
  Clock,
  Pizza,
  DollarSign,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { ChartTooltip } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const salesData = [
  { name: "Mon", sales: 1200, orders: 45 },
  { name: "Tue", sales: 1900, orders: 67 },
  { name: "Wed", sales: 1600, orders: 58 },
  { name: "Thu", sales: 2100, orders: 78 },
  { name: "Fri", sales: 2800, orders: 95 },
  { name: "Sat", sales: 3200, orders: 112 },
  { name: "Sun", sales: 2900, orders: 98 },
]

const pizzaData = [
  { name: "Margherita", value: 35, color: "#ff6b6b" },
  { name: "Pepperoni", value: 28, color: "#4ecdc4" },
  { name: "Veggie", value: 20, color: "#45b7d1" },
  { name: "Meat Lovers", value: 17, color: "#96ceb4" },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
}

export default function Dashboard() {
  const { data: session } = useSession()

  const stats = [
    {
      title: "Total Revenue",
      value: "₹24,91,340",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      description: "vs last month",
    },
    {
      title: "Orders Today",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      description: "vs yesterday",
    },
    {
      title: "Active Customers",
      value: "2,847",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      description: "this month",
    },
    {
      title: "Avg. Delivery Time",
      value: "24 min",
      change: "-5.1%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      description: "improvement",
    },
  ]

  const recentOrders = [
    {
      id: "PZA001",
      customer: "John Doe",
      pizza: "Margherita",
      status: "Delivered",
      amount: "₹499",
      time: "2 min ago",
    },
    {
      id: "PZA002",
      customer: "Jane Smith",
      pizza: "Pepperoni",
      status: "Preparing",
      amount: "₹399",
      time: "5 min ago",
    },
    {
      id: "PZA003",
      customer: "Mike Johnson",
      pizza: "Veggie Supreme",
      status: "Out for Delivery",
      amount: "₹699",
      time: "8 min ago",
    },
    {
      id: "PZA004",
      customer: "Sarah Wilson",
      pizza: "Meat Lovers",
      status: "Pending",
      amount: "₹599",
      time: "12 min ago",
    },
  ]

  const statusColors = {
    Delivered: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    Preparing: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    "Out for Delivery": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="space-y-8 animate-fade-in p-6 bg-black">
        {/* Welcome Section - Fixed to Black */}
        <Card className="bg-black border-gray-800 shadow-lg">
          <CardContent className="p-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold mb-2 text-white">
                Welcome back, {session?.user?.name?.split(" ")[0] || "Chef"}! 👋
              </h1>
              <p className="text-gray-400 text-lg">
                Your pizza empire is thriving! Here's what's cooking in your business today.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="bg-black border-gray-800 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          stat.trend === "up"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {stat.change}
                      </div>
                      <span className="text-xs text-gray-400">{stat.description}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart - Fixed */}
          <Card className="bg-black border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5" />
                Weekly Sales Overview
              </CardTitle>
              <CardDescription className="text-gray-400">Sales and orders for the past week</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-black border border-gray-800 rounded-lg p-3 shadow-lg">
                              <p className="font-medium text-white">{label}</p>
                              <p className="text-sm text-blue-400">Sales: ₹{payload[0].value}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pizza Popularity */}
          <Card className="bg-black border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Pizza className="w-5 h-5" />
                Popular Pizzas
              </CardTitle>
              <CardDescription className="text-gray-400">Most ordered pizzas this month</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pizzaData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pizzaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-black border border-gray-800 rounded-lg p-2 shadow-lg">
                              <p className="font-medium text-white">{payload[0].payload.name}</p>
                              <p className="text-sm text-gray-400">{payload[0].value}% of orders</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {pizzaData.map((pizza, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pizza.color }} />
                    <span className="text-sm font-medium text-white">{pizza.name}</span>
                    <span className="text-sm text-gray-400 ml-auto">{pizza.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="bg-black border-gray-800 shadow-lg lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ShoppingCart className="w-5 h-5" />
                  Recent Orders
                </CardTitle>
                <CardDescription className="text-gray-400">Latest orders from your customers</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-gray-800 text-white hover:bg-gray-800">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Pizza className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{order.customer}</p>
                      <p className="text-sm text-gray-400">
                        {order.pizza} • {order.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className={statusColors[order.status as keyof typeof statusColors]} variant="secondary">
                      {order.status}
                    </Badge>
                    <p className="text-sm font-medium text-white">{order.amount}</p>
                    <p className="text-xs text-gray-400">{order.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-black border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Star className="w-5 h-5" />
                Performance
              </CardTitle>
              <CardDescription className="text-gray-400">Key business metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Customer Satisfaction</span>
                  <span className="font-medium text-white">4.8/5</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Order Accuracy</span>
                  <span className="font-medium text-white">98.5%</span>
                </div>
                <Progress value={98.5} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">On-time Delivery</span>
                  <span className="font-medium text-white">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Kitchen Efficiency</span>
                  <span className="font-medium text-white">91.8%</span>
                </div>
                <Progress value={91.8} className="h-2" />
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">47</p>
                    <p className="text-xs text-gray-400">Orders Today</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-xs text-gray-400">In Kitchen</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
