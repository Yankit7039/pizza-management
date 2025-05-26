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
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"

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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
          <p className="text-gray-300 mb-1">{label}</p>
          <p className="text-green-400 font-medium">₹{payload[0].value}</p>
          {payload[1] && (
            <p className="text-blue-400 font-medium">{payload[1].value} orders</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <Card className="border-gray-800 shadow-lg bg-gray-900/50">
        <CardContent className="p-6 sm:p-8">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
              Welcome back, {session?.user?.name?.split(" ")[0] || "Chef"}! 👋
            </h1>
            <p className="text-gray-400 mb-6">
              Here's what's happening with your pizza business today.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-gray-800 shadow-lg bg-gray-900/50">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    <div
                      className={`flex items-center text-xs font-medium ${
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Sales Chart */}
        <Card className="border-gray-800 shadow-lg bg-gray-900/50 lg:col-span-5">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Sales Overview</CardTitle>
            <CardDescription className="text-gray-400">
              Weekly sales and orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#22c55e"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#salesGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#ordersGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center mt-2 space-x-8">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-400">Sales</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-400">Orders</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Pizzas Chart */}
        <Card className="border-gray-800 shadow-lg bg-gray-900/50 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Top Pizzas</CardTitle>
            <CardDescription className="text-gray-400">
              Best selling pizzas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pizzaData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pizzaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-2 bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
                            <p className="text-white font-medium">{payload[0].name}</p>
                            <p className="text-gray-400">{payload[0].value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {pizzaData.map((pizza, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: pizza.color }}
                    ></div>
                    <span className="text-sm text-gray-300">{pizza.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{pizza.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="border-gray-800 shadow-lg bg-gray-900/50 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-white text-lg">Recent Orders</CardTitle>
              <CardDescription className="text-gray-400">
                Latest pizza orders
              </CardDescription>
            </div>
            <Link href="/dashboard/orders">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                View all
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-gray-400 font-medium">Order ID</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-gray-400 font-medium">Customer</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-gray-400 font-medium">Pizza</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-gray-400 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-gray-400 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-white">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-white">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-white">{order.pizza}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={statusColors[order.status]}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-white">{order.amount}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Performance</CardTitle>
            <CardDescription className="text-gray-400">
              Key performance metrics
            </CardDescription>
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
  )
}
