"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PackageOpen,
  Plus,
  Filter,
  ArrowDownUp,
  Search,
  RefreshCw,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  FileText,
  ChevronRight,
  ArrowUpRight,
  ChevronDown,
  AlertTriangle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Tomato Sauce",
    category: "Sauce",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: "kg",
    costPerUnit: 85,
    supplier: "Fresh Farms Ltd.",
    lastRestocked: "2025-05-10",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Mozzarella Cheese",
    category: "Dairy",
    currentStock: 18,
    minStock: 15,
    maxStock: 50,
    unit: "kg",
    costPerUnit: 320,
    supplier: "Dairy Delights",
    lastRestocked: "2025-05-15",
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Pizza Dough",
    category: "Base",
    currentStock: 56,
    minStock: 30,
    maxStock: 100,
    unit: "kg",
    costPerUnit: 110,
    supplier: "Flour Mills Inc.",
    lastRestocked: "2025-05-12",
    status: "In Stock",
  },
  {
    id: 4,
    name: "Pepperoni",
    category: "Meat",
    currentStock: 8,
    minStock: 10,
    maxStock: 30,
    unit: "kg",
    costPerUnit: 450,
    supplier: "Premium Meats",
    lastRestocked: "2025-05-08",
    status: "Critical",
  },
  {
    id: 5,
    name: "Black Olives",
    category: "Vegetable",
    currentStock: 12,
    minStock: 8,
    maxStock: 25,
    unit: "kg",
    costPerUnit: 180,
    supplier: "Green Garden",
    lastRestocked: "2025-05-14",
    status: "In Stock",
  },
  {
    id: 6,
    name: "Mushrooms",
    category: "Vegetable",
    currentStock: 14,
    minStock: 12,
    maxStock: 30,
    unit: "kg",
    costPerUnit: 210,
    supplier: "Green Garden",
    lastRestocked: "2025-05-13",
    status: "In Stock",
  },
  {
    id: 7,
    name: "Bell Peppers",
    category: "Vegetable",
    currentStock: 9,
    minStock: 10,
    maxStock: 25,
    unit: "kg",
    costPerUnit: 160,
    supplier: "Fresh Farms Ltd.",
    lastRestocked: "2025-05-11",
    status: "Low Stock",
  },
  {
    id: 8,
    name: "Oregano",
    category: "Spice",
    currentStock: 5,
    minStock: 3,
    maxStock: 10,
    unit: "kg",
    costPerUnit: 450,
    supplier: "Spice World",
    lastRestocked: "2025-05-05",
    status: "In Stock",
  },
]

