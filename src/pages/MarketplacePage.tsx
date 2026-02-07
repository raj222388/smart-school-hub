import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Package, 
  Truck, 
  CreditCard,
  FileText,
  Plus,
  Minus,
  X,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  minOrderQty: number;
  stock: number;
  codAvailable: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Student Notebooks (Pack of 10)",
    description: "High-quality ruled notebooks for students. 200 pages each.",
    price: 250,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400",
    category: "Stationery",
    minOrderQty: 5,
    stock: 500,
    codAvailable: true,
  },
  {
    id: "2",
    name: "Classroom Whiteboard (4x3 ft)",
    description: "Magnetic whiteboard with aluminum frame. Includes markers and duster.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=400",
    category: "Classroom",
    minOrderQty: 1,
    stock: 50,
    codAvailable: true,
  },
  {
    id: "3",
    name: "School Uniform Set",
    description: "Complete uniform set including shirt, pants/skirt, and tie.",
    price: 800,
    image: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=400",
    category: "Uniforms",
    minOrderQty: 10,
    stock: 200,
    codAvailable: false,
  },
  {
    id: "4",
    name: "Science Lab Kit",
    description: "Complete chemistry and physics lab kit for school experiments.",
    price: 5000,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
    category: "Lab Equipment",
    minOrderQty: 1,
    stock: 30,
    codAvailable: true,
  },
  {
    id: "5",
    name: "Sports Equipment Bundle",
    description: "Football, basketball, cricket set, and badminton rackets.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1461896836934- voices.7c85d8d9f8?w=400",
    category: "Sports",
    minOrderQty: 1,
    stock: 25,
    codAvailable: true,
  },
  {
    id: "6",
    name: "Classroom Desk & Chair Set",
    description: "Durable wooden desk with attached chair. Ergonomic design.",
    price: 1800,
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400",
    category: "Furniture",
    minOrderQty: 10,
    stock: 100,
    codAvailable: false,
  },
  {
    id: "7",
    name: "Digital Projector",
    description: "HD projector for classroom presentations. 3000 lumens.",
    price: 15000,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400",
    category: "Electronics",
    minOrderQty: 1,
    stock: 15,
    codAvailable: true,
  },
  {
    id: "8",
    name: "Art Supplies Kit",
    description: "Complete art kit with paints, brushes, canvas, and more.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
    category: "Art",
    minOrderQty: 5,
    stock: 80,
    codAvailable: true,
  },
];

const categories = ["All", "Stationery", "Classroom", "Uniforms", "Lab Equipment", "Sports", "Furniture", "Electronics", "Art"];

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    
    if (existingItem) {
      setCart(cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + product.minOrderQty }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: product.minOrderQty }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} (Qty: ${product.minOrderQty})`,
    });
  };

  const updateQuantity = (productId: string, delta: number, minQty: number) => {
    setCart(cart.map((item) => {
      if (item.product.id === productId) {
        const newQty = Math.max(minQty, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    setIsCheckoutOpen(false);
    setOrderComplete(true);
    setCart([]);
  };

  const generateInvoice = () => {
    toast({
      title: "Invoice Generated",
      description: "Your invoice PDF has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              School Marketplace
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Quality Products for Schools
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Order stationery, uniforms, lab equipment, furniture, and more. 
              Bulk discounts available for registered schools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="aspect-square relative overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                          loading="lazy"
                        />
                        <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
                          {product.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {product.codAvailable && (
                          <Badge variant="outline" className="text-xs">
                            <Truck className="w-3 h-3 mr-1" />
                            COD
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          Min: {product.minOrderQty}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-primary">₹{product.price}</p>
                        <p className="text-xs text-muted-foreground">per unit</p>
                      </div>
                      <Button onClick={() => addToCart(product)} size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Free Delivery</h3>
                <p className="text-sm text-muted-foreground">On orders above ₹5000</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">Multiple payment options</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Invoice Download</h3>
                <p className="text-sm text-muted-foreground">Get PDF invoices instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Cart Dialog */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shopping Cart ({cart.length} items)
            </DialogTitle>
          </DialogHeader>
          
          {cart.length === 0 ? (
            <div className="py-8 text-center">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-primary font-semibold">₹{item.product.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-6 h-6"
                          onClick={() => updateQuantity(item.product.id, -1, item.product.minOrderQty)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-6 h-6"
                          onClick={() => updateQuantity(item.product.id, 1, item.product.minOrderQty)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        ₹{item.product.price * item.quantity}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-destructive mt-1"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">₹{cartTotal}</span>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </Button>
                <Button onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Order Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery:</span>
                  <span>{cartTotal >= 5000 ? "Free" : "₹200"}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-primary">₹{cartTotal >= 5000 ? cartTotal : cartTotal + 200}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">School Name</label>
                <Input placeholder="Enter school name" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Delivery Address</label>
                <Input placeholder="Enter full address" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Contact Number</label>
                <Input placeholder="Enter phone number" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Payment Method</label>
                <Select defaultValue="cod">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                    <SelectItem value="online">Online Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Complete Dialog */}
      <Dialog open={orderComplete} onOpenChange={setOrderComplete}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CheckCircle className="w-20 h-20 mx-auto text-emerald-600 dark:text-emerald-400 mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Order Placed!</h2>
            <p className="text-muted-foreground mb-6">
              Your order has been successfully placed. You will receive a confirmation shortly.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={generateInvoice}>
                <FileText className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              <Button onClick={() => setOrderComplete(false)}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketplacePage;
