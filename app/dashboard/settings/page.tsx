"use client"

import { useState } from "react"
import { Save, User, Bell, Shield, Palette, Globe, CreditCard, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Business Settings
    businessName: "PizzaCraft",
    businessEmail: "contact@pizzacraft.com",
    businessPhone: "+91 98765 43210",
    businessAddress: "123 MG Road, Bangalore, Karnataka 560001",
    businessDescription: "Authentic Italian pizzas made with fresh ingredients and Indian flavors",

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderAlerts: true,
    inventoryAlerts: true,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: "30",

    // Appearance Settings
    theme: "dark",
    language: "en",
    timezone: "Asia/Kolkata",

    // Payment Settings
    currency: "INR",
    taxRate: "18.00",

    // Operational Settings
    orderTimeout: "30",
    deliveryRadius: "10",
    minimumOrder: "₹200.00",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your business settings and preferences</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-card border-border">
            <TabsTrigger value="business" className="flex items-center gap-2 text-foreground">
              <User className="w-4 h-4" />
              Business
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 text-foreground">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 text-foreground">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2 text-foreground">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2 text-foreground">
              <CreditCard className="w-4 h-4" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="operational" className="flex items-center gap-2 text-foreground">
              <Globe className="w-4 h-4" />
              Operations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-6">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Business Information</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your business details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg bg-orange-100 text-orange-600">PC</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="bg-card border-border text-foreground">
                      Change Logo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">Recommended: 200x200px, PNG or JPG</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="businessName" className="text-foreground">
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      value={settings.businessName}
                      onChange={(e) => handleSettingChange("businessName", e.target.value)}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessEmail" className="text-foreground">
                      Business Email
                    </Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={settings.businessEmail}
                      onChange={(e) => handleSettingChange("businessEmail", e.target.value)}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessPhone" className="text-foreground">
                      Phone Number
                    </Label>
                    <Input
                      id="businessPhone"
                      value={settings.businessPhone}
                      onChange={(e) => handleSettingChange("businessPhone", e.target.value)}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessAddress" className="text-foreground">
                      Business Address
                    </Label>
                    <Input
                      id="businessAddress"
                      value={settings.businessAddress}
                      onChange={(e) => handleSettingChange("businessAddress", e.target.value)}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessDescription" className="text-foreground">
                    Business Description
                  </Label>
                  <Textarea
                    id="businessDescription"
                    value={settings.businessDescription}
                    onChange={(e) => handleSettingChange("businessDescription", e.target.value)}
                    rows={3}
                    className="bg-card border-border text-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Notification Preferences</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4 text-foreground">Notification Methods</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-foreground">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-foreground">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-foreground">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="border-border" />

                <div>
                  <h4 className="font-medium mb-4 text-foreground">Notification Types</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-foreground">Order Alerts</Label>
                        <p className="text-sm text-muted-foreground">New orders and order updates</p>
                      </div>
                      <Switch
                        checked={settings.orderAlerts}
                        onCheckedChange={(checked) => handleSettingChange("orderAlerts", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-foreground">Inventory Alerts</Label>
                        <p className="text-sm text-muted-foreground">Low stock and inventory updates</p>
                      </div>
                      <Switch
                        checked={settings.inventoryAlerts}
                        onCheckedChange={(checked) => handleSettingChange("inventoryAlerts", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Security Settings</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                    />
                    {settings.twoFactorAuth && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Enabled
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="sessionTimeout" className="text-foreground">
                    Session Timeout (minutes)
                  </Label>
                  <Select
                    value={settings.sessionTimeout}
                    onValueChange={(value) => handleSettingChange("sessionTimeout", value)}
                  >
                    <SelectTrigger className="w-full bg-card border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="border-border" />

                <div>
                  <h4 className="font-medium mb-4 text-red-600">Danger Zone</h4>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Appearance Settings</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Customize the look and feel of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="theme" className="text-foreground">
                    Theme
                  </Label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                    <SelectTrigger className="bg-card border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language" className="text-foreground">
                    Language
                  </Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                    <SelectTrigger className="bg-card border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone" className="text-foreground">
                    Timezone
                  </Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                    <SelectTrigger className="bg-card border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Asia/Kolkata">India Standard Time</SelectItem>
                      <SelectItem value="Asia/Mumbai">Mumbai Time</SelectItem>
                      <SelectItem value="Asia/Delhi">Delhi Time</SelectItem>
                      <SelectItem value="Asia/Bangalore">Bangalore Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Payment Settings</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Configure payment and billing options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currency" className="text-foreground">
                      Currency
                    </Label>
                    <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                      <SelectTrigger className="bg-card border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="taxRate" className="text-foreground">
                      GST Rate (%)
                    </Label>
                    <Input
                      id="taxRate"
                      value={settings.taxRate}
                      onChange={(e) => handleSettingChange("taxRate", e.target.value)}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operational" className="space-y-6">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Operational Settings</CardTitle>
                <CardDescription className="text-muted-foreground">Configure your business operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="orderTimeout" className="text-foreground">
                      Order Timeout (minutes)
                    </Label>
                    <Input
                      id="orderTimeout"
                      value={settings.orderTimeout}
                      onChange={(e) => handleSettingChange("orderTimeout", e.target.value)}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryRadius" className="text-foreground">
                      Delivery Radius (km)
                    </Label>
                    <Input
                      id="deliveryRadius"
                      value={settings.deliveryRadius}
                      onChange={(e) => handleSettingChange("deliveryRadius", e.target.value)}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimumOrder" className="text-foreground">
                      Minimum Order (₹)
                    </Label>
                    <Input
                      id="minimumOrder"
                      value={settings.minimumOrder}
                      onChange={(e) => handleSettingChange("minimumOrder", e.target.value)}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
