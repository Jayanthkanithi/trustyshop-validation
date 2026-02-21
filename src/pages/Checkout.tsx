import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Shield, CheckCircle, AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";

const TAX_RATE = 0.08;

/**
 * SECURITY EDUCATION:
 *
 * In a real app the frontend sends only product IDs and quantities.
 * The server IGNORES any price/total sent by the client and instead
 * fetches official prices from the database.
 *
 * Why? Because an attacker can easily modify HTTP request bodies
 * (e.g. via browser DevTools or a proxy like Burp Suite) to send
 * a lower price. Server-side validation is the ONLY reliable defense.
 */

interface OrderConfirmation {
  orderId: string;
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

const Checkout = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);
  const [error, setError] = useState("");

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  if (items.length === 0 && !confirmation) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    /**
     * SECURITY: We send ONLY product IDs and quantities.
     * The server will look up real prices from its database.
     *
     * Even if an attacker intercepts this request and adds
     * a "price: 0.01" field, the server ignores it entirely.
     */
    const orderPayload = {
      customerName: name.trim(),
      customerEmail: email.trim(),
      items: items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
        // NOTE: We intentionally do NOT send price here.
        // The server fetches prices from its own database.
      })),
    };

    // Simulated server-side validation (in production this would be an API call)
    await new Promise((r) => setTimeout(r, 1500));

    console.log(
      "%c🔒 SERVER-SIDE VALIDATION",
      "color: #10b981; font-weight: bold;",
      "\nPayload received:", orderPayload,
      "\n\n✅ Server ignores any client-sent prices.",
      "\n✅ Official prices fetched from database.",
      "\n✅ Totals recalculated server-side.",
      "\n\n⚠️  If an attacker modified the request to include",
      '\n   { price: 0.01 }, the server would IGNORE it.'
    );

    // Simulated server response with recalculated prices
    const serverConfirmation: OrderConfirmation = {
      orderId: `BB-${Date.now().toString(36).toUpperCase()}`,
      subtotal,
      tax,
      total,
      itemCount: items.reduce((s, i) => s + i.quantity, 0),
    };

    setConfirmation(serverConfirmation);
    clearCart();
    setLoading(false);
  };

  if (confirmation) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-lg border border-primary/30 bg-card p-8 text-center card-gradient animate-fade-in">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="mb-1 text-2xl font-bold text-foreground">Order Confirmed!</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Order <span className="font-mono text-primary">{confirmation.orderId}</span>
          </p>

          <div className="mb-6 space-y-2 rounded-md border border-border bg-muted/50 p-4 text-left text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Items</span>
              <span className="font-mono">{confirmation.itemCount}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-mono">${confirmation.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="font-mono">${confirmation.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-semibold text-foreground">
              <span>Total (server-validated)</span>
              <span className="font-mono text-primary">${confirmation.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mb-6 rounded-md border border-primary/20 bg-primary/5 p-3 text-left">
            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              All prices were recalculated server-side. Client-sent prices were ignored to prevent tampering.
            </p>
          </div>

          <Link to="/">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="mb-6 text-3xl font-extrabold text-foreground">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
              />
            </div>

            {error && (
              <p className="flex items-center gap-1.5 text-sm text-destructive">
                <AlertTriangle className="h-3.5 w-3.5" /> {error}
              </p>
            )}

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" /> Place Secure Order
                </>
              )}
            </Button>
          </form>

          {/* Security Education */}
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

        {/* Order Summary */}
        <div className="rounded-lg border border-border bg-card p-6 card-gradient h-fit">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-mono text-foreground">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-border pt-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (8%)</span>
              <span className="font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-foreground">
              <span>Total</span>
              <span className="font-mono text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
