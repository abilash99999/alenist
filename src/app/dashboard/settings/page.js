'use client';
import { supabase } from "../../../../lib/supabaseClient";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter(); // ✅ Missing in your original code

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await supabase.auth.signOut();
        setIsLoggingOut(false);
        router.push("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center mt-26">
            <button
                onClick={handleLogout}
                className="mt-8 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                disabled={isLoggingOut}
            >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
}
