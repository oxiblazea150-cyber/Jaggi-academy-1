export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--color-surface)]">
            <nav className="bg-[var(--color-primary-dark)] text-white p-4 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                    <span className="font-bold text-lg">Jaggi Academy CMS</span>
                </div>
            </nav>
            {children}
        </div>
    );
}
