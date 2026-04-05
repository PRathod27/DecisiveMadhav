import {redirect} from "next/navigation";

export default function Home() {
    const authenticated = false;
    if (!authenticated) {
        redirect("/login");
    } else {
        redirect("/dashboard");
    }
}
