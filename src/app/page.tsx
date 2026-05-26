import Categories from "@/components/categories";
import FeaturedProducts from "@/components/featured-products";
import Hero from "@/components/Hero";
import Navbar from "@/components/navbar";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
    </main>
  );
}