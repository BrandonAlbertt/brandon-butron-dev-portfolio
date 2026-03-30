'use client'

export function CurrentGoals() {
    return (
        <section
            id="current-goals"
            className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        >
            {/* Chispitas animadas detrás */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse opacity-30" />
                <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse opacity-20" />
            </div>

            <div className="p-8 rounded-2xl border-2 border-accent/40 bg-card hover:bg-accent/5 hover:shadow-lg transition-all duration-300 relative z-10">
                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Lo que busco actualmente
                        <span className="text-accent">.</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Actualmente busco oportunidades como desarrollador backend junior o trainee donde pueda aplicar mis conocimientos en desarrollo de APIs, bases de datos y arquitectura de software mientras continúo aprendiendo y creciendo profesionalmente.
                    </p>
                </div>
            </div>
        </section>
    )
}