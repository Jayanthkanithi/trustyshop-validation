import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Shield, Lock, Server } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient border-b border-border py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 animate-pulse-glow">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Byte<span className="text-gradient-primary">Bazaar</span>
          </h1>
          <p className="mx-auto max-w-lg text-base text-muted-foreground">
            A secure demo store demonstrating why backend price validation is
            critical. Explore, add to cart, and see server-side security in action.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-primary" /> Tamper-proof pricing
            </span>
            <span className="flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-primary" /> Server-side validation
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">Digital Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <div key={product.id} style={{ animationDelay: `${i * 100}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Security Education Banner */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 flex items-center gap-2 font-mono text-sm font-semibold text-primary">
              <Shield className="h-4 w-4" /> Security Note
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              In this demo, prices displayed on the frontend are <strong className="text-foreground">never trusted</strong> during
              checkout. The server fetches official prices from the database and
              recalculates totals—preventing attackers from modifying request
              payloads to pay less. This is how production eCommerce should work.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
