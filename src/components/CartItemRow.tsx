import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType, useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const CartItemRow = ({ item }: { item: CartItemType }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 card-gradient">
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{item.product.name}</h4>
        <p className="text-sm text-muted-foreground">
          ${item.product.price.toFixed(2)} each
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center font-mono text-sm">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <span className="w-20 text-right font-mono font-semibold text-foreground">
          ${(item.product.price * item.quantity).toFixed(2)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => removeFromCart(item.product.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItemRow;
