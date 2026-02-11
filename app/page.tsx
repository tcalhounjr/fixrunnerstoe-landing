import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Education />
      </main>
      <Footer />
    </div>
  );
}
