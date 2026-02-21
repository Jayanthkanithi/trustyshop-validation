import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Wrench, Award, ArrowLeft, ShoppingCart, Check } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Users, Wrench, Award,
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">Product not found</h2>
          <Link to="/" className="text-primary hover:underline">Back to products</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[product.icon] || GraduationCap;

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Left */}
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-12 card-gradient">
          <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-primary/10 animate-pulse-glow">
            <Icon className="h-14 w-14 text-primary" />
          </div>
        </div>

        {/* Right */}
        <div>
          <h1 className="mb-2 text-3xl font-extrabold text-foreground">{product.name}</h1>
          <p className="mb-6 text-muted-foreground">{product.fullDescription}</p>

          <ul className="mb-8 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                <Check className="h-4 w-4 text-primary" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span className="font-mono text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="lg"
              className="gap-2"
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
