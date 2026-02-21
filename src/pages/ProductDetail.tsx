import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import ImageGallery from "@/components/ImageGallery";
import { ArrowLeft, ShoppingCart, Check, Package } from "lucide-react";
import { toast } from "sonner";

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

  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
        <ImageGallery images={product.images} alt={product.name} />

        <div>
          {category && (
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {category.name}
            </span>
          )}
          <h1 className="mb-3 text-3xl font-extrabold text-foreground">{product.name}</h1>
          <p className="mb-6 leading-relaxed text-muted-foreground">{product.fullDescription}</p>

          {/* Stock indicator */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-muted-foreground" />
            {product.stock > 10 ? (
              <span className="text-primary">In Stock</span>
            ) : product.stock > 0 ? (
              <span className="text-accent">Only {product.stock} left</span>
            ) : (
              <span className="text-destructive">Out of Stock</span>
            )}
          </div>

          <ul className="mb-8 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <Button
              size="lg"
              className="gap-2"
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product);
                toast.success(`${product.name} added to cart`);
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
