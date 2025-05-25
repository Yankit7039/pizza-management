"use client"

import { useState } from "react"
import { Search, Plus, Package, AlertTriangle, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Mock inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Pizza Dough",
    category: "Base",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: "kg",
    costPerUnit: 65,
    supplier: "Delhi Fresh Ingredients Pvt Ltd",
    lastRestocked: "2024-01-10",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Mozzarella Cheese",
    category: "Cheese",
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unit: "kg",
    costPerUnit: 320,
    supplier: "Amul Dairy Products",
    lastRestocked: "2024-01-08",
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Tomato Sauce",
    category: "Sauce",
    currentStock: 25,
    minStock: 10,
    maxStock: 40,
    unit: "L",
    costPerUnit: 95,
    supplier: "Kissan Food Products",
    lastRestocked: "2024-01-12",
    status: "In Stock",
  },
  {
    id: 4,
    name: "Chicken Tikka",
    category: "Meat",
    currentStock: 2,
    minStock: 5,
    maxStock: 20,
    unit: "kg",
    costPerUnit: 480,
    supplier: "Licious Fresh Meats",
    lastRestocked: "2024-01-05",
    status: "Critical",
  },
  {
    id: 5,
    name: "Paneer",
    category: "Dairy",
    currentStock: 12,
    minStock: 8,
    maxStock: 25,
    unit: "kg",
    costPerUnit: 280,
    supplier: "Mother Dairy",
    lastRestocked: "2024-01-14",
    status: "In Stock",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStockPercentage = (current: number, max: number) => {
    return (current / max) * 100
  }

  const lowStockItems = inventoryItems.filter((item) => item.currentStock <= item.minStock)
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.currentStock * item.costPerUnit, 0)

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage your ingredient inventory</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active inventory items</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            <p className="text-xs text-red-600 mt-1">Items need restocking</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">₹{totalValue.toFixed(2)}</div>
            <p className="text-xs text-green-600 mt-1">Current inventory value</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">5</div>
            <p className="text-xs text-muted-foreground mt-1">Product categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10">
          <CardHeader>
            <CardTitle className="text-red-800 dark:text-red-400 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription className="text-red-600 dark:text-red-400">
              The following items need immediate restocking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white dark:bg-background rounded-lg gap-2"
                >
                  <div>
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {item.currentStock} {item.unit} remaining
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    Restock Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-foreground">Inventory Items</CardTitle>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-background/50 border-border/50"
                />
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead className="text-foreground">Item</TableHead>
                  <TableHead className="text-foreground hidden sm:table-cell">Category</TableHead>
                  <TableHead className="text-foreground">Stock Level</TableHead>
                  <TableHead className="text-foreground hidden md:table-cell">Status</TableHead>
                  <TableHead className="text-foreground">Cost/Unit</TableHead>
                  <TableHead className="text-foreground hidden lg:table-cell">Total Value</TableHead>
                  <TableHead className="text-foreground hidden xl:table-cell">Supplier</TableHead>
                  <TableHead className="text-foreground hidden xl:table-cell">Last Restocked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="border-border/50 hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm sm:text-base">{item.name}</div>
                          <div className="text-xs text-muted-foreground">ID: #{item.id}</div>
                          <div className="sm:hidden text-xs text-muted-foreground">{item.category}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="border-border/50">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground">
                            {item.currentStock} {item.unit}
                          </span>
                          <span className="text-muted-foreground">
                            / {item.maxStock} {item.unit}
                          </span>
                        </div>
                        <Progress value={getStockPercentage(item.currentStock, item.maxStock)} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">₹{item.costPerUnit.toFixed(2)}</div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="font-medium text-foreground">
                        ₹{(item.currentStock * item.costPerUnit).toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="text-sm text-muted-foreground max-w-[150px] truncate">{item.supplier}</div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="text-sm text-muted-foreground">{item.lastRestocked}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
