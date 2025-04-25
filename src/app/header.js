import Image from 'next/image';

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-3 bg-blue-600 shadow-md w-full relative">
            {/* Logo on the Left */}
            <div className="flex items-center pr-2">
                <Image
                    src="/alenist.png"
                    alt="Alenist Logo"
                    width={30}
                    height={20}
                    priority
                />
            </div>
        </header>
    );
}
