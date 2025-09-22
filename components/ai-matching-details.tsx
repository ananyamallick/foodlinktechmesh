"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, MapPin, Clock, Users, Utensils, Zap, Target, TrendingUp, CheckCircle, Star, Truck } from "lucide-react"

interface AiMatchingDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  matchData?: any
}

export function AiMatchingDetails({ open, onOpenChange, matchData }: AiMatchingDetailsProps) {
  const [analysisStep, setAnalysisStep] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analysisSteps = [
    { name: "Food Analysis", description: "Analyzing food type, quality, and nutritional value", icon: Utensils },
    { name: "Location Mapping", description: "Finding NGOs within optimal delivery radius", icon: MapPin },
    { name: "Need Matching", description: "Comparing food type with NGO requirements", icon: Target },
    { name: "Urgency Assessment", description: "Evaluating time-sensitive factors", icon: Clock },
    { name: "Capacity Check", description: "Verifying NGO capacity and availability", icon: Users },
    { name: "Route Optimization", description: "Calculating optimal delivery routes", icon: Truck },
    { name: "Final Scoring", description: "Computing match confidence scores", icon: Brain },
  ]

  const mockMatchResults = [
    {
      ngo: "Hope Kitchen",
      score: 96,
      factors: {
        foodMatch: 98,
        location: 95,
        urgency: 94,
        capacity: 97,
        history: 92,
      },
      details: {
        distance: "1.2 km",
        estimatedDelivery: "25 mins",
        capacity: "120/150 people",
        specialization: "Fresh produce distribution",
        successRate: "98%",
        avgResponseTime: "8 mins",
      },
      reasons: [
        "Perfect match for fresh vegetables",
        "High capacity availability",
        "Excellent location proximity",
        "Strong historical performance",
      ],
    },
    {
      ngo: "Community Shelter",
      score: 89,
      factors: {
        foodMatch: 85,
        location: 88,
        urgency: 92,
        capacity: 90,
        history: 89,
      },
      details: {
        distance: "2.1 km",
        estimatedDelivery: "35 mins",
        capacity: "80/100 people",
        specialization: "Emergency meal service",
        successRate: "94%",
        avgResponseTime: "12 mins",
      },
      reasons: [
        "Good food type compatibility",
        "Urgent need alignment",
        "Reliable service history",
        "Adequate capacity",
      ],
    },
    {
      ngo: "Children's Home",
      score: 85,
      factors: {
        foodMatch: 90,
        location: 78,
        urgency: 85,
        capacity: 88,
        history: 87,
      },
      details: {
        distance: "3.4 km",
        estimatedDelivery: "45 mins",
        capacity: "45/60 people",
        specialization: "Child nutrition programs",
        successRate: "96%",
        avgResponseTime: "15 mins",
      },
      reasons: [
        "Excellent for child nutrition",
        "High food quality standards",
        "Specialized dietary needs",
        "Good historical partnership",
      ],
    },
  ]

  useEffect(() => {
    if (open && !isAnalyzing) {
      setIsAnalyzing(true)
      setAnalysisStep(0)

      const interval = setInterval(() => {
        setAnalysisStep((prev) => {
          if (prev >= analysisSteps.length - 1) {
            clearInterval(interval)
            setIsAnalyzing(false)
            return prev
          }
          return prev + 1
        })
      }, 800)

      return () => clearInterval(interval)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Matching Analysis
          </DialogTitle>
          <DialogDescription>
            Real-time AI analysis and matching process for optimal food distribution
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="results">Match Results</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Real-time AI Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index <= analysisStep ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index < analysisStep ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : index === analysisStep && isAnalyzing ? (
                          <step.icon className="w-5 h-5 animate-pulse" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{step.name}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      {index <= analysisStep && (
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                          Complete
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                {isAnalyzing && (
                  <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="w-5 h-5 text-primary animate-pulse" />
                      <span className="font-medium text-primary">AI Processing...</span>
                    </div>
                    <Progress value={((analysisStep + 1) / analysisSteps.length) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">{analysisSteps[analysisStep]?.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockMatchResults.map((match, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{match.ngo}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="font-bold text-primary">{match.score}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Match Factors */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Match Factors</h5>
                      {Object.entries(match.factors).map(([factor, score]) => (
                        <div key={factor} className="flex items-center justify-between text-sm">
                          <span className="capitalize">{factor.replace(/([A-Z])/g, " $1")}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={score as number} className="w-16 h-1.5" />
                            <span className="text-xs font-medium w-8">{score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Details */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Key Details</h5>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Distance:</span>
                          <p className="font-medium">{match.details.distance}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ETA:</span>
                          <p className="font-medium">{match.details.estimatedDelivery}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Capacity:</span>
                          <p className="font-medium">{match.details.capacity}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Success Rate:</span>
                          <p className="font-medium text-success">{match.details.successRate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Top Reasons */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Why This Match?</h5>
                      <div className="space-y-1">
                        {match.reasons.slice(0, 2).map((reason, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-success" />
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Details
                      </Button>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        Select
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Matching Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Match Score</span>
                      <span className="font-bold text-primary">90.2%</span>
                    </div>
                    <Progress value={90.2} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Processing Speed</span>
                      <span className="font-bold text-success">2.3s</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-bold text-success">96.8%</span>
                    </div>
                    <Progress value={96.8} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      {
                        insight: "Peak demand detected",
                        description: "3 NGOs have urgent needs for fresh produce",
                        type: "warning",
                      },
                      {
                        insight: "Optimal timing",
                        description: "Current time is ideal for food distribution",
                        type: "success",
                      },
                      {
                        insight: "Route efficiency",
                        description: "Multiple deliveries can be combined",
                        type: "info",
                      },
                    ].map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            insight.type === "warning"
                              ? "bg-warning"
                              : insight.type === "success"
                                ? "bg-success"
                                : "bg-primary"
                          }`}
                        />
                        <div>
                          <h5 className="font-medium text-sm">{insight.insight}</h5>
                          <p className="text-xs text-muted-foreground">{insight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Batch Delivery",
                      description: "Combine with 2 other donations for 40% cost reduction",
                      impact: "High",
                      icon: Truck,
                    },
                    {
                      title: "Time Optimization",
                      description: "Deliver within next 2 hours for maximum freshness",
                      impact: "Medium",
                      icon: Clock,
                    },
                    {
                      title: "Route Planning",
                      description: "Use suggested route to save 15 minutes",
                      impact: "Medium",
                      icon: MapPin,
                    },
                    {
                      title: "Capacity Matching",
                      description: "Split donation between 2 NGOs for better utilization",
                      impact: "Low",
                      icon: Users,
                    },
                  ].map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg border">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <rec.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium">{rec.title}</h5>
                          <Badge
                            variant={
                              rec.impact === "High" ? "default" : rec.impact === "Medium" ? "secondary" : "outline"
                            }
                            className="text-xs"
                          >
                            {rec.impact}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="bg-primary hover:bg-primary/90">Proceed with Top Match</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
