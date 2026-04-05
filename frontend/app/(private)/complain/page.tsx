import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";

export default function ComplainPage() {
    return (
        <form className="space-y-6 bg-white rounded-lg shadow px-8 py-6 max-w-2xl w-full mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
                Register a Complaint
            </h2>
            <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="title">
                    Title
                </label>
                <Input
                    id="title"
                    name="title"
                    placeholder="Enter Complaint Title"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="complaint">
                    Complaint
                </label>
                <Textarea
                    id="complaint"
                    name="complaint"
                    placeholder="Describe your complaint"
                    rows={3}
                    required
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium" htmlFor="category">
                        Category
                    </label>
                    <Select name="category" required>
                        <SelectTrigger id="category" className="w-full">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Sanitation">
                                Sanitation
                            </SelectItem>
                            <SelectItem value="Water">Water</SelectItem>
                            <SelectItem value="Electricity">
                                Electricity
                            </SelectItem>
                            <SelectItem value="Roads">Roads</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium" htmlFor="department">
                        Department
                    </label>
                    <Select name="department" required>
                        <SelectTrigger id="department" className="w-full">
                            <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Municipal">Municipal</SelectItem>
                            <SelectItem value="PWD">PWD</SelectItem>
                            <SelectItem value="Electricity Board">
                                Electricity Board
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="priority">
                    Priority
                </label>
                <Select name="priority" required>
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
            <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="city">
                    City
                </label>
                <Input
                    id="city"
                    name="city"
                    placeholder="Enter your city"
                    required
                />
            </div>
            <Button type="submit" className="mt-4 w-full">
                Submit Complaint
            </Button>
        </form>
    );
}
