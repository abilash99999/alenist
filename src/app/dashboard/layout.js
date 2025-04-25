"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error || !session) {
                router.push("/login");
            } else {
                setUser(session.user);
            }
        };

        getUser();
    }, [router]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await supabase.auth.signOut();
        setIsLoggingOut(false);
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar for larger screens */}
            <aside className="w-64 bg-blue-600 text-white flex flex-col items-start p-6 space-y-4 md:block hidden">
                {user && (
                    <div className="mt-4 text-sm">
                        <p className="font-semibold">Welcome,</p>
                        <p>{user.email}</p>
                    </div>
                )}
                <nav className="mt-8 w-full">
                    <ul className="space-y-3">
                        <li>
                            <Link href="/dashboard" className="block hover:bg-blue-700 px-4 py-2 rounded">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/web" className="block hover:bg-blue-700 px-4 py-2 rounded">
                                Web
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/android" className="block hover:bg-blue-700 px-4 py-2 rounded">
                                Android
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/ios" className="block hover:bg-blue-700 px-4 py-2 rounded">
                                iOS
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/backend" className="block hover:bg-blue-700 px-4 py-2 rounded">
                                Backend
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/settings" className="block hover:bg-blue-700 px-4 py-2 rounded">
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
                {user && (
                    <button
                        onClick={handleLogout}
                        className="mt-8 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                )}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 bg-gray-100">
                {children}
            </main>

            {/* Horizontal footer for smaller screens */}
            <footer className="md:hidden fixed bottom-0 w-full bg-blue-600 text-white flex justify-around items-center py-2 space-x-6">
                <Link href="/dashboard" className="flex justify-center items-center hover:bg-blue-700 rounded-full p-2">
                    <img src="/home.png" alt="Home" className="w-6 h-6 invert" />
                </Link>
                <Link href="/dashboard/web" className="flex justify-center items-center hover:bg-blue-700 rounded-full p-2">
                    <img src="/world-wide-web.png" alt="Home" className="w-6 h-6 invert" />
                </Link>
                <Link href="/dashboard/ios" className="flex justify-center items-center hover:bg-blue-700 rounded-full p-2">
                    <img src="/apple.png" alt="iOS" className="w-6 h-6 invert" />
                </Link>
                <Link href="/dashboard/android" className="flex justify-center items-center hover:bg-blue-700 rounded-full p-2">
                    <img src="/android.png" alt="Android" className="w-6 h-6 invert" />
                </Link>
                <Link href="/dashboard/backend" className="flex justify-center items-center hover:bg-blue-700 rounded-full p-2">
                    <img src="/backend.png" alt="Backend" className="w-6 h-6 invert" />
                </Link>
                <Link href="/dashboard/settings" className="flex justify-center items-center hover:bg-blue-700 rounded-full p-2">
                    <img src="/settings.png" alt="Settings" className="w-6 h-6 invert" />
                </Link>
            </footer>
        </div>
    );
} 