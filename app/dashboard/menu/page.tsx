"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Pizza,
  Plus,
  Search,
  RefreshCw,
  MoreHorizontal,
  Edit,
  Trash2,
  AlertTriangle,
  Flame,
  Tag,
  EyeOff,
  CheckCircle2,
  Filter,
  ArrowUpDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample menu items data
const menuItems = [
  {
    id: 1,
    name: "Margherita",
    description: "Classic Italian pizza with fresh tomatoes, mozzarella, basil, and olive oil",
    category: "Classic",
    price: { small: 199, medium: 299, large: 399 },
    ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Fresh Basil", "Olive Oil"],
    allergens: ["Dairy", "Gluten"],
    calories: { small: 850, medium: 1150, large: 1450 },
    prepTime: 15,
    isAvailable: true,
    isPopular: true,
    image: "/pizzas/margherita.jpg",
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "Classic American-style pizza topped with pepperoni slices and mozzarella",
    category: "Meat",
    price: { small: 249, medium: 349, large: 449 },
    ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Pepperoni Slices"],
    allergens: ["Dairy", "Gluten", "Meat"],
    calories: { small: 950, medium: 1250, large: 1550 },
    prepTime: 18,
    isAvailable: true,
    isPopular: true,
    image: "/pizzas/pepperoni.jpg",
  },
  {
    id: 3,
    name: "Vegetarian Supreme",
    description: "Loaded with bell peppers, onions, mushrooms, olives, and corn",
    category: "Vegetarian",
    price: { small: 229, medium: 329, large: 429 },
    ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Bell Peppers", "Onions", "Mushrooms", "Black Olives", "Corn"],
    allergens: ["Dairy", "Gluten"],
    calories: { small: 800, medium: 1100, large: 1400 },
    prepTime: 20,
    isAvailable: true,
    isPopular: false,
    image: "/pizzas/veggie.jpg",
  },
  {
    id: 4,
    name: "BBQ Chicken",
    description: "Tangy BBQ sauce base with grilled chicken, onions, and cilantro",
    category: "Specialty",
    price: { small: 279, medium: 379, large: 479 },
    ingredients: ["BBQ Sauce", "Mozzarella Cheese", "Grilled Chicken", "Red Onions", "Cilantro"],
    allergens: ["Dairy", "Gluten", "Meat"],
    calories: { small: 920, medium: 1220, large: 1520 },
    prepTime: 22,
    isAvailable: true,
    isPopular: true,
    image: "/pizzas/bbq-chicken.jpg",
  },
  {
    id: 5,
    name: "Paneer Tikka",
    description: "Indian-style pizza with spiced paneer cubes, bell peppers, and onions",
    category: "Indian",
    price: { small: 259, medium: 359, large: 459 },
    ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Paneer Cubes", "Bell Peppers", "Onions", "Indian Spices"],
    allergens: ["Dairy", "Gluten"],
    calories: { small: 880, medium: 1180, large: 1480 },
    prepTime: 25,
    isAvailable: true,
    isPopular: true,
    image: "/pizzas/paneer-tikka.jpg",
  },
  {
    id: 6,
    name: "Mediterranean",
    description: "Topped with feta cheese, olives, sun-dried tomatoes, and oregano",
    category: "Specialty",
    price: { small: 269, medium: 369, large: 469 },
    ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Feta Cheese", "Olives", "Sun-dried Tomatoes", "Oregano"],
    allergens: ["Dairy", "Gluten"],
    calories: { small: 870, medium: 1170, large: 1470 },
    prepTime: 20,
    isAvailable: false,
    isPopular: false,
    image: "/pizzas/mediterranean.jpg",
  },
  {
    id: 7,
    name: "Spicy Mexican",
    description: "Spicy pizza with jalapeños, bell peppers, onions, and corn",
    category: "Specialty",
    price: { small: 249, medium: 349, large: 449 },
    ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Jalapeños", "Bell Peppers", "Onions", "Corn", "Mexican Spices"],
    allergens: ["Dairy", "Gluten"],
    calories: { small: 890, medium: 1190, large: 1490 },
    prepTime: 18,
    isAvailable: true,
    isPopular: false,
    image: "/pizzas/mexican.jpg",
  },
  {
    id: 8,
    name: "Meat Lovers",
    description: "Loaded with pepperoni, sausage, bacon, and ground beef",
    category: "Meat",
    price: { small: 299, medium: 399, large: 499 },
    ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Pepperoni", "Sausage", "Bacon", "Ground Beef"],
    allergens: ["Dairy", "Gluten", "Meat"],
    calories: { small: 1050, medium: 1350, large: 1650 },
    prepTime: 25,
    isAvailable: true,
    isPopular: true,
    image: "/pizzas/meat-lovers.jpg",
  },
]

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [availabilityFilter, setAvailabilityFilter] = useState("All")
  
  // Filter menu items based on search, category, and availability
  const filteredItems = menuItems
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(item => categoryFilter === "All" || item.category === categoryFilter)
    .filter(item => {
      if (availabilityFilter === "All") return true;
      if (availabilityFilter === "Available") return item.isAvailable;
      if (availabilityFilter === "Unavailable") return !item.isAvailable;
      return true;
    })

  // Get unique categories for filter
  const categories = ["All", ...new Set(menuItems.map(item => item.category))]
  
  // Get menu summary
  const totalItems = menuItems.length
  const availableItems = menuItems.filter(item => item.isAvailable).length
  const popularItems = menuItems.filter(item => item.isPopular).length
  const unavailableItems = menuItems.filter(item => !item.isAvailable).length

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Menu Management</h1>
          <p className="text-gray-400 mt-1">Manage your pizza menu items</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add Pizza
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Pizza</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new pizza to your menu
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Pizza Name</Label>
                    <Input id="name" placeholder="e.g., Margherita" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white">Category</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800 text-white">
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="specialty">Specialty</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="meat">Meat</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Brief description of the pizza" 
                    className="bg-gray-800 border-gray-700 min-h-[80px]" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label className="text-white">Small Price (₹)</Label>
                    <Input type="number" placeholder="0" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Medium Price (₹)</Label>
                    <Input type="number" placeholder="0" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Large Price (₹)</Label>
                    <Input type="number" placeholder="0" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Ingredients</Label>
                  <Textarea 
                    placeholder="Enter ingredients, comma separated" 
                    className="bg-gray-800 border-gray-700" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-white">Allergens</Label>
                    <Input placeholder="e.g., Dairy, Gluten" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Prep Time (mins)</Label>
                    <Input type="number" placeholder="15" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="available" />
                    <Label htmlFor="available" className="text-white cursor-pointer">Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="popular" />
                    <Label htmlFor="popular" className="text-white cursor-pointer">Popular Item</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Pizza Image</Label>
                  <Input type="file" className="bg-gray-800 border-gray-700 text-white" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">Cancel</Button>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90">Add Pizza</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Menu Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Total Pizzas</p>
                <h3 className="text-2xl font-bold text-white">{totalItems}</h3>
                <p className="text-xs text-gray-400 mt-1">Across {categories.length - 1} categories</p>
              </div>
              <div className="p-2 rounded-lg bg-orange-900/20">
                <Pizza className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Available Items</p>
                <h3 className="text-2xl font-bold text-white">{availableItems}</h3>
                <p className="text-xs text-gray-400 mt-1">Ready to order</p>
              </div>
              <div className="p-2 rounded-lg bg-green-900/20">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Popular Items</p>
                <h3 className="text-2xl font-bold text-white">{popularItems}</h3>
                <p className="text-xs text-gray-400 mt-1">Customer favorites</p>
              </div>
              <div className="p-2 rounded-lg bg-red-900/20">
                <Flame className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Unavailable</p>
                <h3 className="text-2xl font-bold text-white">{unavailableItems}</h3>
                <p className="text-xs text-gray-400 mt-1">Not on menu</p>
              </div>
              <div className="p-2 rounded-lg bg-gray-800">
                <EyeOff className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Table Card */}
      <Card className="border-gray-800 shadow-lg bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl text-white">Pizza Menu</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search menu..." 
                  className="pl-9 bg-gray-800 border-gray-700 text-white w-full sm:w-[250px]"
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
                
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-full sm:w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800 text-white">
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Unavailable">Unavailable</SelectItem>
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
                  setAvailabilityFilter("All")
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
                  <TableHead className="text-gray-400 w-[250px]">Pizza</TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400 text-right">Price (M)</TableHead>
                  <TableHead className="text-gray-400 hidden md:table-cell">Ingredients</TableHead>
                  <TableHead className="text-gray-400 hidden lg:table-cell text-right">Prep Time</TableHead>
                  <TableHead className="text-gray-400 text-center">Status</TableHead>
                  <TableHead className="text-gray-400 text-center">Popular</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow key={item.id} className="border-gray-800 hover:bg-gray-800/30">
                      <TableCell className="font-medium">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center text-orange-500">
                            <Pizza className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{item.name}</div>
                            <div className="text-xs text-gray-400 mt-1 max-w-[200px] truncate">{item.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-white">₹{item.price.medium}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-[250px]">
                          {item.ingredients.slice(0, 3).map((ing, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700 text-xs">
                              {ing}
                            </Badge>
                          ))}
                          {item.ingredients.length > 3 && (
                            <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700 text-xs">
                              +{item.ingredients.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-right text-gray-300">{item.prepTime} mins</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={item.isAvailable ? 
                          "bg-green-900/20 text-green-400 border-green-900/50" : 
                          "bg-red-900/20 text-red-400 border-red-900/50"
                        }>
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.isPopular ? (
                          <div className="h-6 w-6 mx-auto bg-orange-900/20 rounded-full flex items-center justify-center">
                            <Flame className="h-4 w-4 text-orange-500" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-gray-600" />
                          </div>
                        )}
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
                              Edit Pizza
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                              {item.isAvailable ? (
                                <>
                                  <EyeOff className="h-4 w-4 mr-2" />
                                  Mark Unavailable
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="h-4 w-4 mr-2" />
                                  Mark Available
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                              {item.isPopular ? (
                                <>
                                  <Tag className="h-4 w-4 mr-2" />
                                  Remove Popular Tag
                                </>
                              ) : (
                                <>
                                  <Flame className="h-4 w-4 mr-2" />
                                  Mark as Popular
                                </>
                              )}
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
                    <TableCell colSpan={8} className="h-24 text-center text-gray-400">
                      No menu items found with the current filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}