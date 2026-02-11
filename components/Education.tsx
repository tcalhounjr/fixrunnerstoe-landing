'use client';

export default function Education() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6">

          {/* Left: Video - 3 columns */}
          <div className="relative group lg:col-span-3 flex items-center">
            <div className="absolute -inset-2 bg-white/0 hover:bg-red-600/20 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full" style={{ aspectRatio: "16/9" }}>
              <iframe
                src="https://www.youtube.com/embed/YQkGlDf8ixM?si=qiOF45VqwjK3bh7n"
                title="Product Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>

          {/* Right: Product Image & Copy */}
          <div className="flex flex-col space-y-8 lg:col-span-2">
            <div>
              <span className="text-red-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">The Product</span>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight uppercase">
                Understanding Runner&apos;s Toe
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Our proprietary micro-vented composite shield provides a secondary skin for high-impact zones, virtually eliminating subungual hematoma (runner&apos;s toe) without sacrificing tactile feedback or performance.
              </p>
            </div>

            {/* Product Image */}
            <div className="relative w-full">
              <div className="relative rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-500 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/subungual-hematoma-elite-shield.jpg"
                  alt="Subungual Hematoma Prevention"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-start pt-4">
              <button className="group relative px-10 py-4 bg-black text-white font-black text-lg uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-lg">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
              <p className="mt-4 text-gray-500 text-sm uppercase tracking-widest">Available in Pro & Ultra editions</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
