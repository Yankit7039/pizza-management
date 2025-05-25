"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Search, Filter, Pizza, DollarSign, Clock, Star, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAppContext } from "@/lib/app-context"
import type { MenuItem } from "@/lib/app-context"

const categories = ["All", "Classic", "Vegetarian", "Non-Vegetarian", "Specialty"]

export default function MenuPage() {
  const { state, dispatch } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    category: "Classic",
    smallPrice: 0,
    mediumPrice: 0,
    largePrice: 0,
    ingredients: "",
    allergens: "",
    prepTime: 12,
    isAvailable: true,
  })
  const { toast } = useToast()

  const filteredItems = state.menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleAddItem = () => {
    if (!newItem.name || !newItem.description || !newItem.smallPrice) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const menuItem: MenuItem = {
      id: state.menuItems.length + 1,
      name: newItem.name,
      description: newItem.description,
      category: newItem.category,
      price: {
        small: newItem.smallPrice,
        medium: newItem.mediumPrice,
        large: newItem.largePrice,
      },
      ingredients: newItem.ingredients.split(",").map((i) => i.trim()),
      allergens: newItem.allergens.split(",").map((a) => a.trim()),
      calories: {
        small: Math.round(newItem.smallPrice * 8), // Rough estimate
        medium: Math.round(newItem.mediumPrice * 8),
        large: Math.round(newItem.largePrice * 8),
      },
      prepTime: newItem.prepTime,
      isAvailable: newItem.isAvailable,
      isPopular: false,
      image: "/placeholder.svg?height=200&width=200",
    }

    dispatch({ type: "ADD_MENU_ITEM", payload: menuItem })
    toast({
      title: "Menu Item Added",
      description: `${menuItem.name} has been added to the menu successfully.`,
    })
    setIsAddingItem(false)
    setNewItem({
      name: "",
      description: "",
      category: "Classic",
      smallPrice: 0,
      mediumPrice: 0,
      largePrice: 0,
      ingredients: "",
      allergens: "",
      prepTime: 12,
      isAvailable: true,
    })
  }

  const handleEditItem = () => {
    if (!editingItem) return

    const updatedItem: MenuItem = {
      ...editingItem,
      name: newItem.name || editingItem.name,
      description: newItem.description || editingItem.description,
      category: newItem.category || editingItem.category,
      price: {
        small: newItem.smallPrice || editingItem.price.small,
        medium: newItem.mediumPrice || editingItem.price.medium,
        large: newItem.largePrice || editingItem.price.large,
      },
      ingredients: newItem.ingredients ? newItem.ingredients.split(",").map((i) => i.trim()) : editingItem.ingredients,
      allergens: newItem.allergens ? newItem.allergens.split(",").map((a) => a.trim()) : editingItem.allergens,
      prepTime: newItem.prepTime || editingItem.prepTime,
    }

    dispatch({ type: "UPDATE_MENU_ITEM", payload: updatedItem })
    toast({
      title: "Menu Item Updated",
      description: `${updatedItem.name} has been updated successfully.`,
    })
    setEditingItem(null)
    setNewItem({
      name: "",
      description: "",
      category: "Classic",
      smallPrice: 0,
      mediumPrice: 0,
      largePrice: 0,
      ingredients: "",
      allergens: "",
      prepTime: 12,
      isAvailable: true,
    })
  }

  const handleDeleteItem = (itemId: number, itemName: string) => {
    dispatch({ type: "DELETE_MENU_ITEM", payload: itemId })
    toast({
      title: "Menu Item Deleted",
      description: `${itemName} has been removed from the menu.`,
      variant: "destructive",
    })
  }

  const toggleAvailability = (itemId: number) => {
    dispatch({ type: "TOGGLE_MENU_ITEM_AVAILABILITY", payload: itemId })
    const item = state.menuItems.find((i) => i.id === itemId)
    toast({
      title: item?.isAvailable ? "Item Disabled" : "Item Enabled",
      description: `Menu item is now ${item?.isAvailable ? "unavailable" : "available"} for orders.`,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Menu Management</h1>
          <p className="text-muted-foreground">Manage your pizza menu items and pricing</p>
        </div>
        <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>Create a new pizza for your menu</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Pizza Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Margherita Classic"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Classic">Classic</SelectItem>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                      <SelectItem value="Specialty">Specialty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the pizza ingredients and flavors..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="small-price">Small Price (₹) *</Label>
                  <Input
                    id="small-price"
                    type="number"
                    step="1"
                    placeholder="249"
                    value={newItem.smallPrice || ""}
                    onChange={(e) => setNewItem({ ...newItem, smallPrice: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="medium-price">Medium Price (₹) *</Label>
                  <Input
                    id="medium-price"
                    type="number"
                    step="1"
                    placeholder="349"
                    value={newItem.mediumPrice || ""}
                    onChange={(e) => setNewItem({ ...newItem, mediumPrice: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="large-price">Large Price (₹) *</Label>
                  <Input
                    id="large-price"
                    type="number"
                    step="1"
                    placeholder="449"
                    value={newItem.largePrice || ""}
                    onChange={(e) => setNewItem({ ...newItem, largePrice: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
                <Input
                  id="ingredients"
                  placeholder="Mozzarella, Tomato Sauce, Fresh Basil..."
                  value={newItem.ingredients}
                  onChange={(e) => setNewItem({ ...newItem, ingredients: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="allergens">Allergens (comma separated)</Label>
                  <Input
                    id="allergens"
                    placeholder="Dairy, Gluten..."
                    value={newItem.allergens}
                    onChange={(e) => setNewItem({ ...newItem, allergens: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="prep-time">Prep Time (minutes)</Label>
                  <Input
                    id="prep-time"
                    type="number"
                    placeholder="12"
                    value={newItem.prepTime || ""}
                    onChange={(e) => setNewItem({ ...newItem, prepTime: Number.parseInt(e.target.value) || 12 })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={newItem.isAvailable}
                  onCheckedChange={(checked) => setNewItem({ ...newItem, isAvailable: checked })}
                />
                <Label htmlFor="available">Available for orders</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>Add Item</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className={`border-0 shadow-sm transition-all hover:shadow-md ${!item.isAvailable ? "opacity-60" : ""}`}
          >
            <CardHeader className="pb-4">
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {item.isPopular && (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  <Badge variant={item.isAvailable ? "default" : "secondary"}>
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <Badge variant="outline">{item.category}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center p-2 bg-muted/50 rounded">
                  <p className="font-medium">₹{item.price.small}</p>
                  <p className="text-muted-foreground">Small</p>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <p className="font-medium">₹{item.price.medium}</p>
                  <p className="text-muted-foreground">Medium</p>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <p className="font-medium">₹{item.price.large}</p>
                  <p className="text-muted-foreground">Large</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {item.prepTime} min
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {item.calories.medium} cal
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch checked={item.isAvailable} onCheckedChange={() => toggleAvailability(item.id)} />
                  <span className="text-sm">
                    {item.isAvailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingItem(item)
                          setNewItem({
                            name: item.name,
                            description: item.description,
                            category: item.category,
                            smallPrice: item.price.small,
                            mediumPrice: item.price.medium,
                            largePrice: item.price.large,
                            ingredients: item.ingredients.join(", "),
                            allergens: item.allergens.join(", "),
                            prepTime: item.prepTime,
                            isAvailable: item.isAvailable,
                          })
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Menu Item</DialogTitle>
                        <DialogDescription>Update pizza details</DialogDescription>
                      </DialogHeader>
                      {editingItem && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="edit-name">Pizza Name</Label>
                              <Input
                                id="edit-name"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-category">Category</Label>
                              <Select
                                value={newItem.category}
                                onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Classic">Classic</SelectItem>
                                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                                  <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                                  <SelectItem value="Specialty">Specialty</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={newItem.description}
                              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="edit-small-price">Small Price (₹)</Label>
                              <Input
                                id="edit-small-price"
                                type="number"
                                step="1"
                                value={newItem.smallPrice || ""}
                                onChange={(e) =>
                                  setNewItem({ ...newItem, smallPrice: Number.parseInt(e.target.value) || 0 })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-medium-price">Medium Price (₹)</Label>
                              <Input
                                id="edit-medium-price"
                                type="number"
                                step="1"
                                value={newItem.mediumPrice || ""}
                                onChange={(e) =>
                                  setNewItem({ ...newItem, mediumPrice: Number.parseInt(e.target.value) || 0 })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-large-price">Large Price (₹)</Label>
                              <Input
                                id="edit-large-price"
                                type="number"
                                step="1"
                                value={newItem.largePrice || ""}
                                onChange={(e) =>
                                  setNewItem({ ...newItem, largePrice: Number.parseInt(e.target.value) || 0 })
                                }
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setEditingItem(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditItem}>Save Changes</Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={() => handleDeleteItem(item.id, item.name)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="text-center py-12">
            <Pizza className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No menu items found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
