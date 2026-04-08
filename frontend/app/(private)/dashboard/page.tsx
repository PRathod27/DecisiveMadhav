"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const API = "http://localhost:8080";

type Complaint = {
  id: number;
  complaint: string;
  category: string;
  department: string;
  priority: "High" | "Medium" | "Low";
  city: string;
  escalation_required: boolean;
};

type DashboardStats = {
  total: number;
  high_priority: number;
  cities: string[];
  complaint_types: string[];
};

const priorityColor: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const PAGE_SIZE = 8;

const chartConfig: ChartConfig = {
  count: { label: "Complaints", color: "hsl(var(--chart-1))" },
};

const FALLBACK_COMPLAINTS: Complaint[] = [
  { id: 1, complaint: "Garbage not collected for 4 days in our street", category: "Sanitation", department: "Municipal", priority: "High", city: "Patna", escalation_required: true },
  { id: 2, complaint: "Street lights not working on MG Road", category: "Electricity", department: "Electricity Board", priority: "Medium", city: "Bengaluru", escalation_required: false },
  { id: 3, complaint: "Water leakage from main pipeline", category: "Infrastructure", department: "Water Department", priority: "Medium", city: "Chennai", escalation_required: false },
  { id: 4, complaint: "No water supply since morning", category: "Water Supply", department: "Water Department", priority: "High", city: "Bangalore", escalation_required: true },
  { id: 5, complaint: "Potholes causing accidents on highway", category: "Roads", department: "Public Works Department", priority: "High", city: "Hyderabad", escalation_required: true },
  { id: 6, complaint: "Drain blockage causing overflow near market", category: "Sanitation", department: "Municipal", priority: "High", city: "Delhi", escalation_required: true },
  { id: 7, complaint: "Traffic signal not working at main junction", category: "Traffic", department: "Traffic Police", priority: "High", city: "Mumbai", escalation_required: true },
  { id: 8, complaint: "Illegal construction blocking road", category: "Infrastructure", department: "Municipal", priority: "Medium", city: "Pune", escalation_required: false },
  { id: 9, complaint: "Garbage burning causing air pollution", category: "Environment", department: "Pollution Control Board", priority: "High", city: "Kolkata", escalation_required: true },
  { id: 10, complaint: "Public toilet not cleaned for days", category: "Sanitation", department: "Municipal", priority: "Medium", city: "Jaipur", escalation_required: false },
  { id: 11, complaint: "Electric pole damaged dangerously", category: "Electricity", department: "Electricity Board", priority: "High", city: "Ahmedabad", escalation_required: true },
  { id: 12, complaint: "Stray dogs attacking pedestrians", category: "Animal Control", department: "Municipal", priority: "High", city: "Surat", escalation_required: true },
  { id: 13, complaint: "Government hospital lacks medicines", category: "Health", department: "Health Department", priority: "High", city: "Lucknow", escalation_required: true },
  { id: 14, complaint: "Road not repaired after digging", category: "Roads", department: "Public Works Department", priority: "Medium", city: "Indore", escalation_required: false },
  { id: 15, complaint: "Mosquito breeding due to stagnant water", category: "Health", department: "Municipal", priority: "High", city: "Bhopal", escalation_required: true },
  { id: 16, complaint: "Bus stop roof broken and unusable", category: "Transport", department: "Transport Department", priority: "Low", city: "Nagpur", escalation_required: false },
];

const FALLBACK_STATS: DashboardStats = {
  total: 16,
  high_priority: 11,
  cities: ["Patna", "Bengaluru", "Chennai", "Bangalore", "Hyderabad", "Delhi", "Mumbai", "Pune", "Kolkata", "Jaipur", "Ahmedabad", "Surat", "Lucknow", "Indore", "Bhopal", "Nagpur"],
  complaint_types: ["Sanitation", "Electricity", "Infrastructure", "Water Supply", "Roads", "Traffic", "Environment", "Animal Control", "Health", "Transport"],
};

export default function Page() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/dashboard/`).then((r) => r.json()),
      fetch(`${API}/complaints/`).then((r) => r.json()),
    ])
      .then(([s, c]) => {
        setStats(s);
        setComplaints(c);
      })
      .catch(() => {
        setStats(FALLBACK_STATS);
        setComplaints(FALLBACK_COMPLAINTS);
      })
      .finally(() => setLoading(false));
  }, []);

  // Build category chart data from complaints
  const categoryData = complaints.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(categoryData)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const totalPages = Math.ceil(complaints.length / PAGE_SIZE);
  const paginated = complaints.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6 p-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Total Complaints",
            value: stats?.total,
            color: "text-blue-600",
          },
          {
            label: "High Priority",
            value: stats?.high_priority,
            color: "text-red-600",
          },
          {
            label: "Cities Covered",
            value: stats?.cities.length,
            color: "text-purple-600",
          },
          {
            label: "Complaint Types",
            value: stats?.complaint_types.length,
            color: "text-green-600",
          },
        ].map(({ label, value, color }) => (
          <Card key={label}>
            <CardHeader className="pb-1 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <span className={`text-3xl font-bold ${color}`}>{value}</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Complaints by Category</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-48 w-full" />
          ) : (
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <BarChart data={chartData} margin={{ left: -10 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={48}
                />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={4} />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">All Complaints</CardTitle>
          <span className="text-sm text-muted-foreground">
            {complaints.length} total
          </span>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40 text-muted-foreground">
                      <th className="px-4 py-3 text-left font-medium">#</th>
                      <th className="px-4 py-3 text-left font-medium">Complaint</th>
                      <th className="px-4 py-3 text-left font-medium">Category</th>
                      <th className="px-4 py-3 text-left font-medium">Department</th>
                      <th className="px-4 py-3 text-left font-medium">City</th>
                      <th className="px-4 py-3 text-left font-medium">Priority</th>
                      <th className="px-4 py-3 text-left font-medium">Escalation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3 text-muted-foreground">{c.id}</td>
                        <td className="px-4 py-3 max-w-xs truncate">{c.complaint}</td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary">{c.category}</Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{c.department}</td>
                        <td className="px-4 py-3">{c.city}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityColor[c.priority]}`}
                          >
                            {c.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {c.escalation_required ? (
                            <span className="text-red-500 font-medium">Yes</span>
                          ) : (
                            <span className="text-muted-foreground">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-muted-foreground">
                <span>
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-muted transition-colors"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-muted transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
