import { useParams, Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft } from "lucide-react";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const category = categories.find((c) => c.id === id);
  const filtered = products.filter((p) => p.categoryId === id);

  if (!category) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">Category not found</h2>
          <Link to="/categories" className="text-primary hover:underline">View all categories</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/categories" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All Categories
      </Link>
      <h1 className="mb-2 text-3xl font-extrabold text-foreground">{category.name}</h1>
      <p className="mb-8 text-muted-foreground">{category.description}</p>
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">No products in this category yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
