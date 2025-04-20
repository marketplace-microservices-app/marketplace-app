"use client";

import { useState } from "react";
import {
  Plus,
  Minus,
  ShoppingCart,
  MapPin,
  Tag,
  Package,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import { addToCart } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  // Handle quantity changes
  const incrementQuantity = () => {
    if (quantity < product.available_stock) {
      setQuantity(quantity + 1);
    } else {
      toast.warning("Maximum stock reached", {
        description: `Only ${product.available_stock} items available`,
        variant: "destructive",
      });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else if (value > product.available_stock) {
      setQuantity(product.available_stock);
      toast.warning("Maximum stock reached", {
        description: `Only ${product.available_stock} items available`,
      });
    } else {
      setQuantity(value);
    }
  };

  const addItemToCart = () => {
    toast.info(`${quantity} × ${product.product_name} added to your cart`, {
      description: `You have added ${quantity} units of ${product.product_name} to your cart.`,
      variant: "destructive",
    });

    // Product Details that should go to the cart
    const cartItem = {
      product_id: product.id,
      product_code: product.product_code,
      product_name: product.product_name,
      item_price: product.item_price,
      quantity: quantity,
      available_stock: product.available_stock,
      seller_id: product.seller_id,
    };

    // Add the cartItem to the redux cart
    dispatch(addToCart(cartItem));

    // Reset quantity to 1 after adding to cart
    setQuantity(1);
  };

  return (
    <div className="grid md:grid-cols-5 gap-8">
      {/* Product Details - Left Column */}
      <div className="md:col-span-3 space-y-6">
        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">{product.product_name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{product.product_code}</Badge>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">
                  {product.short_description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Product Code: {product.product_code}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Stock: {product.available_stock} units
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary rounded-full">
                <User className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-medium">
                  {product.seller.data.first_name}{" "}
                  {product.seller.data.last_name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{product.seller.data.country}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Options - Right Column */}
      <div className="md:col-span-2">
        <Card className="sticky top-4">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  {product.item_price}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.available_stock > 0
                    ? `${product.available_stock} units available`
                    : "Currently out of stock"}
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium mb-2"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max={product.available_stock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 mx-2 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.available_stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm mb-1">Subtotal</p>
                  <p className="text-lg font-semibold">
                    $ {product.item_price * quantity}
                  </p>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={addItemToCart}
                  disabled={product.available_stock <= 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
