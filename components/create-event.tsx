"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Upload,
  Plus,
  X,
  Ticket as TicketIcon,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useCreateTicketStore } from "@/stores/storage/useCreateTicketStorage";
import { TuskyApi } from "@/stores/tusky/api";
import { EventFormData } from "@/types";

const categories = [
  "Technology",
  "Music",
  "Art",
  "Finance",
  "Gaming",
  "Sports",
  "Education",
  "Business",
];

const gradients = [
  { name: "Blue Purple", value: "from-blue-500 to-purple-600" },
  { name: "Green Blue", value: "from-green-500 to-blue-500" },
  { name: "Pink Orange", value: "from-pink-500 to-orange-500" },
  { name: "Purple Pink", value: "from-purple-500 to-pink-500" },
  { name: "Yellow Red", value: "from-yellow-500 to-red-500" },
  { name: "Indigo Purple", value: "from-indigo-500 to-purple-500" },
];



export function CreateEvent() {
  const { formData, setFormData, resetFormData } = useCreateTicketStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [newSpeaker, setNewSpeaker] = useState({
    name: "",
    role: "",
    image: "",
  });
  const [newAgendaItem, setNewAgendaItem] = useState({ time: "", title: "" });
  const { toast } = useToast();

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData({ [field]: value });
  };

  const addSpeaker = () => {
    if (newSpeaker.name && newSpeaker.role) {
      setFormData({
        speakers: [
          ...formData.speakers,
          {
            ...newSpeaker,
            image:
              newSpeaker.image ||
              "/placeholder.svg?height=200&width=200&text=Speaker",
          },
        ],
      });
      setNewSpeaker({ name: "", role: "", image: "" });
    }
  };

  const removeSpeaker = (index: number) => {
    setFormData({
      speakers: formData.speakers.filter((_, i) => i !== index),
    });
  };

  const addAgendaItem = () => {
    if (newAgendaItem.time && newAgendaItem.title) {
      setFormData({
        agenda: [...formData.agenda, newAgendaItem],
      });
      setNewAgendaItem({ time: "", title: "" });
    }
  };

  const removeAgendaItem = (index: number) => {
    setFormData({
      agenda: formData.agenda.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      formData.id = Date.now().toString();
      const response = await TuskyApi.uploadTickets(
        formData as unknown as JSON,
        formData.title,
        (percentage) => console.log(`Upload progress: ${percentage}%`),
        (upload) => console.log("Upload success:", upload),
        () => console.error("Upload failed")
      );
      console.log("~response", response);
    } catch (error) {
      console.error("~error", error);
    }

    // Simulate API call to create event
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Event created successfully!",
        description: `${formData.title} has been created and is now live for ticket sales.`,
      });

      // Reset form
      resetFormData();
      setCurrentStep(1);
    }, 2000);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return (
          formData.date &&
          formData.time &&
          formData.location &&
          formData.address
        );
      case 3:
        return formData.price && formData.totalTickets;
      default:
        return true;
    }
  };

  const steps = [
    {
      number: 1,
      title: "Basic Info",
      description: "Event details and description",
    },
    { number: 2, title: "Date & Location", description: "When and where" },
    {
      number: 3,
      title: "Pricing",
      description: "Ticket pricing and availability",
    },
    {
      number: 4,
      title: "Additional",
      description: "Speakers, agenda, and media",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Create New Event</h2>
        <p className="text-muted-foreground">
          Launch your event and start selling NFT tickets on Sui
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.number
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {step.number}
              </div>
              <div className="ml-2 hidden md:block">
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-muted-foreground mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TicketIcon className="h-5 w-5" />
            Step {currentStep}: {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Event Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Event Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Upload event banner image
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {gradients.map((gradient) => (
                    <button
                      key={gradient.value}
                      type="button"
                      onClick={() =>
                        handleInputChange("gradient", gradient.value)
                      }
                      className={`h-12 rounded-lg bg-gradient-to-r ${
                        gradient.value
                      } border-2 transition-all ${
                        formData.gradient === gradient.value
                          ? "border-primary scale-105"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Location */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Start Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      handleInputChange("endTime", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Venue Name *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Convention Center"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    placeholder="Street address, City, State, ZIP"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Ticket Price (SUI) *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-10"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalTickets">
                    Total Tickets Available *
                  </Label>
                  <Input
                    id="totalTickets"
                    type="number"
                    placeholder="1000"
                    value={formData.totalTickets}
                    onChange={(e) =>
                      handleInputChange("totalTickets", e.target.value)
                    }
                  />
                </div>
              </div>

              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Revenue Calculation</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Ticket Price:</span>
                      <span>{formData.price || "0"} SUI</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Tickets:</span>
                      <span>{formData.totalTickets || "0"}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Potential Revenue:</span>
                      <span>
                        {(
                          (Number.parseFloat(formData.price) || 0) *
                          (Number.parseInt(formData.totalTickets) || 0)
                        ).toFixed(2)}{" "}
                        SUI
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Additional */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Speakers Section */}
              <div className="space-y-4">
                <h4 className="font-semibold">Speakers (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Speaker name"
                    value={newSpeaker.name}
                    onChange={(e) =>
                      setNewSpeaker((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Speaker role"
                    value={newSpeaker.role}
                    onChange={(e) =>
                      setNewSpeaker((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                  />
                  <Button
                    onClick={addSpeaker}
                    variant="outline"
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Speaker
                  </Button>
                </div>

                {formData.speakers.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <div className="relative w-10 h-10">
                          <Image
                            src={speaker.image || "/placeholder.svg"}
                            alt={speaker.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{speaker.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {speaker.role}
                          </div>
                        </div>
                        <Button
                          onClick={() => removeSpeaker(index)}
                          variant="ghost"
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Agenda Section */}
              <div className="space-y-4">
                <h4 className="font-semibold">Event Agenda (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    type="time"
                    value={newAgendaItem.time}
                    onChange={(e) =>
                      setNewAgendaItem((prev) => ({
                        ...prev,
                        time: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Agenda item"
                    value={newAgendaItem.title}
                    onChange={(e) =>
                      setNewAgendaItem((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  <Button
                    onClick={addAgendaItem}
                    variant="outline"
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                </div>

                {formData.agenda.length > 0 && (
                  <div className="space-y-2">
                    {formData.agenda.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <div className="text-sm font-mono text-muted-foreground min-w-[60px]">
                          {item.time}
                        </div>
                        <div className="flex-1">{item.title}</div>
                        <Button
                          onClick={() => removeAgendaItem(index)}
                          variant="ghost"
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              variant="outline"
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepValid(currentStep)}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !isStepValid(currentStep)}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="h-4 w-4 border-2 border-t-transparent border-white rounded-full mr-2"
                  />
                ) : null}
                Create Event
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      {formData.title && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 overflow-hidden rounded-lg mb-4">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${formData.gradient}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  {formData.category || "Category"}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold mb-2">{formData.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    {formData.date && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(formData.date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {formData.time && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formData.time}</span>
                      </div>
                    )}
                  </div>
                  <div className="font-bold">
                    {formData.price ? `${formData.price} SUI` : "Price TBD"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
