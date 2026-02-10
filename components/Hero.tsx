'use client';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source
            src="/rock-climber.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <h1 className="text-white font-black text-6xl md:text-9xl leading-none tracking-tighter mb-6 drop-shadow-2xl">
          STAY IN THE GAME
        </h1>
        <p className="text-white text-xl md:text-3xl font-light tracking-wide mb-10 opacity-90">
          Protect your toes. <span className="font-bold">Protect your performance.</span>
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button className="w-full md:w-auto px-10 py-5 bg-white text-black font-black text-lg uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
            Experience Pro-Level Protection
          </button>
          <button className="w-full md:w-auto px-10 py-5 border-2 border-white text-white font-black text-lg uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
            View the Science
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white to-transparent opacity-50"></div>
      </div>
    </section>
  );
}
