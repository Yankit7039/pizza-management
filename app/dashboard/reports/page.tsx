"use client"

import { useState } from "react"
import { Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Pizza } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for charts
const salesData = [
  { month: "Jan", revenue: 125000, orders: 245 },
  { month: "Feb", revenue: 152000, orders: 298 },
  { month: "Mar", revenue: 189000, orders: 367 },
  { month: "Apr", revenue: 168000, orders: 324 },
  { month: "May", revenue: 213000, orders: 412 },
  { month: "Jun", revenue: 196000, orders: 378 },
]

const topPizzas = [
  { name: "Margherita", sales: 1250, percentage: 28 },
  { name: "Paneer Tikka", sales: 1100, percentage: 25 },
  { name: "Chicken Tikka", sales: 890, percentage: 20 },
  { name: "Veggie Supreme", sales: 670, percentage: 15 },
  { name: "Butter Chicken Pizza", sales: 540, percentage: 12 },
]

const pieColors = ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5"]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last-30-days")

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">Track your business performance and insights</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹10,43,000</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2,024</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+8.2% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Users className="w-4 h-4 mr-2" />
                New Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">-3.1% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Pizza className="w-4 h-4 mr-2" />
                Avg Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹515</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+5.8% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="sales" className="space-y-8">
          <TabsList>
            <TabsTrigger value="sales">Sales Overview</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
            <TabsTrigger value="customers">Customer Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground">Revenue Trend</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Monthly revenue over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue (₹)",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[400px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="month"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `₹${value / 1000}k`}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]} />
                          }
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="var(--color-revenue)"
                          strokeWidth={3}
                          dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: "var(--color-revenue)", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground">Order Volume</CardTitle>
                  <CardDescription className="text-muted-foreground">Number of orders per month</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer
                    config={{
                      orders: {
                        label: "Orders",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[400px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="month"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="orders" fill="var(--color-orders)" radius={[6, 6, 0, 0]} maxBarSize={60} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground">Top Selling Pizzas</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Best performing products this month
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {topPizzas.map((pizza, index) => (
                      <div key={pizza.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground text-base">{pizza.name}</div>
                            <div className="text-sm text-muted-foreground">{pizza.sales} sold</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-sm font-medium">
                          {pizza.percentage}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground">Sales Distribution</CardTitle>
                  <CardDescription className="text-muted-foreground">Product sales breakdown</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer
                    config={{
                      sales: {
                        label: "Sales",
                      },
                    }}
                    className="h-[400px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={topPizzas}
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          innerRadius={40}
                          dataKey="sales"
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                          labelLine={false}
                          fontSize={12}
                        >
                          {topPizzas.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={<ChartTooltipContent formatter={(value, name) => [`${value} sold`, name]} />}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Customer Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">87%</div>
                  <p className="text-sm text-green-600 mt-2">+3% from last month</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Repeat Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">64%</div>
                  <p className="text-sm text-green-600 mt-2">+7% from last month</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Customer Lifetime Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">₹3,420</div>
                  <p className="text-sm text-green-600 mt-2">+12% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
