"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock events data
const events = [
  {
    id: 1,
    title: "Staff Meeting",
    date: "2024-01-15",
    time: "09:00",
    duration: "1 hour",
    type: "meeting",
    attendees: 8,
    location: "Main Office",
    description: "Weekly team meeting to discuss operations and updates",
  },
  {
    id: 2,
    title: "Inventory Delivery",
    date: "2024-01-15",
    time: "14:00",
    duration: "30 minutes",
    type: "delivery",
    attendees: 2,
    location: "Storage Room",
    description: "Fresh ingredients delivery from suppliers",
  },
  {
    id: 3,
    title: "Marketing Campaign Review",
    date: "2024-01-16",
    time: "11:00",
    duration: "2 hours",
    type: "meeting",
    attendees: 5,
    location: "Conference Room",
    description: "Review Q1 marketing strategies and campaigns",
  },
  {
    id: 4,
    title: "Equipment Maintenance",
    date: "2024-01-17",
    time: "08:00",
    duration: "3 hours",
    type: "maintenance",
    attendees: 3,
    location: "Kitchen",
    description: "Scheduled maintenance for pizza ovens and equipment",
  },
  {
    id: 5,
    title: "Customer Feedback Session",
    date: "2024-01-18",
    time: "15:00",
    duration: "1.5 hours",
    type: "meeting",
    attendees: 6,
    location: "Main Office",
    description: "Review customer feedback and improvement suggestions",
  },
]

const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "delivery":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getEventsForDate = (date: string) => {
    return events.filter((event) => event.date === date)
  }

  const todayEvents = getEventsForDate("2024-01-15")
  const upcomingEvents = events.slice(0, 5)

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar & Events</h1>
            <p className="text-muted-foreground mt-1">Manage your schedule and business events</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={viewMode} onValueChange={(value: "month" | "week" | "day") => setViewMode(value)}>
              <SelectTrigger className="w-32 bg-card border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Create New Event</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Add a new event to your calendar
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-foreground">
                      Event Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter event title"
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-foreground">
                        Date
                      </Label>
                      <Input id="date" type="date" className="bg-card border-border text-foreground" />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-foreground">
                        Time
                      </Label>
                      <Input id="time" type="time" className="bg-card border-border text-foreground" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-foreground">
                      Event Type
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-card border-border text-foreground">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-foreground">
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="Event location"
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-foreground">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Event description"
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Create Event</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-foreground">
                    <Calendar className="w-5 h-5 mr-2" />
                    January 2024
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="bg-card border-border text-foreground">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-card border-border text-foreground">
                      Today
                    </Button>
                    <Button variant="outline" size="sm" className="bg-card border-border text-foreground">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 6 // Adjust for calendar start
                    const date = `2024-01-${day.toString().padStart(2, "0")}`
                    const dayEvents = getEventsForDate(date)
                    const isToday = day === 15
                    const isValidDay = day > 0 && day <= 31

                    return (
                      <div
                        key={i}
                        className={`
                          min-h-[80px] p-1 border border-border cursor-pointer hover:bg-accent
                          ${isToday ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800" : ""}
                          ${!isValidDay ? "text-muted-foreground" : ""}
                        `}
                        onClick={() => isValidDay && setSelectedDate(date)}
                      >
                        {isValidDay && (
                          <>
                            <div className={`text-sm font-medium ${isToday ? "text-orange-600" : "text-foreground"}`}>
                              {day}
                            </div>
                            <div className="space-y-1 mt-1">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className="text-xs p-1 rounded bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 truncate"
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Today's Events</CardTitle>
                <CardDescription className="text-muted-foreground">January 15, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayEvents.length > 0 ? (
                    todayEvents.map((event) => (
                      <div key={event.id} className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm text-foreground">{event.title}</h4>
                          <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {event.time} ({event.duration})
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {event.attendees} attendees
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No events scheduled for today</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Upcoming Events</CardTitle>
                <CardDescription className="text-muted-foreground">Next 5 events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-foreground">{event.title}</h4>
                        <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
