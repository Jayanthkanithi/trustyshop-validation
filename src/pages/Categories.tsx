import { Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { GraduationCap, Wrench, Crown, Award } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Wrench, Crown, Award,
};

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-extrabold text-foreground">Browse by Category</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || GraduationCap;
          const count = products.filter((p) => p.categoryId === cat.id).length;
          return (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-8 text-center transition-all hover:border-primary/40 hover:glow-primary card-gradient"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{cat.name}</h3>
              <p className="text-sm text-muted-foreground">{cat.description}</p>
              <span className="font-mono text-xs text-primary">{count} products</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
