"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Plus, CheckCircle } from "lucide-react"

interface NgoNeedsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NgoNeedsModal({ open, onOpenChange }: NgoNeedsModalProps) {
  const [step, setStep] = useState<"basic" | "preferences" | "schedule" | "confirm">("basic")
  const [formData, setFormData] = useState({
    foodTypes: [] as string[],
    servingSize: [100],
    urgency: "",
    dietaryRestrictions: [] as string[],
    preferredTime: "",
    location: "",
    notes: "",
    frequency: "",
  })

  const foodTypeOptions = [
    "Dal & Rice",
    "Chapati & Roti",
    "Sabzi & Curry",
    "Sweets & Desserts",
    "Milk & Dairy",
    "Fresh Fruits",
    "Vegetables",
    "Snacks & Biscuits",
    "Khichdi",
    "Paratha",
    "Pickles & Chutney",
    "Traditional Sweets",
  ]

  const dietaryOptions = ["Vegetarian", "Jain", "Halal", "Sattvic", "Gluten-Free", "Nut-Free", "No Onion/Garlic", "South Indian", "North Indian"]

  const handleFoodTypeChange = (foodType: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({ ...prev, foodTypes: [...prev.foodTypes, foodType] }))
    } else {
      setFormData((prev) => ({ ...prev, foodTypes: prev.foodTypes.filter((type) => type !== foodType) }))
    }
  }

  const handleDietaryChange = (restriction: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({ ...prev, dietaryRestrictions: [...prev.dietaryRestrictions, restriction] }))
    } else {
      setFormData((prev) => ({
        ...prev,
        dietaryRestrictions: prev.dietaryRestrictions.filter((r) => r !== restriction),
      }))
    }
  }

  const resetModal = () => {
    setStep("basic")
    setFormData({
      foodTypes: [],
      servingSize: [100],
      urgency: "",
      dietaryRestrictions: [],
      preferredTime: "",
      location: "",
      notes: "",
      frequency: "",
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open)
        if (!open) resetModal()
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            Add Food Requirement
          </DialogTitle>
          <DialogDescription>Specify your organization's food needs to get better matches</DialogDescription>
        </DialogHeader>

        {step === "basic" && (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">What type of food do you need?</Label>
              <p className="text-sm text-muted-foreground mb-4">Select all that apply</p>
              <div className="grid grid-cols-2 gap-3">
                {foodTypeOptions.map((foodType) => (
                  <div key={foodType} className="flex items-center space-x-2">
                    <Checkbox
                      id={foodType}
                      checked={formData.foodTypes.includes(foodType)}
                      onCheckedChange={(checked) => handleFoodTypeChange(foodType, checked as boolean)}
                    />
                    <Label htmlFor={foodType} className="text-sm font-normal">
                      {foodType}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">How many people do you serve?</Label>
              <p className="text-sm text-muted-foreground mb-4">Current capacity: {formData.servingSize[0]} people</p>
              <Slider
                value={formData.servingSize}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, servingSize: value }))}
                max={500}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>10 people</span>
                <span>500+ people</span>
              </div>
            </div>

            <div>
              <Label htmlFor="urgency" className="text-base font-medium">
                Urgency Level
              </Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Can wait 2-3 days</SelectItem>
                  <SelectItem value="medium">Medium - Needed within 24 hours</SelectItem>
                  <SelectItem value="high">High - Urgent, needed today</SelectItem>
                  <SelectItem value="critical">Critical - Emergency need</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setStep("preferences")}
                disabled={formData.foodTypes.length === 0 || !formData.urgency}
                className="bg-primary hover:bg-primary/90"
              >
                Next: Preferences
              </Button>
            </div>
          </div>
        )}

        {step === "preferences" && (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Dietary Restrictions</Label>
              <p className="text-sm text-muted-foreground mb-4">Any special dietary requirements?</p>
              <div className="grid grid-cols-2 gap-3">
                {dietaryOptions.map((restriction) => (
                  <div key={restriction} className="flex items-center space-x-2">
                    <Checkbox
                      id={restriction}
                      checked={formData.dietaryRestrictions.includes(restriction)}
                      onCheckedChange={(checked) => handleDietaryChange(restriction, checked as boolean)}
                    />
                    <Label htmlFor={restriction} className="text-sm font-normal">
                      {restriction}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="frequency" className="text-base font-medium">
                How often do you need food?
              </Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, frequency: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="occasional">Occasional/As needed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes" className="text-base font-medium">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any specific requirements, preparation methods, or other details..."
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                className="mt-2"
                rows={4}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("basic")}>
                Back
              </Button>
              <Button onClick={() => setStep("schedule")} className="bg-primary hover:bg-primary/90">
                Next: Schedule
              </Button>
            </div>
          </div>
        )}

        {step === "schedule" && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="preferredTime" className="text-base font-medium">
                Preferred Delivery Time
              </Label>
              <Input
                id="preferredTime"
                type="datetime-local"
                value={formData.preferredTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, preferredTime: e.target.value }))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-base font-medium">
                Delivery Location
              </Label>
              <Input
                id="location"
                placeholder="Enter your organization's address"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                className="mt-2"
              />
            </div>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-sm">Delivery Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Ensure someone is available to receive the delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Have proper storage facilities ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Provide clear access instructions if needed</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("preferences")}>
                Back
              </Button>
              <Button
                onClick={() => setStep("confirm")}
                disabled={!formData.preferredTime || !formData.location}
                className="bg-primary hover:bg-primary/90"
              >
                Review Request
              </Button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Review Your Food Request</h3>
              <p className="text-muted-foreground">Please confirm the details below</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Food Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Food Types</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.foodTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Serving Size</Label>
                    <p className="text-sm font-medium">{formData.servingSize[0]} people</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Urgency</Label>
                    <Badge
                      variant={
                        formData.urgency === "critical" || formData.urgency === "high" ? "destructive" : "secondary"
                      }
                      className="text-xs ml-2"
                    >
                      {formData.urgency}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Delivery Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Preferred Time</Label>
                    <p className="text-sm font-medium">{new Date(formData.preferredTime).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Location</Label>
                    <p className="text-sm font-medium">{formData.location}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Frequency</Label>
                    <p className="text-sm font-medium">{formData.frequency}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {formData.dietaryRestrictions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Dietary Restrictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {formData.dietaryRestrictions.map((restriction) => (
                      <Badge key={restriction} variant="outline" className="text-xs">
                        {restriction}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {formData.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{formData.notes}</p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("schedule")}>
                Back
              </Button>
              <Button onClick={() => onOpenChange(false)} className="bg-primary hover:bg-primary/90">
                Submit Request
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
