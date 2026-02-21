import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { useOrders } from "@/contexts/OrderContext";
import { products as allProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, LogOut, Package, Tag, ClipboardList, Lock, AlertTriangle } from "lucide-react";

const AdminLogin = ({ onLogin }: { onLogin: (email: string, password: string) => boolean }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!onLogin(email, password)) {
      setError("Invalid credentials. Try admin@bytebazaar.com / admin123");
    }
  };

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 card-gradient">
        <div className="mb-6 text-center">
          <Lock className="mx-auto mb-3 h-10 w-10 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Admin Login</h2>
          <p className="text-xs text-muted-foreground mt-1">Demo: admin@bytebazaar.com / admin123</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="admin-email">Email</Label>
            <Input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="admin-password">Password</Label>
            <Input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
          </div>
          {error && (
            <p className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" /> {error}
            </p>
          )}
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </div>
    </div>
  );
};

const Admin = () => {
  const { isAuthenticated, login, logout } = useAdmin();
  const { orders } = useOrders();

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage products, categories, and orders</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={logout}>
          <LogOut className="h-3.5 w-3.5" /> Logout
        </Button>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products" className="gap-1.5"><Package className="h-3.5 w-3.5" /> Products</TabsTrigger>
          <TabsTrigger value="categories" className="gap-1.5"><Tag className="h-3.5 w-3.5" /> Categories</TabsTrigger>
          <TabsTrigger value="orders" className="gap-1.5"><ClipboardList className="h-3.5 w-3.5" /> Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="rounded-lg border border-border bg-card card-gradient overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Image</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map((p) => {
                    const cat = categories.find((c) => c.id === p.categoryId);
                    return (
                      <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3"><img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded object-cover" /></td>
                        <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{cat?.name}</span>
                        </td>
                        <td className="px-4 py-3 font-mono text-primary">${p.price.toFixed(2)}</td>
                        <td className="px-4 py-3 font-mono">{p.stock}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-primary" />
            Enable Lovable Cloud for full CRUD operations with database persistence.
          </p>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const count = allProducts.filter((p) => p.categoryId === cat.id).length;
              return (
                <div key={cat.id} className="rounded-lg border border-border bg-card p-6 card-gradient">
                  <h3 className="text-base font-semibold text-foreground">{cat.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                  <p className="mt-3 font-mono text-xs text-primary">{count} products</p>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="orders">
          {orders.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">No orders yet. Place an order to see it here.</div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-lg border border-border bg-card p-5 card-gradient">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <span className="font-mono text-sm font-bold text-primary">{order.id}</span>
                      <span className="ml-3 text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <span className="font-mono text-base font-bold text-foreground">${order.total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.customerName} · {order.customerEmail} · {order.customerPhone}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {order.items.map((item) => (
                      <span key={item.productId} className="rounded bg-muted px-2 py-0.5 text-xs text-secondary-foreground">
                        {item.name} ×{item.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
