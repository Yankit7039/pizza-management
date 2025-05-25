"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Download, ArrowUpDown, Eye, X, MapPin, Clock, Phone, Plus, Truck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAppContext } from "@/lib/app-context"
import type { Order } from "@/lib/app-context"

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400",
  Preparing: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400",
  "Out for Delivery": "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400",
  Delivered: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400",
  Cancelled: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400",
}

export default function OrdersPage() {
  const { state, dispatch } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [isAddingOrder, setIsAddingOrder] = useState(false)
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    pizzaType: "",
    quantity: 1,
    size: "Medium",
    notes: "",
    paymentMethod: "UPI",
  })
  const { toast } = useToast()

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = state.orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField as keyof typeof a]
        let bValue = b[sortField as keyof typeof b]

        if (sortField === "orderDate") {
          aValue = new Date(aValue as string).getTime()
          bValue = new Date(bValue as string).getTime()
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [state.orders, searchTerm, statusFilter, sortField, sortDirection])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { id: orderId, status: newStatus } })
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    })
  }

  const handleCancelOrder = (orderId: string) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { id: orderId, status: "Cancelled" } })
    toast({
      title: "Order Cancelled",
      description: `Order ${orderId} has been cancelled`,
      variant: "destructive",
    })
  }

  const handleAddOrder = () => {
    if (!newOrder.customerName || !newOrder.customerPhone || !newOrder.pizzaType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const order: Order = {
      id: `PZA${String(state.orders.length + 1).padStart(3, "0")}`,
      ...newOrder,
      orderDate: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "Pending",
      total: getPizzaPrice(newOrder.pizzaType, newOrder.size) * newOrder.quantity,
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString().slice(0, 16).replace("T", " "),
      driver: null,
    }

    dispatch({ type: "ADD_ORDER", payload: order })
    toast({
      title: "Order Added",
      description: `New order ${order.id} has been created successfully`,
    })
    setIsAddingOrder(false)
    setNewOrder({
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      pizzaType: "",
      quantity: 1,
      size: "Medium",
      notes: "",
      paymentMethod: "UPI",
    })
  }

  const getPizzaPrice = (pizzaType: string, size: string) => {
    const menuItem = state.menuItems.find((item) => item.name === pizzaType)
    if (!menuItem) return 0

    switch (size) {
      case "Small":
        return menuItem.price.small
      case "Medium":
        return menuItem.price.medium
      case "Large":
        return menuItem.price.large
      default:
        return menuItem.price.medium
    }
  }

  const exportToCSV = (orders: Order[]) => {
    const headers = ["Order ID", "Customer Name", "Pizza Type", "Quantity", "Size", "Order Date", "Status", "Total (₹)"]
    const csvContent = [
      headers.join(","),
      ...orders.map((order) =>
        [
          order.id,
          `"${order.customerName}"`,
          `"${order.pizzaType}"`,
          order.quantity,
          order.size,
          `"${order.orderDate}"`,
          `"${order.status}"`,
          order.total,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `pizza-orders-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const statusCounts = useMemo(() => {
    return state.orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  }, [state.orders])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
          <p className="text-muted-foreground">Track and manage all your pizza orders</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddingOrder} onOpenChange={setIsAddingOrder}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>Add a new pizza order to the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer-name">Customer Name *</Label>
                    <Input
                      id="customer-name"
                      value={newOrder.customerName}
                      onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-phone">Phone Number *</Label>
                    <Input
                      id="customer-phone"
                      value={newOrder.customerPhone}
                      onChange={(e) => setNewOrder({ ...newOrder, customerPhone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    value={newOrder.customerAddress}
                    onChange={(e) => setNewOrder({ ...newOrder, customerAddress: e.target.value })}
                    placeholder="Enter delivery address"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="pizza-type">Pizza Type *</Label>
                    <Select
                      value={newOrder.pizzaType}
                      onValueChange={(value) => setNewOrder({ ...newOrder, pizzaType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pizza" />
                      </SelectTrigger>
                      <SelectContent>
                        {state.menuItems
                          .filter((item) => item.isAvailable)
                          .map((item) => (
                            <SelectItem key={item.id} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Select value={newOrder.size} onValueChange={(value) => setNewOrder({ ...newOrder, size: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Small">Small</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={newOrder.quantity}
                      onChange={(e) => setNewOrder({ ...newOrder, quantity: Number.parseInt(e.target.value) || 1 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select
                      value={newOrder.paymentMethod}
                      onValueChange={(value) => setNewOrder({ ...newOrder, paymentMethod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Total Amount</Label>
                    <div className="text-2xl font-bold text-green-600">
                      ₹{getPizzaPrice(newOrder.pizzaType, newOrder.size) * newOrder.quantity}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Special Notes</Label>
                  <Textarea
                    id="notes"
                    value={newOrder.notes}
                    onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                    placeholder="Any special instructions..."
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingOrder(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOrder}>Create Order</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={() => exportToCSV(filteredAndSortedOrders)} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card key={status} className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{count}</div>
              <div className="text-sm text-muted-foreground">{status}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Order ID, Customer, or Pizza Type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Preparing">Preparing</SelectItem>
                <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Orders ({filteredAndSortedOrders.length})</CardTitle>
          <CardDescription>
            {searchTerm || statusFilter !== "all"
              ? `Showing ${filteredAndSortedOrders.length} of ${state.orders.length} orders`
              : `All orders`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("id")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Order ID
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("customerName")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Customer
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">Pizza Details</TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("orderDate")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Order Date
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Total</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-primary">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.pizzaType}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.quantity}x {order.size}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(order.orderDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[order.status as keyof typeof statusColors]} variant="secondary">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">₹{order.total}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
                              <DialogDescription>Complete information about this order</DialogDescription>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Customer Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Name:</strong> {selectedOrder.customerName}
                                      </p>
                                      <p className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        {selectedOrder.customerPhone}
                                      </p>
                                      <p className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 mt-0.5" />
                                        {selectedOrder.customerAddress}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">Order Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Pizza:</strong> {selectedOrder.pizzaType}
                                      </p>
                                      <p>
                                        <strong>Size:</strong> {selectedOrder.size}
                                      </p>
                                      <p>
                                        <strong>Quantity:</strong> {selectedOrder.quantity}
                                      </p>
                                      <p>
                                        <strong>Total:</strong> ₹{selectedOrder.total}
                                      </p>
                                      <p>
                                        <strong>Payment:</strong> {selectedOrder.paymentMethod}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Delivery Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <strong>Estimated:</strong>{" "}
                                        {selectedOrder.estimatedDelivery
                                          ? new Date(selectedOrder.estimatedDelivery).toLocaleString()
                                          : "N/A"}
                                      </p>
                                      {selectedOrder.actualDelivery && (
                                        <p className="flex items-center gap-2">
                                          <Clock className="w-4 h-4" />
                                          <strong>Delivered:</strong>{" "}
                                          {new Date(selectedOrder.actualDelivery).toLocaleString()}
                                        </p>
                                      )}
                                      {selectedOrder.driver && (
                                        <p className="flex items-center gap-2">
                                          <Truck className="w-4 h-4" />
                                          <strong>Driver:</strong> {selectedOrder.driver}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {selectedOrder.notes && (
                                    <div>
                                      <h4 className="font-semibold mb-2">Special Notes</h4>
                                      <p className="text-sm bg-muted p-3 rounded-lg">{selectedOrder.notes}</p>
                                    </div>
                                  )}

                                  <div>
                                    <h4 className="font-semibold mb-2">Status Actions</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedOrder.status === "Pending" && (
                                        <Button
                                          size="sm"
                                          onClick={() => handleStatusUpdate(selectedOrder.id, "Preparing")}
                                        >
                                          Start Preparing
                                        </Button>
                                      )}
                                      {selectedOrder.status === "Preparing" && (
                                        <Button
                                          size="sm"
                                          onClick={() => handleStatusUpdate(selectedOrder.id, "Out for Delivery")}
                                        >
                                          Send for Delivery
                                        </Button>
                                      )}
                                      {selectedOrder.status === "Out for Delivery" && (
                                        <Button
                                          size="sm"
                                          onClick={() => handleStatusUpdate(selectedOrder.id, "Delivered")}
                                        >
                                          Mark Delivered
                                        </Button>
                                      )}
                                      {(selectedOrder.status === "Pending" || selectedOrder.status === "Preparing") && (
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() => handleCancelOrder(selectedOrder.id)}
                                        >
                                          Cancel Order
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {(order.status === "Pending" || order.status === "Preparing") && (
                          <Button variant="outline" size="sm" onClick={() => handleCancelOrder(order.id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAndSortedOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">No orders found</div>
              <div className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
