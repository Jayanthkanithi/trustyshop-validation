import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:glow-primary animate-fade-in card-gradient">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
            {category.name}
          </span>
        )}
        {product.stock <= 10 && (
          <span className="absolute right-3 top-3 rounded-full bg-destructive/90 px-2 py-0.5 text-[10px] font-semibold text-destructive-foreground">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-base font-semibold text-foreground">{product.name}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <div className="flex gap-2">
            <Link to={`/product/${product.id}`}>
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Eye className="h-3 w-3" /> Details
              </Button>
            </Link>
            <Button
              size="sm"
              className="gap-1 text-xs"
              onClick={() => {
                addToCart(product);
                toast.success(`${product.name} added to cart`);
              }}
            >
              <ShoppingCart className="h-3 w-3" /> Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
