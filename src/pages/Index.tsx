import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import { Shield, Lock, Server, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 4;

const Index = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Category
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.categoryId === categoryFilter);
    }

    // Sort
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [search, categoryFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient border-b border-border py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 animate-pulse-glow">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Byte<span className="text-gradient-primary">Bazaar</span>
          </h1>
          <p className="mx-auto max-w-lg text-base text-muted-foreground">
            A secure demo store demonstrating backend price validation.
            Browse products, add to cart, and see server-side security in action.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-primary" /> Tamper-proof pricing
            </span>
            <span className="flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-primary" /> Server-side validation
            </span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 pt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low → High</SelectItem>
                <SelectItem value="price-high">Price: High → Low</SelectItem>
                <SelectItem value="name">Name A → Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            {filtered.length} Product{filtered.length !== 1 ? "s" : ""}
          </h2>
        </div>

        {paginated.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            No products found. Try a different search or filter.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {paginated.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 80}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0 font-mono text-xs"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </section>

      {/* Security Banner */}
      <section className="border-t border-border bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
            <h3 className="mb-2 flex items-center gap-2 font-mono text-sm font-semibold text-primary">
              <Shield className="h-4 w-4" /> Security Note
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Prices on the frontend are <strong className="text-foreground">never trusted</strong> during checkout.
              The server fetches official prices from the database and recalculates totals — preventing attackers from
              modifying request payloads.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
