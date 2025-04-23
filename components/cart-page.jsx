"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";
import { fetchData, postData } from "@/lib/apiService";

import { clearCart } from "@/redux/cartSlice";

export default function CartPage() {
  const cartProducts = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState(cartProducts);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate total price for a single item
  const calculateItemTotal = (price, quantity) => {
    return Number.parseFloat(price) * quantity;
  };

  // Calculate cart full total
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + calculateItemTotal(item.item_price, item.quantity);
    }, 0);
  };

  // Handle Create Order
  const handleCheckout = async () => {
    setLoading(true);

    // Get BuyerId using UserId
    const { id: buyerId } = (
      await fetchData(`users/get-buyer-details-from-userId/${user.id}`)
    ).data;

    const orderPayload = {
      buyerId: buyerId,
      products: cartItems.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        itemPrice: item.item_price,
        availableStock: item.available_stock,
      })),
    };

    try {
      const response = await postData(`orders/create`, orderPayload);
      console.log("order create", response);

      if (response.status !== 200 || !response) {
        setError(response.message);
        setIsSubmitting(false);

        toast.error(error, {
          description: "There was an issue with placing the order",
          variant: "error",
        });

        setLoading(false);

        return;
      } else if (response.status === 200) {
        toast.success(response.message, {
          title: "Order placed!",
          description: "Your order has been successfully placed.",
        });

        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);

      toast.error(error, {
        description: "There was an issue with placing the order",
        variant: "error",
      });
    }
  };

  const handleClearCart = () => {
    console.log("Clearing Cart...");
    dispatch(clearCart());
    setCartItems([]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
        <div className="flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center"
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link href="/">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const itemTotal = calculateItemTotal(
                item.item_price,
                item.quantity
              );

              return (
                <Card key={item.product_id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center gap-4">
                      <div>
                        <h3 className="font-semibold">{item.product_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Product Code: {item.product_code}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} × {item.item_price}
                        </div>
                        <div className="font-semibold">{itemTotal}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.product_name} × {item.quantity}
                      </span>
                      <span>
                        {calculateItemTotal(item.item_price, item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$ {calculateCartTotal()}</span>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
