import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import CartItemRow from "@/components/CartItemRow";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const TAX_RATE = 0.05;

const Cart = () => {
  const { items } = useCart();

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-bold text-foreground">Your cart is empty</h2>
          <p className="mb-4 text-sm text-muted-foreground">Add some products to get started.</p>
          <Link to="/"><Button>Browse Products</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-extrabold text-foreground">Your Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </div>
        <div className="rounded-lg border border-border bg-card p-6 card-gradient h-fit">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span><span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (5%)</span><span className="font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between text-base font-semibold text-foreground">
                <span>Total</span><span className="font-mono text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Link to="/checkout" className="mt-6 block">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">Prices validated server-side at checkout.</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
