"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const API = "http://localhost:8080";

const CATEGORIES = [
    "Sanitation",
    "Water Supply",
    "Electricity",
    "Roads",
    "Infrastructure",
    "Traffic",
    "Health",
    "Environment",
    "Animal Control",
    "Transport",
    "Disaster",
];

const DEPARTMENTS = [
    "Municipal",
    "Public Works Department",
    "Electricity Board",
    "Water Department",
    "Traffic Police",
    "Health Department",
    "Pollution Control Board",
    "Transport Department",
];

export default function ComplainPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        complaint: "",
        category: "",
        department: "",
        priority: "",
        city: "",
    });

    function set(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.category || !form.department || !form.priority) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API}/complaints/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    escalation_required: form.priority === "High",
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                toast.error(data.detail ?? "Failed to submit complaint");
                return;
            }

            toast.success("Complaint submitted successfully");
            router.push("/dashboard");
        } catch {
            toast.error("Could not reach the server");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white rounded-lg shadow px-8 py-6 max-w-2xl w-full mx-auto"
        >
            <h2 className="text-2xl font-semibold">Register a Complaint</h2>

            <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="complaint">
                    Complaint
                </label>
                <Textarea
                    id="complaint"
                    name="complaint"
                    placeholder="Describe your complaint in detail"
                    rows={4}
                    required
                    value={form.complaint}
                    onChange={(e) => set("complaint", e.target.value)}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium" htmlFor="category">
                        Category
                    </label>
                    <Select
                        name="category"
                        required
                        onValueChange={(v) => set("category", v)}
                    >
                        <SelectTrigger id="category" className="w-full">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {c}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium" htmlFor="department">
                        Department
                    </label>
                    <Select
                        name="department"
                        required
                        onValueChange={(v) => set("department", v)}
                    >
                        <SelectTrigger id="department" className="w-full">
                            <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                            {DEPARTMENTS.map((d) => (
                                <SelectItem key={d} value={d}>
                                    {d}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium" htmlFor="priority">
                        Priority
                    </label>
                    <Select
                        name="priority"
                        required
                        onValueChange={(v) => set("priority", v)}
                    >
                        <SelectTrigger id="priority" className="w-full">
                            <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium" htmlFor="city">
                        City
                    </label>
                    <Input
                        id="city"
                        name="city"
                        placeholder="Enter your city"
                        required
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                    />
                </div>
            </div>

            {form.priority === "High" && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                    High priority complaints are automatically flagged for escalation.
                </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Complaint"}
            </Button>
        </form>
    );
}
