import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TodayMenu } from "@/components/site/TodayMenu";
import { Products } from "@/components/site/Products";
import { About } from "@/components/site/About";
import { Reviews } from "@/components/site/Reviews";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { FloatingCart } from "@/components/site/FloatingCart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M and M Batters — Fresh Idli & Dosa Batter, Daily" },
      {
        name: "description",
        content:
          "Stone-ground, naturally fermented idli & dosa batter delivered fresh to your door every morning. Order now from M and M Batters.",
      },
      { property: "og:title", content: "M and M Batters" },
      {
        property: "og:description",
        content: "Fresh, hand-crafted batter delivered daily.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <TodayMenu />
      <Products />
      <About />
      <Reviews />
      <Contact />
      <Footer />
      <CartDrawer />
      <FloatingCart />
    </main>
  );
}
