import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import ProductsSection from "@/components/ProductsSection";
import ProductListSkeleton from "@/components/ProductListSkeleton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Education />
        <Suspense fallback={
          <section className="py-24 bg-black">
            <div className="container mx-auto px-6">
              <div className="h-8 w-48 bg-white/10 rounded mb-14" />
              <ProductListSkeleton />
            </div>
          </section>
        }>
          <ProductsSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
