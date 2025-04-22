"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postData } from "@/lib/apiService";

import { useSelector } from "react-redux";
import { toast } from "sonner";

// Sample orders data
// const ordersData = [
//   {
//     id: "6146014b-e3d9-48de-87c3-871b6a8d9b1d",
//     order_reference: "ORDER-#1016",
//     buyer_id: "0862df85-e0ad-449b-85cd-229903ee4f02",
//     status: "COMPLETED",
//     order_items: [
//       {
//         id: "ec5a662a-9046-42f9-b240-c533c2db1efd",
//         order_reference: "ORDER-#1016",
//         product_id: "d47ef880-06cd-4fdc-aa63-1dad7b02b2ce",
//         product_name: "Wireless Mouse", // Adding product name for display
//         quantity: 10,
//         order_item_price: "25.99",
//       },
//       {
//         id: "4dbb38e3-d688-47f5-b1be-ce550b7dfe49",
//         order_reference: "ORDER-#1016",
//         product_id: "98cb5139-6c88-4001-9144-69fae28d7e9f",
//         product_name: "Mechanical Keyboard", // Adding product name for display
//         quantity: 20,
//         order_item_price: "74.50",
//       },
//     ],
//   },
//   {
//     id: "7a8b9c0d-1e2f-3g4h-5i6j-7k8l9m0n1o2p",
//     order_reference: "ORDER-#1017",
//     buyer_id: "0862df85-e0ad-449b-85cd-229903ee4f02",
//     status: "PENDING",
//     order_items: [
//       {
//         id: "3q4r5s6t-7u8v-9w0x-1y2z-3a4b5c6d7e8f",
//         order_reference: "ORDER-#1017",
//         product_id: "78a63aa4-7d9d-4509-a307-bb88aae6356c",
//         product_name: "Noise Cancelling Headphones",
//         quantity: 1,
//         order_item_price: "129.99",
//       },
//     ],
//   },
//   {
//     id: "9g8h7i6j-5k4l-3m2n-1o0p-9q8r7s6t5u4v",
//     order_reference: "ORDER-#1018",
//     buyer_id: "0862df85-e0ad-449b-85cd-229903ee4f02",
//     status: "PENDING",
//     order_items: [
//       {
//         id: "3w4x5y6z-7a8b-9c0d-1e2f-3g4h5i6j7k8l",
//         order_reference: "ORDER-#1018",
//         product_id: "f45d378b-1a2d-4703-bf2a-31fbac6b7a20",
//         product_name: "USB-C Hub",
//         quantity: 2,
//         order_item_price: "29.99",
//       },
//       {
//         id: "9m0n1o2p-3q4r-5s6t-7u8v-9w0x1y2z3a4b",
//         order_reference: "ORDER-#1018",
//         product_id: "8f43649e-24a5-489f-ad91-d2ba78e62b71",
//         product_name: "Bluetooth Speaker",
//         quantity: 1,
//         order_item_price: "49.99",
//       },
//     ],
//   },
//   {
//     id: "5c6d7e8f-9g0h-1i2j-3k4l-5m6n7o8p9q0r",
//     order_reference: "ORDER-#1019",
//     buyer_id: "0862df85-e0ad-449b-85cd-229903ee4f02",
//     status: "CANCELLED",
//     order_items: [
//       {
//         id: "1s2t3u4v-5w6x-7y8z-9a0b-1c2d3e4f5g6h",
//         order_reference: "ORDER-#1019",
//         product_id: "8f4b4aca-56d7-4bed-b1a4-a81172aa6a54",
//         product_name: "1080p Webcam",
//         quantity: 1,
//         order_item_price: "39.99",
//       },
//     ],
//   },
// ];

export default function OrdersPage() {
  const [ordersData, setOrdersData] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const payload = {
        userId: user.id,
      };

      try {
        const response = await postData(
          `orders/get-all-orders-by-userId`,
          payload
        );
        console.log("my orders", response);
        if (!response || response?.length === 0) {
          toast.error("No Orders found. Please Check again!");
          setLoading(false);
          return;
        } else {
          setOrdersData(response);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        throw err;
      }
    };
    fetchOrders();
  }, []);

  // Toggle order expansion
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Calculate order total
  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => {
      return total + Number(item.order_item_price) * item.quantity;
    }, 0);
  };

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case "COMPLETED":
        return {
          variant: "default",
          icon: CheckCircle,
          label: "Completed",
        };
      case "PROCESSING":
        return {
          variant: "secondary",
          icon: Clock,
          label: "Processing",
        };
      case "CANCELLED":
        return {
          variant: "destructive",
          icon: XCircle,
          label: "Cancelled",
        };
      default:
        return {
          variant: "outline",
          icon: AlertTriangle,
          label: status,
        };
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground mt-1">
          View and track your order history
        </p>
      </div>

      {ordersData?.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex justify-center mb-4">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No orders found</h2>
            <Button asChild>
              <Link href="/">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {ordersData?.map((order) => {
            const isExpanded = expandedOrders[order.id];
            const statusBadge = getStatusBadge(order.status);
            const StatusIcon = statusBadge.icon;
            const orderTotal = calculateOrderTotal(order.order_items);

            return (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="p-4 md:p-6 pb-0 md:pb-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          {order.order_reference}
                        </CardTitle>
                        <Badge variant={statusBadge.variant} className="ml-2">
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusBadge.label}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          Total
                        </div>
                        <div className="font-semibold">{orderTotal}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => toggleOrderExpansion(order.id)}
                      >
                        {isExpanded ? (
                          <>
                            <span>Hide Details</span>
                            <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <span>View Details</span>
                            <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="p-4 md:p-6 pt-4 md:pt-4">
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 text-sm font-medium">
                              Product
                            </th>
                            <th className="text-center p-3 text-sm font-medium">
                              Quantity
                            </th>
                            <th className="text-right p-3 text-sm font-medium">
                              Price
                            </th>
                            <th className="text-right p-3 text-sm font-medium">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {order.order_items.map((item) => (
                            <tr key={item.id}>
                              <td className="p-3 text-sm">
                                {item.product_name}
                              </td>
                              <td className="p-3 text-sm text-center">
                                {item.quantity}
                              </td>
                              <td className="p-3 text-sm text-right">
                                {item.order_item_price}
                              </td>
                              <td className="p-3 text-sm text-right font-medium">
                                {Number(item.order_item_price) * item.quantity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-muted/50">
                          <tr>
                            <td
                              colSpan="3"
                              className="p-3 text-right font-medium"
                            >
                              Order Total
                            </td>
                            <td className="p-3 text-right font-bold">
                              {orderTotal}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
