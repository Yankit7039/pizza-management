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
  Users,
  Plus,
  Search,
  RefreshCw,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Download,
  FileText,
  ChevronDown,
  Filter,
  Star,
  Clock,
  ArrowUpRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample customers data
const customers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Connaught Place, Delhi",
    totalOrders: 48,
    totalSpent: 15240,
    lastOrder: "2025-05-18",
    status: "VIP",
    rating: 4.9,
    joinDate: "2024-09-15",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 87654 32109",
    address: "456 Park Avenue, Bandra, Mumbai",
    totalOrders: 32,
    totalSpent: 9850,
    lastOrder: "2025-05-20",
    status: "Regular",
    rating: 4.7,
    joinDate: "2024-10-22",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 76543 21098",
    address: "789 Lake View, Koramangala, Bangalore",
    totalOrders: 27,
    totalSpent: 8320,
    lastOrder: "2025-05-15",
    status: "Regular",
    rating: 4.5,
    joinDate: "2024-11-10",
  },
  {
    id: 4,
    name: "Deepika Singh",
    email: "deepika.singh@example.com",
    phone: "+91 65432 10987",
    address: "234 River Road, Salt Lake, Kolkata",
    totalOrders: 15,
    totalSpent: 4200,
    lastOrder: "2025-05-19",
    status: "New",
    rating: 4.2,
    joinDate: "2025-02-18",
  },
  {
    id: 5,
    name: "Vijay Reddy",
    email: "vijay.reddy@example.com",
    phone: "+91 54321 09876",
    address: "567 Hill View, Jubilee Hills, Hyderabad",
    totalOrders: 42,
    totalSpent: 13680,
    lastOrder: "2025-05-17",
    status: "VIP",
    rating: 4.8,
    joinDate: "2024-08-05",
  },
  {
    id: 6,
    name: "Ananya Gupta",
    email: "ananya.gupta@example.com",
    phone: "+91 43210 98765",
    address: "890 Beach Road, Panjim, Goa",
    totalOrders: 9,
    totalSpent: 2970,
    lastOrder: "2025-05-12",
    status: "New",
    rating: 4.1,
    joinDate: "2025-03-20",
  },
  {
    id: 7,
    name: "Rahul Joshi",
    email: "rahul.joshi@example.com",
    phone: "+91 32109 87654",
    address: "345 Mountain View, Deccan, Pune",
    totalOrders: 23,
    totalSpent: 6780,
    lastOrder: "2025-05-16",
    status: "Regular",
    rating: 4.6,
    joinDate: "2024-12-12",
  },
  {
    id: 8,
    name: "Sneha Desai",
    email: "sneha.desai@example.com",
    phone: "+91 21098 76543",
    address: "678 Valley Lane, Navrangpura, Ahmedabad",
    totalOrders: 37,
    totalSpent: 11450,
    lastOrder: "2025-05-14",
    status: "VIP",
    rating: 4.9,
    joinDate: "2024-07-28",
  },
]

