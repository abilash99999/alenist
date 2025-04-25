import Link from "next/link";

export default function Homee() {
    return (
        <section className="flex justify-center items-center mt-8 mb-12 min-h-[60vh]">
            <Link href="/login">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg shadow-md hover:bg-blue-700 transition">
                    Login
                </button>
            </Link>
        </section>
    );
}
