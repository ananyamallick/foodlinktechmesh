"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Camera,
  Users,
  MapPin,
  Clock,
  TrendingUp,
  Heart,
  Truck,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Bell,
  Settings,
  BarChart3,
  Leaf,
  Utensils,
  Building2,
  Target,
  Brain,
  Zap,
  Navigation,
  Package,
  Route,
  Trophy,
  Award,
} from "lucide-react"
import { FoodUploadModal } from "@/components/food-upload-modal"
import { NgoNeedsModal } from "@/components/ngo-needs-modal"
import { AiMatchingDetails } from "@/components/ai-matching-details"
import AIChatbot from "@/components/ai-chatbot"

export default function FoodLinkDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userType, setUserType] = useState<"donor" | "ngo">("donor")
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [needsModalOpen, setNeedsModalOpen] = useState(false)
  const [matchingModalOpen, setMatchingModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">FoodLink AI</h1>
                <p className="text-sm text-muted-foreground">Smart Food Donation Platform for India</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
                <Button
                  variant={userType === "donor" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setUserType("donor")}
                  className={`text-sm transition-all duration-200 ${
                    userType === "donor" 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-muted/80"
                  }`}
                >
                  <Utensils className="w-4 h-4 mr-2" />
                  Donor
                </Button>
                <Button
                  variant={userType === "ngo" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setUserType("ngo")}
                  className={`text-sm transition-all duration-200 ${
                    userType === "ngo" 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-muted/80"
                  }`}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  NGO
                </Button>
              </div>

              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>

              <Avatar className="w-8 h-8">
                <AvatarImage src="/professional-profile.png" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6 bg-muted/30 p-1 rounded-xl">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Matches</span>
            </TabsTrigger>
            <TabsTrigger value="logistics" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200">
              <Truck className="w-4 h-4" />
              <span className="hidden sm:inline">Logistics</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Impact</span>
            </TabsTrigger>
            <TabsTrigger value="needs" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Needs</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">1,247</span>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20 animate-pulse">
                      +12%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Meals donated this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Matches</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-success">23</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 animate-pulse">
                      Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Pending pickups</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">People Fed</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-warning">8,934</span>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20 animate-pulse">
                      +28%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lives impacted</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Waste Reduced</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-accent">2.4T</span>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20 animate-pulse">
                      +15%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Tons saved from waste</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: "New donation uploaded", time: "2 min ago", status: "success", icon: Camera },
                    { action: "Match found with Akshaya Patra", time: "5 min ago", status: "primary", icon: Heart },
                    { action: "Pickup scheduled", time: "12 min ago", status: "warning", icon: Truck },
                    { action: "Delivery completed", time: "1 hour ago", status: "success", icon: CheckCircle },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${activity.status}/10`}>
                        <activity.icon className={`w-4 h-4 text-${activity.status}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Active Locations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Akshaya Patra Kitchen", distance: "0.8 km", meals: 45, status: "active" },
                      { name: "Goonj Foundation", distance: "1.2 km", meals: 32, status: "pending" },
                      { name: "Robin Hood Army", distance: "2.1 km", meals: 28, status: "completed" },
                    ].map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-muted-foreground">{location.distance} away</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{location.meals} meals</p>
                          <Badge
                            variant={
                              location.status === "active"
                                ? "default"
                                : location.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {location.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Camera className="w-6 h-6 text-primary" />
                  Upload Food Donation
                </CardTitle>
                <CardDescription>
                  Take a photo of your surplus food and our AI will analyze it automatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center bg-muted/20">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Snap a photo of your food</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI will identify the food type, estimate freshness, and find the best NGO match
                  </p>
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setUploadModalOpen(true)}>
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h3 className="font-medium mb-1">AI Analysis</h3>
                    <p className="text-sm text-muted-foreground">Food type & freshness detection</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h3 className="font-medium mb-1">Smart Matching</h3>
                    <p className="text-sm text-muted-foreground">Find optimal NGO partners</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <h3 className="font-medium mb-1">Logistics</h3>
                    <p className="text-sm text-muted-foreground">Automated pickup & delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">AI Matches</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setMatchingModalOpen(true)}>
                  <Brain className="w-4 h-4 mr-2" />
                  AI Analysis
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Matching Engine</h3>
                      <p className="text-sm text-muted-foreground">
                        Advanced algorithms analyzing 15+ factors for optimal matches
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">96.2%</p>
                      <p className="text-xs text-muted-foreground">Avg Match Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">2.1s</p>
                      <p className="text-xs text-muted-foreground">Processing Time</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setMatchingModalOpen(true)}>
                      <Zap className="w-4 h-4 mr-2" />
                      View Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  id: 1,
                  ngo: "Akshaya Patra Foundation",
                  food: "Dal & Rice",
                  quantity: "25 kg",
                  match: 95,
                  distance: "1.2 km",
                  urgency: "high",
                  image: "/fresh-vegetables.png",
                  aiFactors: ["Perfect food match", "High capacity", "Optimal location"],
                },
                {
                  id: 2,
                  ngo: "Goonj Foundation",
                  food: "Chapati & Sabzi",
                  quantity: "40 portions",
                  match: 88,
                  distance: "2.1 km",
                  urgency: "medium",
                  image: "/cooked-rice.jpg",
                  aiFactors: ["Good compatibility", "Urgent need", "Reliable history"],
                },
                {
                  id: 3,
                  ngo: "Robin Hood Army",
                  food: "Paratha & Pickle",
                  quantity: "15 pieces",
                  match: 92,
                  distance: "0.8 km",
                  urgency: "high",
                  image: "/fresh-bread.png",
                  aiFactors: ["Child nutrition focus", "Quality standards", "Close proximity"],
                },
              ].map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={match.image || "/placeholder.svg"}
                        alt={match.food}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{match.ngo}</h3>
                          <Badge variant={match.urgency === "high" ? "destructive" : "secondary"} className="text-xs">
                            {match.urgency} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {match.food} • {match.quantity}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span>AI Match Score</span>
                            <div className="flex items-center gap-2">
                              <Brain className="w-3 h-3 text-primary" />
                              <span className="font-medium text-primary">{match.match}%</span>
                            </div>
                          </div>
                          <Progress value={match.match} className="h-2" />

                          <div className="flex flex-wrap gap-1 mt-2">
                            {match.aiFactors.map((factor, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs bg-primary/5 text-primary border-primary/20"
                              >
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {match.distance}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setMatchingModalOpen(true)}>
                              AI Details
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Accept Match
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Logistics Tab */}
          <TabsContent value="logistics" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Logistics & Delivery</h2>
                <p className="text-muted-foreground">Real-time tracking and route optimization</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Route className="w-4 h-4 mr-2" />
                  Optimize Routes
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Logistics Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Packages Processed</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">1,247</span>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      +15%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Packaging Cost</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-success">₹30</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      -12% saved
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Average per package</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Eco-Friendly Packaging</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-warning">87%</span>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      +8% improved
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Biodegradable materials</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Packaging Efficiency</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-accent">94%</span>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      Optimized
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Waste reduction achieved</p>
                </CardContent>
              </Card>
            </div>

            {/* Packaging Materials Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Packaging Materials Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-muted/20 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Packaging Distribution</h3>
                    <p className="text-muted-foreground mb-4">Real-time packaging material usage and costs</p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                        <span>1,247 Packages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-success"></div>
                        <span>87% Eco-Friendly</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-warning"></div>
                        <span>₹30 Avg Cost</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Packaging Operations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Packaging Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                        {
                        id: "PKG-001",
                        material: "Biodegradable Boxes",
                        quantity: 45,
                        cost: "₹1,250",
                        status: "packaging",
                        progress: 75,
                        eta: "2 hours",
                        supplier: "EcoPack India",
                      },
                      {
                        id: "PKG-002",
                        material: "Insulated Bags",
                        quantity: 32,
                        cost: "₹890",
                        status: "ordered",
                        progress: 25,
                        eta: "1 day",
                        supplier: "ThermoWrap Co.",
                      },
                      {
                        id: "PKG-003",
                        material: "Recycled Containers",
                        quantity: 28,
                        cost: "₹650",
                        status: "delivered",
                        progress: 100,
                        eta: "Completed",
                        supplier: "GreenBox Ltd",
                      },
                    ].map((package_item) => (
                      <Card key={package_item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{package_item.id}</h4>
                                <Badge
                                  variant={
                                    package_item.status === "delivered"
                                      ? "default"
                                      : package_item.status === "packaging"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {package_item.status.replace("_", " ")}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Supplier: {package_item.supplier}</p>
                            </div>
                            <div className="text-right text-sm">
                              <p className="font-medium">{package_item.eta}</p>
                              <p className="text-muted-foreground">{package_item.cost}</p>
                            </div>
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Package className="w-4 h-4 text-muted-foreground" />
                              <span>{package_item.material}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-muted-foreground">Quantity:</span>
                              <span>{package_item.quantity} units</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>{package_item.progress}%</span>
                            </div>
                            <Progress value={package_item.progress} className="h-2" />
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              Track Order
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              Contact Supplier
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Packaging Cost Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Brain className="w-5 h-5 text-primary" />
                            <h4 className="font-medium">AI Cost Optimization</h4>
                          </div>
                          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Optimizing packaging costs for 1,247 packages</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Cost Saved:</span>
                            <p className="font-medium text-success">₹12,450</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Efficiency:</span>
                            <p className="font-medium text-success">+18%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <h5 className="font-medium">Cost Optimization Suggestions</h5>
                      {[
                        {
                          title: "Bulk Material Purchase",
                          description: "Order packaging materials in bulk for 25% discount",
                          impact: "High",
                          savings: "₹8,500",
                        },
                        {
                          title: "Eco-Friendly Switch",
                          description: "Switch to biodegradable materials with better pricing",
                          impact: "Medium",
                          savings: "₹3,200",
                        },
                        {
                          title: "Supplier Negotiation",
                          description: "Renegotiate contracts with current suppliers",
                          impact: "Low",
                          savings: "₹1,800",
                        },
                      ].map((suggestion, index) => (
                        <Card key={index} className="hover:shadow-sm transition-shadow">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <h6 className="font-medium text-sm">{suggestion.title}</h6>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={
                                    suggestion.impact === "High"
                                      ? "default"
                                      : suggestion.impact === "Medium"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {suggestion.impact}
                                </Badge>
                                <span className="text-xs text-success font-medium">+{suggestion.savings}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              Apply Suggestion
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Packaging Suppliers Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Packaging Suppliers Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "EcoPack India",
                      avatar: "🌱",
                      rating: 4.9,
                      packages: 456,
                      onTime: 98,
                      status: "active",
                      costPerUnit: "₹28",
                    },
                    {
                      name: "ThermoWrap Co.",
                      avatar: "📦",
                      rating: 4.8,
                      packages: 342,
                      onTime: 96,
                      status: "active",
                      costPerUnit: "₹32",
                    },
                    {
                      name: "GreenBox Ltd",
                      avatar: "♻️",
                      rating: 4.7,
                      packages: 289,
                      onTime: 94,
                      status: "offline",
                      costPerUnit: "₹25",
                    },
                  ].map((supplier, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                            {supplier.avatar}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{supplier.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant={supplier.status === "active" ? "default" : "secondary"} className="text-xs">
                                {supplier.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">★ {supplier.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Packages:</span>
                            <p className="font-medium">{supplier.packages}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cost/Unit:</span>
                            <p className="font-medium text-success">{supplier.costPerUnit}</p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>On-time Delivery</span>
                            <span>{supplier.onTime}%</span>
                          </div>
                          <Progress value={supplier.onTime} className="h-2" />
                        </div>

                        <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-6">
            {/* Impact Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Food Saved</p>
                      <p className="text-3xl font-bold text-primary">30</p>
                      <p className="text-xs text-muted-foreground mt-1">kg this month</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">+23%</span>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">CO₂ Prevented</p>
                      <p className="text-3xl font-bold text-green-500">8.5</p>
                      <p className="text-xs text-muted-foreground mt-1">tons this month</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">+18%</span>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">People Fed</p>
                      <p className="text-3xl font-bold text-blue-500">1,423</p>
                      <p className="text-xs text-muted-foreground mt-1">individuals served</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">+31%</span>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Partners</p>
                      <p className="text-3xl font-bold text-orange-500">127</p>
                      <p className="text-xs text-muted-foreground mt-1">donors & NGOs</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">+12%</span>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Food Waste Reduction Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Food Waste Reduction Trend
                  </CardTitle>
                  <CardDescription>Monthly food saved from waste (kg) across India</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 relative px-4 py-4">
                    {/* Chart Area */}
                    <div className="relative h-full w-full">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-px bg-muted/30" />
                        ))}
                      </div>
                      
                      {/* Data Points and Line */}
                      <svg
                        className="absolute inset-0 w-full h-full text-primary"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        {/* Line Path */}
                        <path
                          d="M 8.33 75 L 25 70 L 41.67 65 L 58.33 50 L 75 40 L 91.67 25"
                          stroke="currentColor"
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          className="drop-shadow-sm"
                        />
                        
                        {/* Data Points */}
                        {[
                          { x: 8.33, y: 75, value: 1200 },
                          { x: 25, y: 70, value: 1450 },
                          { x: 41.67, y: 65, value: 1680 },
                          { x: 58.33, y: 50, value: 2100 },
                          { x: 75, y: 40, value: 2350 },
                          { x: 91.67, y: 25, value: 2847 },
                        ].map((point, index) => (
                          <g key={index}>
                            {/* Point Circle */}
                            <circle
                              cx={point.x}
                              cy={point.y}
                              r="3.2"
                              fill="currentColor"
                              className="drop-shadow-sm"
                            />
                            {/* Hover Circle */}
                            <circle
                              cx={point.x}
                              cy={point.y}
                              r="6"
                              fill="currentColor"
                              fillOpacity="0.1"
                              className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                            />
                          </g>
                        ))}
                      </svg>
                      
                      {/* Hover Value Tooltips */}
                      <div className="absolute inset-0">
                        {[
                          { x: 8.33, y: 75, value: 1200 },
                          { x: 25, y: 70, value: 1450 },
                          { x: 41.67, y: 65, value: 1680 },
                          { x: 58.33, y: 50, value: 2100 },
                          { x: 75, y: 40, value: 2350 },
                          { x: 91.67, y: 25, value: 2847 },
                        ].map((point, index) => (
                          <div
                            key={index}
                            className="absolute group"
                            style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              {point.value} kg
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Axis Months (Jan–Jun) */}
                      <div className="absolute inset-x-0 bottom-0 text-xs text-muted-foreground">
                        {[
                          { x: 8.33, month: 'Jan' },
                          { x: 25, month: 'Feb' },
                          { x: 41.67, month: 'Mar' },
                          { x: 58.33, month: 'Apr' },
                          { x: 75, month: 'May' },
                          { x: 91.67, month: 'Jun' },
                        ].map((m) => (
                          <span
                            key={m.month}
                            className="absolute"
                            style={{ left: `${m.x}%`, transform: 'translateX(-50%)', bottom: 0 }}
                          >
                            {m.month}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Saved This Year:</span>
                      <span className="font-bold text-primary">12,627 kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-primary" />
                    Environmental Impact
                  </CardTitle>
                  <CardDescription>CO₂ emissions prevented this year across India</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Carbon Footprint Reduction</span>
                      <span className="text-sm text-primary font-bold">-47.2 tons</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: "78%" }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">78% of annual target achieved</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Water Conservation</span>
                      <span className="text-sm text-primary font-bold">125,000L</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-primary/80 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: "65%" }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">65% of annual target achieved</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Land Use Efficiency</span>
                      <span className="text-sm text-primary font-bold">2.3 hectares</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-primary/90 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: "82%" }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">82% of annual target achieved</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Aesthetic Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Regional Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Regional Distribution
                  </CardTitle>
                  <CardDescription>Food donations across Indian states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { state: "Maharashtra", donations: 45, color: "bg-primary", width: "90%" },
                      { state: "Delhi", donations: 38, color: "bg-primary/80", width: "76%" },
                      { state: "Karnataka", donations: 32, color: "bg-primary/90", width: "64%" },
                      { state: "Tamil Nadu", donations: 28, color: "bg-primary/70", width: "56%" },
                      { state: "Gujarat", donations: 25, color: "bg-primary/60", width: "50%" },
                    ].map((region, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{region.state}</span>
                          <span className="text-muted-foreground">{region.donations} donations</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${region.color} transition-all duration-1000 ease-out`}
                            style={{ width: region.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Food Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-primary" />
                    Food Type Distribution
                  </CardTitle>
                  <CardDescription>Most donated food categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { food: "Dal & Rice", percentage: 35, color: "bg-primary" },
                        { food: "Chapati", percentage: 28, color: "bg-primary/80" },
                        { food: "Sabzi", percentage: 22, color: "bg-primary/90" },
                        { food: "Sweets", percentage: 15, color: "bg-primary/70" },
                      ].map((item, index) => (
                        <div key={index} className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 relative">
                            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                              <div
                                className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-sm`}
                              >
                                {item.percentage}%
                              </div>
                            </div>
                          </div>
                          <p className="text-xs font-medium">{item.food}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time-based Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Peak Activity Hours
                  </CardTitle>
                  <CardDescription>Donation activity throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { time: "6-8 AM", activity: 15, color: "bg-primary/20" },
                      { time: "8-10 AM", activity: 45, color: "bg-primary/40" },
                      { time: "10-12 PM", activity: 78, color: "bg-primary/60" },
                      { time: "12-2 PM", activity: 95, color: "bg-primary" },
                      { time: "2-4 PM", activity: 65, color: "bg-primary/80" },
                      { time: "4-6 PM", activity: 82, color: "bg-primary/90" },
                      { time: "6-8 PM", activity: 58, color: "bg-primary/70" },
                      { time: "8-10 PM", activity: 25, color: "bg-primary/30" },
                    ].map((hour, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-xs font-medium w-12">{hour.time}</span>
                        <div className="flex-1 bg-muted rounded-full h-2 relative overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${hour.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${hour.activity}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{hour.activity}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Impact Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Donors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Top Donors
                  </CardTitle>
                  <CardDescription>Most impactful food donors this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Taj Palace Hotel", donated: "342 kg", impact: "95%", avatar: "🍽️" },
                    { name: "Haldiram's", donated: "287 kg", impact: "89%", avatar: "🥖" },
                    { name: "Reliance Fresh", donated: "234 kg", impact: "82%", avatar: "🥬" },
                    { name: "Zomato Kitchens", donated: "198 kg", impact: "76%", avatar: "🍱" },
                  ].map((donor, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                        {donor.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{donor.name}</p>
                        <p className="text-xs text-muted-foreground">{donor.donated} donated</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-500">{donor.impact}</p>
                        <p className="text-xs text-muted-foreground">efficiency</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* NGO Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    NGO Impact
                  </CardTitle>
                  <CardDescription>Organizations making the biggest difference</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Akshaya Patra", served: "423 people", efficiency: "98%", avatar: "🏠" },
                    { name: "Goonj Foundation", served: "387 people", efficiency: "94%", avatar: "🤝" },
                    { name: "Robin Hood Army", served: "312 people", efficiency: "91%", avatar: "🏘️" },
                    { name: "Feeding India", served: "298 people", efficiency: "88%", avatar: "🌉" },
                  ].map((ngo, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-lg">
                        {ngo.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{ngo.name}</p>
                        <p className="text-xs text-muted-foreground">{ngo.served} served</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-blue-500">{ngo.efficiency}</p>
                        <p className="text-xs text-muted-foreground">efficiency</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription>Milestones and recognition</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "10,000 Meals Milestone",
                      description: "Reached 10K meals served",
                      date: "2 days ago",
                      icon: "🎯",
                      color: "text-green-500",
                    },
                    {
                      title: "Zero Waste Week",
                      description: "Perfect donation efficiency",
                      date: "1 week ago",
                      icon: "♻️",
                      color: "text-blue-500",
                    },
                    {
                      title: "Community Champion",
                      description: "Featured in local news",
                      date: "2 weeks ago",
                      icon: "📰",
                      color: "text-purple-500",
                    },
                    {
                      title: "Partnership Growth",
                      description: "100+ active partners",
                      date: "3 weeks ago",
                      icon: "🤝",
                      color: "text-orange-500",
                    },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Global Impact Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  India Impact Distribution
                </CardTitle>
                <CardDescription>Food donation activity across Indian states and cities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden border">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />

                  {/* Simulated map with activity indicators for Indian cities */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary">Mumbai</div>
                  </div>
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-primary/80 rounded-full animate-pulse shadow-lg">
                    <div className="absolute inset-0 bg-primary/80 rounded-full animate-ping opacity-75" />
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary">Delhi</div>
                  </div>
                  <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-primary rounded-full animate-pulse shadow-lg">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary">Bangalore</div>
                  </div>
                  <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-primary/90 rounded-full animate-pulse shadow-lg">
                    <div className="absolute inset-0 bg-primary/90 rounded-full animate-ping opacity-75" />
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary">Chennai</div>
                  </div>
                  <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-primary/70 rounded-full animate-pulse shadow-lg">
                    <div className="absolute inset-0 bg-primary/70 rounded-full animate-ping opacity-75" />
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary">Kolkata</div>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-card rounded-lg p-3 space-y-2 shadow-lg border">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-xs font-medium">High Activity (50+ donations)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary/80 rounded-full" />
                      <span className="text-xs font-medium">Medium Activity (20-49 donations)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary/60 rounded-full" />
                      <span className="text-xs font-medium">Low Activity (1-19 donations)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Needs Tab */}
          <TabsContent value="needs" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {userType === "ngo" ? "Food Requirements" : "NGO Needs Overview"}
                </h2>
                <p className="text-muted-foreground">
                  {userType === "ngo"
                    ? "Manage your organization's food needs and requirements"
                    : "View active NGO food requirements in your area"}
                </p>
              </div>
              {userType === "ngo" && (
                <Button onClick={() => setNeedsModalOpen(true)} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Requirement
                </Button>
              )}
            </div>

            {userType === "ngo" ? (
              <>
                {/* NGO Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Requests</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">8</span>
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                          +2 today
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Food requirements posted</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Matches Found</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-success">15</span>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          Available
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Potential food donations</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">People Served</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-warning">450</span>
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                          This week
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Meals provided</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Active Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Your Active Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          foodTypes: ["Fresh Vegetables", "Fruits"],
                          servings: 120,
                          urgency: "high",
                          matches: 3,
                          timePosted: "2 hours ago",
                          deadline: "Today 6:00 PM",
                        },
                        {
                          id: 2,
                          foodTypes: ["Cooked Meals", "Rice & Grains"],
                          servings: 80,
                          urgency: "medium",
                          matches: 5,
                          timePosted: "1 day ago",
                          deadline: "Tomorrow 12:00 PM",
                        },
                        {
                          id: 3,
                          foodTypes: ["Bread & Bakery"],
                          servings: 60,
                          urgency: "low",
                          matches: 2,
                          timePosted: "3 days ago",
                          deadline: "Dec 28, 2024",
                        },
                      ].map((requirement) => (
                        <Card key={requirement.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex flex-wrap gap-1">
                                    {requirement.foodTypes.map((type) => (
                                      <Badge key={type} variant="secondary" className="text-xs">
                                        {type}
                                      </Badge>
                                    ))}
                                  </div>
                                  <Badge
                                    variant={
                                      requirement.urgency === "high"
                                        ? "destructive"
                                        : requirement.urgency === "medium"
                                          ? "secondary"
                                          : "outline"
                                    }
                                    className="text-xs"
                                  >
                                    {requirement.urgency} priority
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Servings:</span>
                                    <p className="font-medium">{requirement.servings} people</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Matches:</span>
                                    <p className="font-medium text-primary">{requirement.matches} available</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Posted:</span>
                                    <p className="font-medium">{requirement.timePosted}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Deadline:</span>
                                    <p className="font-medium">{requirement.deadline}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button size="sm" className="bg-primary hover:bg-primary/90">
                                  View Matches
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Donor View of NGO Needs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[
                      {
                      ngo: "Akshaya Patra Foundation",
                      needs: ["Dal & Rice", "Chapati"],
                      servings: 120,
                      urgency: "high",
                      distance: "1.2 km",
                      deadline: "Today 6:00 PM",
                      description: "Urgent need for traditional Indian meals for evening service",
                    },
                    {
                      ngo: "Goonj Foundation",
                      needs: ["Cooked Meals", "Roti"],
                      servings: 80,
                      urgency: "medium",
                      distance: "2.1 km",
                      deadline: "Tomorrow 12:00 PM",
                      description: "Regular meal service for underprivileged communities",
                    },
                    {
                      ngo: "Robin Hood Army",
                      needs: ["Milk & Fruits", "Biscuits"],
                      servings: 45,
                      urgency: "low",
                      distance: "3.4 km",
                      deadline: "Dec 28, 2024",
                      description: "Nutritious snacks for children in slums",
                    },
                    {
                      ngo: "Feeding India",
                      needs: ["Khichdi", "Soft Foods"],
                      servings: 65,
                      urgency: "medium",
                      distance: "1.8 km",
                      deadline: "Tomorrow 5:00 PM",
                      description: "Easy-to-digest meals for elderly and sick",
                    },
                  ].map((need, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{need.ngo}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{need.distance} away</span>
                            </div>
                          </div>
                          <Badge
                            variant={
                              need.urgency === "high"
                                ? "destructive"
                                : need.urgency === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {need.urgency} priority
                          </Badge>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <span className="text-xs text-muted-foreground">Food Needed</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {need.needs.map((foodType) => (
                                <Badge key={foodType} variant="secondary" className="text-xs">
                                  {foodType}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-xs text-muted-foreground">Servings Needed</span>
                              <p className="font-medium">{need.servings} people</p>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Deadline</span>
                              <p className="font-medium">{need.deadline}</p>
                            </div>
                          </div>

                          <div>
                            <span className="text-xs text-muted-foreground">Description</span>
                            <p className="text-sm">{need.description}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Contact NGO
                          </Button>
                          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                            Offer Food
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Modal Component */}
      <FoodUploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />

      {/* NGO Needs Modal */}
      <NgoNeedsModal open={needsModalOpen} onOpenChange={setNeedsModalOpen} />

      {/* AI Matching Details Modal */}
      <AiMatchingDetails open={matchingModalOpen} onOpenChange={setMatchingModalOpen} />

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}
