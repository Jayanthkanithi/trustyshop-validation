import { Link } from "react-router-dom";
import { ShoppingCart, Shield, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">
            Byte<span className="text-gradient-primary">Bazaar</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Products
          </Link>
          <Link to="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Categories
          </Link>
          <Link to="/admin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Admin
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Products</Link>
            <Link to="/categories" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Categories</Link>
            <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
