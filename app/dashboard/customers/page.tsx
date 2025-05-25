"use client"

import { useState } from "react"
import { Search, Plus, Filter, MoreHorizontal, Phone, Mail, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock customer data
const customers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    address: "123 CP Block, Connaught Place, New Delhi, Delhi 110001",
    totalOrders: 24,
    totalSpent: 12450.5,
    lastOrder: "2024-01-15",
    status: "VIP",
    rating: 5,
    joinDate: "2023-03-15",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    address: "456 Lajpat Nagar, South Delhi, Delhi 110024",
    totalOrders: 18,
    totalSpent: 8247.75,
    lastOrder: "2024-01-12",
    status: "Regular",
    rating: 4,
    joinDate: "2023-05-22",
  },
  {
    id: 3,
    name: "Amit Gupta",
    email: "amit.gupta@email.com",
    phone: "+91 76543 21098",
    address: "789 Karol Bagh, Central Delhi, Delhi 110005",
    totalOrders: 8,
    totalSpent: 3956.25,
    lastOrder: "2024-01-10",
    status: "New",
    rating: 4,
    joinDate: "2023-12-01",
  },
  {
    id: 4,
    name: "Sneha Agarwal",
    email: "sneha.agarwal@email.com",
    phone: "+91 65432 10987",
    address: "321 Dwarka Sector 12, West Delhi, Delhi 110075",
    totalOrders: 35,
    totalSpent: 18742.8,
    lastOrder: "2024-01-14",
    status: "VIP",
    rating: 5,
    joinDate: "2023-01-10",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof customers)[0] | null>(null)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Regular":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "New":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Customer Management</h1>
          <p className="text-muted-foreground mt-1">Manage your customer relationships and track their orders</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">89</div>
            <p className="text-xs text-green-600 mt-1">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">₹650.50</div>
            <p className="text-xs text-green-600 mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customer Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">87%</div>
            <p className="text-xs text-green-600 mt-1">+3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-foreground">Customer List</CardTitle>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search customers..."
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
                  <TableHead className="text-foreground">Customer</TableHead>
                  <TableHead className="text-foreground hidden sm:table-cell">Contact</TableHead>
                  <TableHead className="text-foreground">Orders</TableHead>
                  <TableHead className="text-foreground">Total Spent</TableHead>
                  <TableHead className="text-foreground hidden md:table-cell">Status</TableHead>
                  <TableHead className="text-foreground hidden lg:table-cell">Last Order</TableHead>
                  <TableHead className="text-foreground hidden lg:table-cell">Rating</TableHead>
                  <TableHead className="text-right text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="border-border/50 hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.name}`} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground text-sm sm:text-base">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">ID: #{customer.id}</div>
                          <div className="sm:hidden text-xs text-muted-foreground">{customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-3 h-3 mr-1" />
                          <span className="truncate max-w-[150px]">{customer.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-3 h-3 mr-1" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">{customer.totalOrders}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">₹{customer.totalSpent.toFixed(2)}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-sm text-muted-foreground">{customer.lastOrder}</div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < customer.rating ? "text-yellow-400 fill-current" : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border-border">
                          <DropdownMenuLabel className="text-foreground">Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => setSelectedCustomer(customer)}
                            className="text-foreground hover:bg-muted"
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-foreground hover:bg-muted">View Orders</DropdownMenuItem>
                          <DropdownMenuItem className="text-foreground hover:bg-muted">Send Message</DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border" />
                          <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                            Delete Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-2xl bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Customer Details</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              View and manage customer information
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedCustomer.name}`} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedCustomer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{selectedCustomer.name}</h3>
                  <Badge className={getStatusColor(selectedCustomer.status)}>{selectedCustomer.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="mt-1 text-foreground">{selectedCustomer.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  <p className="mt-1 text-foreground">{selectedCustomer.phone}</p>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                  <p className="mt-1 text-foreground">{selectedCustomer.address}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Total Orders</Label>
                  <p className="mt-1 font-semibold text-foreground">{selectedCustomer.totalOrders}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Total Spent</Label>
                  <p className="mt-1 font-semibold text-foreground">₹{selectedCustomer.totalSpent.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Join Date</Label>
                  <p className="mt-1 text-foreground">{selectedCustomer.joinDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Last Order</Label>
                  <p className="mt-1 text-foreground">{selectedCustomer.lastOrder}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
