import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useOrders } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";

const TAX_RATE = 0.05;

const Checkout = () => {
  const { items, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await placeOrder(name.trim(), email.trim(), phone.trim(), items);
      clearCart();
      navigate("/order-confirmation");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="mb-6 text-3xl font-extrabold text-foreground">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" />
            </div>

            {error && (
              <p className="flex items-center gap-1.5 text-sm text-destructive">
                <AlertTriangle className="h-3.5 w-3.5" /> {error}
              </p>
            )}

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</> : <><Shield className="h-4 w-4" /> Place Secure Order</>}
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-mono text-xs font-semibold text-primary">
              <Shield className="h-3.5 w-3.5" /> How This Checkout Is Secured
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>• Frontend sends only product IDs & quantities</li>
              <li>• Server fetches real prices from the database</li>
              <li>• Totals are recalculated server-side</li>
              <li>• Any client-sent price fields are ignored</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 card-gradient h-fit">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 text-sm">
                <img src={item.product.images[0]} alt={item.product.name} className="h-10 w-10 rounded object-cover" />
                <span className="flex-1 text-muted-foreground truncate">{item.product.name} × {item.quantity}</span>
                <span className="font-mono text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-border pt-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span><span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (5%)</span><span className="font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-foreground">
              <span>Total</span><span className="font-mono text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
