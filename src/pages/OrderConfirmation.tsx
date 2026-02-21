import { Link } from "react-router-dom";
import { useOrders } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Calendar } from "lucide-react";

const OrderConfirmation = () => {
  const { lastOrder } = useOrders();

  if (!lastOrder) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">No recent order</h2>
          <Link to="/" className="text-primary hover:underline">Browse products</Link>
        </div>
      </div>
    );
  }

  const date = new Date(lastOrder.createdAt);

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-lg border border-primary/30 bg-card p-8 card-gradient animate-fade-in">
        <div className="text-center mb-6">
          <CheckCircle className="mx-auto mb-4 h-14 w-14 text-primary" />
          <h1 className="mb-1 text-2xl font-extrabold text-foreground">Order Confirmed!</h1>
          <p className="text-sm text-muted-foreground">
            Order <span className="font-mono text-primary">{lastOrder.id}</span>
          </p>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {date.toLocaleDateString()} at {date.toLocaleTimeString()}
          </p>
        </div>

        {/* Items */}
        <div className="mb-4 space-y-3">
          {lastOrder.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-3">
              <img src={item.image} alt={item.name} className="h-12 w-12 rounded object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span className="font-mono text-sm text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-2 rounded-md border border-border bg-muted/50 p-4 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span><span className="font-mono">${lastOrder.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Tax (5%)</span><span className="font-mono">${lastOrder.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-semibold text-foreground">
            <span>Total (server-validated)</span>
            <span className="font-mono text-primary">${lastOrder.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            All prices were recalculated server-side. Client-sent prices were ignored to prevent tampering.
          </p>
        </div>

        <Link to="/" className="mt-6 block">
          <Button className="w-full">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
