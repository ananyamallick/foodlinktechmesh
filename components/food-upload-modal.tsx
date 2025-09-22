"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Upload, Loader2, CheckCircle, Clock, MapPin, Users, Utensils, Calendar } from "lucide-react"

interface FoodUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FoodUploadModal({ open, onOpenChange }: FoodUploadModalProps) {
  const [step, setStep] = useState<"upload" | "analyzing" | "results" | "confirm">("upload")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setStep("analyzing")

        // Simulate AI analysis
        let progress = 0
        const interval = setInterval(() => {
          progress += 10
          setAnalysisProgress(progress)
          if (progress >= 100) {
            clearInterval(interval)
            setTimeout(() => setStep("results"), 500)
          }
        }, 200)
      }
      reader.readAsDataURL(file)
    }
  }

  const mockAnalysisResults = {
    foodType: "Dal & Rice with Sabzi",
    confidence: 94,
    freshness: "Excellent",
    estimatedShelfLife: "3-4 days",
    estimatedWeight: "12-15 kg",
    servings: "40-50 people",
    nutritionalValue: "High",
    allergens: ["None detected"],
    bestMatches: [
      { ngo: "Akshaya Patra Foundation", match: 96, distance: "1.2 km", urgency: "High" },
      { ngo: "Goonj Foundation", match: 89, distance: "2.1 km", urgency: "Medium" },
      { ngo: "Robin Hood Army", match: 85, distance: "3.4 km", urgency: "Low" },
    ],
  }

  const resetModal = () => {
    setStep("upload")
    setUploadedImage(null)
    setAnalysisProgress(0)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open)
        if (!open) resetModal()
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Food Donation Upload
          </DialogTitle>
          <DialogDescription>Upload a photo of your surplus food for AI analysis and matching</DialogDescription>
        </DialogHeader>

        {step === "upload" && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Food Photo</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Take a clear photo of your surplus food. Our AI will analyze it automatically.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <label htmlFor="camera-input" className="cursor-pointer">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </label>
                </Button>
                <Button variant="outline" asChild>
                  <label htmlFor="file-input" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload from Gallery
                  </label>
                </Button>
              </div>

              <input
                id="camera-input"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageUpload}
              />
              <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Utensils className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">Food Recognition</h4>
                  <p className="text-sm text-muted-foreground">AI identifies food type and quality</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-5 h-5 text-success" />
                  </div>
                  <h4 className="font-medium mb-1">Freshness Analysis</h4>
                  <p className="text-sm text-muted-foreground">Estimates shelf life and quality</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-5 h-5 text-warning" />
                  </div>
                  <h4 className="font-medium mb-1">Smart Matching</h4>
                  <p className="text-sm text-muted-foreground">Finds best NGO partners nearby</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === "analyzing" && (
          <div className="space-y-6 py-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyzing Your Food</h3>
              <p className="text-muted-foreground mb-6">Our AI is processing the image...</p>

              <div className="max-w-md mx-auto space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Analysis Progress</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>
            </div>

            {uploadedImage && (
              <div className="flex justify-center">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded food"
                  className="max-w-sm rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        )}

        {step === "results" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
              <CheckCircle className="w-6 h-6 text-success" />
              <div>
                <h3 className="font-semibold text-success">Analysis Complete!</h3>
                <p className="text-sm text-success/80">Your food has been successfully analyzed</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Food Analysis Results</h4>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Food Type</span>
                      <Badge variant="secondary">{mockAnalysisResults.foodType}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence</span>
                      <span className="text-sm text-primary font-medium">{mockAnalysisResults.confidence}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Freshness</span>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        {mockAnalysisResults.freshness}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Shelf Life</span>
                      <span className="text-sm">{mockAnalysisResults.estimatedShelfLife}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Est. Weight</span>
                      <span className="text-sm">{mockAnalysisResults.estimatedWeight}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Can Serve</span>
                      <span className="text-sm text-primary font-medium">{mockAnalysisResults.servings}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Best NGO Matches</h4>

                <div className="space-y-3">
                  {mockAnalysisResults.bestMatches.map((match, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{match.ngo}</h5>
                          <Badge
                            variant={
                              match.urgency === "High"
                                ? "destructive"
                                : match.urgency === "Medium"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {match.urgency}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {match.distance}
                          </div>
                          <span className="text-primary font-medium">{match.match}% match</span>
                        </div>
                        <Progress value={match.match} className="h-1.5" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={resetModal}>
                Upload Another
              </Button>
              <Button onClick={() => setStep("confirm")} className="bg-primary hover:bg-primary/90">
                Proceed to Donation
              </Button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Confirm Donation Details</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pickup-time">Preferred Pickup Time</Label>
                  <Input id="pickup-time" type="datetime-local" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" placeholder="+1 (555) 123-4567" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="location">Pickup Location</Label>
                  <Input id="location" placeholder="123 Main St, City, State" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any special instructions for pickup..." className="mt-1" rows={3} />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Selected NGO</h4>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold">Akshaya Patra Foundation</h5>
                      <Badge className="bg-primary/10 text-primary border-primary/20">96% match</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>1.2 km away</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>Serves 200+ people daily</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Available for pickup today</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 rounded-lg bg-muted/30">
                  <h5 className="font-medium mb-2">Donation Summary</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Food Type:</span>
                      <span>Fresh Mixed Vegetables</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Servings:</span>
                      <span className="text-primary font-medium">40-50 people</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shelf Life:</span>
                      <span>3-4 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setStep("results")}>
                Back
              </Button>
              <Button onClick={() => onOpenChange(false)} className="bg-primary hover:bg-primary/90">
                Confirm Donation
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