// Status color mapping
const statusColors = {
  "VIP": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  "Regular": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  "New": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  
  // Filter customers based on search and status
  const filteredCustomers = customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    )
    .filter(customer => statusFilter === "All" || customer.status === statusFilter)

  // Get customer summary
  const totalCustomers = customers.length
  const vipCustomers = customers.filter(customer => customer.status === "VIP").length
  const newCustomers = customers.filter(customer => customer.status === "New").length
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0)

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Customer Management</h1>
          <p className="text-gray-400 mt-1">Manage your pizza shop's customers</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Enter the details of the new customer
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input id="name" placeholder="e.g., Rajesh Kumar" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" type="email" placeholder="e.g., rajesh@example.com" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input id="phone" placeholder="e.g., +91 98765 43210" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-white">Status</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <Input id="address" placeholder="e.g., 123 Main Street, Delhi" className="bg-gray-800 border-gray-700" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">Cancel</Button>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90">Add Customer</Button>
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

      {/* Customer Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Total Customers</p>
                <h3 className="text-2xl font-bold text-white">{totalCustomers}</h3>
                <p className="text-xs text-gray-400 mt-1">Across all categories</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-900/20">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">VIP Customers</p>
                <h3 className="text-2xl font-bold text-white">{vipCustomers}</h3>
                <p className="text-xs text-gray-400 mt-1">Your best customers</p>
              </div>
              <div className="p-2 rounded-lg bg-purple-900/20">
                <Star className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">New Customers</p>
                <h3 className="text-2xl font-bold text-white">{newCustomers}</h3>
                <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
              </div>
              <div className="p-2 rounded-lg bg-green-900/20">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 shadow-lg bg-gray-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-white">₹{totalRevenue.toLocaleString()}</h3>
                <p className="text-xs text-gray-400 mt-1">Lifetime value</p>
              </div>
              <div className="p-2 rounded-lg bg-orange-900/20">
                <ArrowUpRight className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Tabs */}
      <Card className="border-gray-800 shadow-lg bg-gray-900/50">
        <CardHeader className="pb-3">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <TabsList className="bg-gray-800 h-10">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                >
                  All Customers
                </TabsTrigger>
                <TabsTrigger 
                  value="vip" 
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                >
                  VIP
                </TabsTrigger>
                <TabsTrigger 
                  value="regular" 
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                >
                  Regular
                </TabsTrigger>
                <TabsTrigger 
                  value="new" 
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                >
                  New
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search customers..." 
                    className="pl-9 bg-gray-800 border-gray-700 text-white w-full sm:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("All")
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Reset filters</span>
                </Button>
              </div>
            </div>

            {/* All Customers Tab */}
            <TabsContent value="all" className="mt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-transparent">
                      <TableHead className="text-gray-400">Customer</TableHead>
                      <TableHead className="text-gray-400 hidden md:table-cell">Contact</TableHead>
                      <TableHead className="text-gray-400 hidden lg:table-cell">Address</TableHead>
                      <TableHead className="text-gray-400 text-right">Orders</TableHead>
                      <TableHead className="text-gray-400 text-right">Spent</TableHead>
                      <TableHead className="text-gray-400 hidden sm:table-cell">Last Order</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id} className="border-gray-800 hover:bg-gray-800/30">
                          <TableCell className="font-medium">
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                                {customer.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium text-white">{customer.name}</div>
                                <div className="text-xs text-gray-400">Rating: {customer.rating}/5</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex flex-col text-sm">
                              <div className="flex items-center text-gray-300">
                                <Mail className="h-3.5 w-3.5 mr-2 text-gray-500" />
                                {customer.email}
                              </div>
                              <div className="flex items-center text-gray-300 mt-1">
                                <Phone className="h-3.5 w-3.5 mr-2 text-gray-500" />
                                {customer.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-gray-300">
                            <div className="flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-2 flex-shrink-0 text-gray-500" />
                              <span className="truncate max-w-[200px]">{customer.address}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-white">{customer.totalOrders}</TableCell>
                          <TableCell className="text-right text-white">₹{customer.totalSpent.toLocaleString()}</TableCell>
                          <TableCell className="hidden sm:table-cell text-gray-300">
                            {formatDate(customer.lastOrder)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusColors[customer.status]}>
                              {customer.status}
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
                                  Edit Customer
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                                  <Star className="h-4 w-4 mr-2" />
                                  Change Status
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
                          No customers found with the current filters.
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
            </TabsContent>

            {/* Other tabs follow the same structure */}
            <TabsContent value="vip" className="mt-0">
              {/* Same table but filtered for VIP */}
            </TabsContent>
            <TabsContent value="regular" className="mt-0">
              {/* Same table but filtered for Regular */}
            </TabsContent>
            <TabsContent value="new" className="mt-0">
              {/* Same table but filtered for New */}
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  )
}