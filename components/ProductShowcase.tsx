
import React from 'react';

const ProductShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Column 1: Athlete Performance Video */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-red-600/10 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster="https://images.pexels.com/photos/6454041/pexels-photo-6454041.jpeg?auto=compress&cs=tinysrgb&w=800"
              >
                <source 
                  src="https://player.vimeo.com/external/494247503.hd.mp4?s=9143924f33b9347d472a74c43c2c43147573130c&profile_id=175&oauth2_token_id=57447761" 
                  type="video/mp4" 
                />
              </video>
              <div className="absolute bottom-0 left-0 p-8 text-white z-10 bg-gradient-to-t from-black/80 to-transparent w-full">
                <span className="text-red-500 font-black uppercase text-sm tracking-widest block mb-2">Tested in the Field</span>
                <h3 className="text-3xl font-bold">Uncompromising Durability</h3>
              </div>
            </div>
          </div>

          {/* Column 2: Product Image & CTA */}
          <div className="flex flex-col items-center md:items-start space-y-8">
            <div className="w-full">
              <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">The Innovation</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight uppercase">
                ENGINEERED FOR <br/>RECOVERY & DEFENSE
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
                Our proprietary micro-vented composite shield provides a secondary skin for high-impact zones, virtually eliminating subungual hematoma (runner's toe) without sacrificing tactile feedback.
              </p>
            </div>
            
            <div className="w-full flex flex-col items-center">
              <div className="relative mb-12 w-full max-w-md bg-white p-4 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 group">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" 
                  alt="Elite Shield Product" 
                  className="rounded-2xl w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-8 right-8 bg-black text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest shadow-lg">
                  LATEST TECH v4.2
                </div>
              </div>
              
              <button className="group relative px-12 py-5 bg-black text-white font-black text-xl uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <span className="relative z-10">Keep Me in the Game</span>
                <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
              <p className="mt-4 text-gray-400 text-xs uppercase tracking-widest">Available in Pro & Ultra editions</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
