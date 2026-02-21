import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { GraduationCap, Users, Wrench, Award, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Users,
  Wrench,
  Award,
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const Icon = iconMap[product.icon] || GraduationCap;

  return (
    <div className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:glow-primary animate-fade-in card-gradient">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">{product.name}</h3>
      <p className="mb-4 flex-1 text-sm text-muted-foreground">{product.shortDescription}</p>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </span>
        <div className="flex gap-2">
          <Link to={`/product/${product.id}`}>
            <Button variant="outline" size="sm" className="text-xs">
              Details
            </Button>
          </Link>
          <Button
            size="sm"
            className="gap-1 text-xs"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-3 w-3" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
