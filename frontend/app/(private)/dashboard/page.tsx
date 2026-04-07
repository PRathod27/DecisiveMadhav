"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function Page() {
  // Dummy complaints data for mapping
  const complaints = [
    {
      title: "Water Leakage in Sector 11",
      category: "Water",
      department: "Municipal",
      priority: "High",
      city: "Mumbai",
      description:
        "There is a constant water leakage from the main supply pipe resulting in water wastage and muddy roads.",
    },
    {
      title: "Street lights not working on MG Road",
      category: "Electricity",
      department: "Electricity Board",
      priority: "Medium",
      city: "Bengaluru",
      description:
        "Most of the street lights have been out of order for a week, making it unsafe at night.",
    },
    {
      title: "Garbage not collected for 3 days",
      category: "Sanitation",
      department: "Municipal",
      priority: "High",
      city: "Delhi",
      description:
        "Garbage bins in our area are overflowing and haven't been cleared despite reminders.",
    },
    {
      title: "Potholes on Main Street",
      category: "Roads",
      department: "PWD",
      priority: "Medium",
      city: "Pune",
      description:
        "Several deep potholes have appeared on the main street, causing risk to vehicles.",
    },
    {
      title: "Irregular water supply in Block B",
      category: "Water",
      department: "Municipal",
      priority: "Low",
      city: "Hyderabad",
      description:
        "Water supply in Block B has been erratic with low pressure during mornings.",
    },
  ];

  const [resolved, setResolved] = useState(
    Array(complaints.length).fill(false),
  );

  return (
    <div className="space-y-6 bg-white rounded-lg shadow px-8 py-6 max-w-2xl w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Recent Complaints</h2>
      <div className="space-y-4">
        {complaints.map((complaint, idx) => (
          <Card key={complaint.title}>
            <CardHeader className="flex flex-col gap-4 pb-2 px-4 pt-4">
              <CardTitle>
                <Label
                  htmlFor={`resolved-${idx}`}
                  className="font-semibold cursor-pointer flex-1 pl-2"
                >
                  {complaint.title}
                </Label>
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="default">{complaint.category}</Badge>
                <Badge variant="secondary">{complaint.department}</Badge>
                <Badge
                  variant={
                    complaint.priority === "High"
                      ? "destructive"
                      : complaint.priority === "Medium"
                        ? "outline"
                        : "default"
                  }
                  className={
                    complaint.priority === "High"
                      ? "bg-red-500 text-white"
                      : complaint.priority === "Medium"
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-green-100 text-green-800"
                  }
                >
                  {complaint.priority}
                </Badge>
                <Badge variant="outline">{complaint.city}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4 text-gray-800">
              {complaint.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
