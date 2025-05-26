"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
  Pizza,
  Star,
  Calendar,
  Download,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Line } from "recharts"
import { useState } from "react"

const revenueData = [
  { month: "Jan", revenue: 248000, orders: 156, customers: 89 },
  { month: "Feb", revenue: 312000, orders: 198, customers: 112 },
  { month: "Mar", revenue: 378000, orders: 234, customers: 145 },
  { month: "Apr", revenue: 442000, orders: 267, customers: 178 },
  { month: "May", revenue: 516000, orders: 312, customers: 203 },
  { month: "Jun", revenue: 568000, orders: 345, customers: 234 },
]

const hourlyData = [
  { hour: "9AM", orders: 12 },
  { hour: "10AM", orders: 18 },
  { hour: "11AM", orders: 25 },
  { hour: "12PM", orders: 45 },
  { hour: "1PM", orders: 52 },
  { hour: "2PM", orders: 38 },
  { hour: "3PM", orders: 28 },
  { hour: "4PM", orders: 22 },
  { hour: "5PM", orders: 35 },
  { hour: "6PM", orders: 48 },
  { hour: "7PM", orders: 62 },
  { hour: "8PM", orders: 55 },
  { hour: "9PM", orders: 42 },
  { hour: "10PM", orders: 28 },
]

const pizzaPopularity = [
  { name: "Paneer Tikka", value: 35, orders: 156, revenue: 46800 },
  { name: "Chicken Tikka", value: 28, orders: 124, revenue: 42160 },
  { name: "Veggie Supreme", value: 20, orders: 89, revenue: 35600 },
  { name: "Margherita", value: 17, orders: 76, revenue: 33440 },
]

const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-3))",
  },
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  const stats = [
    {
      title: "Total Revenue",
      value: "₹24,91,340",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "vs last period",
    },
    {
      title: "Total Orders",
      value: "1,847",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      description: "vs last period",
    },
    {
      title: "Active Customers",
      value: "961",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      description: "vs last period",
    },
    {
      title: "Avg. Order Value",
      value: "₹1,349",
      change: "-2.1%",
      trend: "down",
      icon: Pizza,
      description: "vs last period",
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into your pizza business</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        stat.trend === "up"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </div>
                    <span className="text-xs text-muted-foreground">{stat.description}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue & Orders Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Revenue & Orders Trend
          </CardTitle>
          <CardDescription>Monthly performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.2}
                />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--chart-2))" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Orders */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Orders by Hour
            </CardTitle>
            <CardDescription>Peak hours analysis</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] w-[500px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="orders" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pizza Popularity */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pizza className="w-5 h-5" />
              Pizza Popularity
            </CardTitle>
            <CardDescription>Most ordered pizzas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pizzaPopularity}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pizzaPopularity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-muted-foreground">{data.value}% of orders</p>
                            <p className="text-sm text-muted-foreground">{data.orders} orders</p>
                            <p className="text-sm text-muted-foreground">₹{data.revenue} revenue</p>
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
              {pizzaPopularity.map((pizza, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }} />
                    <span className="text-sm font-medium">{pizza.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{pizza.value}%</p>
                    <p className="text-xs text-muted-foreground">{pizza.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Customer Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">4.8</div>
              <div className="text-sm text-muted-foreground">out of 5 stars</div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>5 stars</span>
                <span>68%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "68%" }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>4 stars</span>
                <span>22%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "22%" }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>3 stars</span>
                <span>7%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "7%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Top Performing Days</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { day: "Friday", orders: 89, revenue: "₹1,245" },
              { day: "Saturday", orders: 76, revenue: "₹1,156" },
              { day: "Sunday", orders: 68, revenue: "₹987" },
              { day: "Thursday", orders: 54, revenue: "₹876" },
            ].map((day, index) => (
              <div key={day.day} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="font-medium">{day.day}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">{day.revenue}</p>
                  <p className="text-sm text-muted-foreground">{day.orders} orders</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800 dark:text-green-400">Revenue Growth</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Revenue increased by 12.5% compared to last month
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800 dark:text-blue-400">Peak Hours</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                7-8 PM is your busiest hour with 62 orders on average
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Pizza className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-purple-800 dark:text-purple-400">Popular Item</span>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Paneer Tikka pizza accounts for 35% of all orders
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
