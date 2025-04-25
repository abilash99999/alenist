import Image from 'next/image';

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-blue-600 shadow-md w-full h-16 fixed top-0 left-0 z-50">
            {/* Logo on the Left */}
            <div className="flex items-center space-x-2">
                <Image
                    src="/alenist.png"
                    alt="Alenist Logo"
                    width={40}
                    height={40}
                    priority
                />
                <span className="text-white font-semibold text-lg">Alenist</span>
            </div>
        </header>
    );
}