// Status color mapping
const statusColors = {
  "In Stock": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "Low Stock": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  "Critical": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
}

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showLowStock, setShowLowStock] = useState(false)

  // Filter items based on search, category, and status
  const filteredItems = inventoryItems
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(item => categoryFilter === "All" || item.category === categoryFilter)
    .filter(item => statusFilter === "All" || item.status === statusFilter)
    .filter(item => !showLowStock || item.status !== "In Stock")

  // Get unique categories for filter
  const categories = ["All", ...new Set(inventoryItems.map(item => item.category))]
  
  // Get inventory summary
  const totalItems = inventoryItems.length
  const lowStockItems = inventoryItems.filter(item => item.status === "Low Stock").length
  const criticalItems = inventoryItems.filter(item => item.status === "Critical").length
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Inventory Management</h1>
          <p className="text-gray-400 mt-1">Track and manage your pizza ingredients</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Inventory Item</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new item to your inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Item Name</Label>
                    <Input id="name" placeholder="e.g., Mozzarella Cheese" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white">Category</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="sauce">Sauce</SelectItem>
                        <SelectItem value="dairy">Dairy</SelectItem>
                        <SelectItem value="meat">Meat</SelectItem>
                        <SelectItem value="vegetable">Vegetable</SelectItem>
                        <SelectItem value="base">Base</SelectItem>
                        <SelectItem value="spice">Spice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="current" className="text-white">Current Stock</Label>
                    <Input id="current" type="number" placeholder="0" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min" className="text-white">Min Stock</Label>
                    <Input id="min" type="number" placeholder="0" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max" className="text-white">Max Stock</Label>
                    <Input id="max" type="number" placeholder="0" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="unit" className="text-white">Unit</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="l">l</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="units">units</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost" className="text-white">Cost per Unit (₹)</Label>
                    <Input id="cost" type="number" placeholder="0" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier" className="text-white">Supplier</Label>
                  <Input id="supplier" placeholder="e.g., Dairy Delights" className="bg-gray-800 border-gray-700" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">Cancel</Button>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90">Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                <Download className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white">
              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Total Items</p>
                <h3 className="text-2xl font-bold text-white">{totalItems}</h3>
                <p className="text-xs text-gray-400 mt-1">Across {categories.length - 1} categories</p>
              </div>
              <div className="p-2 rounded-lg bg-gray-800">
                <PackageOpen className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Low Stock Items</p>
                <h3 className="text-2xl font-bold text-white">{lowStockItems}</h3>
                <p className="text-xs text-gray-400 mt-1">Need attention soon</p>
              </div>
              <div className="p-2 rounded-lg bg-yellow-900/20">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Critical Items</p>
                <h3 className="text-2xl font-bold text-white">{criticalItems}</h3>
                <p className="text-xs text-gray-400 mt-1">Require immediate restocking</p>
              </div>
              <div className="p-2 rounded-lg bg-red-900/20">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Total Value</p>
                <h3 className="text-2xl font-bold text-white">₹{totalValue.toLocaleString()}</h3>
                <p className="text-xs text-gray-400 mt-1">Current inventory value</p>
              </div>
              <div className="p-2 rounded-lg bg-green-900/20">
                <ArrowUpRight className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table Card */}
      <Card className="border-gray-800 shadow-lg bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl text-white">Inventory Items</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search items..." 
                  className="pl-9 bg-gray-800 border-gray-700 text-white w-full sm:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-full sm:w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800 text-white">
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-full sm:w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800 text-white">
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="border-gray-700 text-white hover:bg-gray-800"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("All")
                  setStatusFilter("All")
                  setShowLowStock(false)
                }}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Reset filters</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-gray-400 w-[250px]">Item Name</TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400 text-right">Current Stock</TableHead>
                  <TableHead className="text-gray-400 text-right">Min Stock</TableHead>
                  <TableHead className="text-gray-400 text-right">Cost per Unit</TableHead>
                  <TableHead className="text-gray-400 hidden lg:table-cell">Supplier</TableHead>
                  <TableHead className="text-gray-400 hidden md:table-cell">Last Restocked</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow key={item.id} className="border-gray-800 hover:bg-gray-800/30">
                      <TableCell className="font-medium text-white">{item.name}</TableCell>
                      <TableCell className="text-gray-300">{item.category}</TableCell>
                      <TableCell className="text-right text-white">
                        {item.currentStock} {item.unit}
                      </TableCell>
                      <TableCell className="text-right text-gray-300">
                        {item.minStock} {item.unit}
                      </TableCell>
                      <TableCell className="text-right text-white">₹{item.costPerUnit}</TableCell>
                      <TableCell className="text-gray-300 hidden lg:table-cell">{item.supplier}</TableCell>
                      <TableCell className="text-gray-300 hidden md:table-cell">{item.lastRestocked}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[item.status]}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-white">
                            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Item
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Restock
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            <DropdownMenuItem className="text-red-500 hover:bg-gray-800 cursor-pointer">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center text-gray-400">
                      No items found with the current filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious className="text-gray-400 hover:text-white" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="text-white bg-gray-800">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="text-gray-400 hover:text-white">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="text-gray-400 hover:text-white">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext className="text-gray-400 hover:text-white" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}