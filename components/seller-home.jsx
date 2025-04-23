"use client";

import { useState, useEffect, use } from "react";
import ProductGrid from "./product-grid";
import CreateProductForm from "./create-product-form";
import { fetchData } from "@/lib/apiService";

import { useSelector } from "react-redux";

const CURRENT_SELLER_ID = "e016f334-42bf-4619-a8a7-eeb4fa6aee5f";

import { Package } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

// const productsOfSeller = [
//   {
//     id: "78a63aa4-7d9d-4509-a307-bb88aae6356c",
//     product_code: "PROD003",
//     product_name: "Noise Cancelling Headphones",
//     short_description: "Over-ear wireless headphones with noise canceling",
//     item_price: "129.99",
//     available_stock: 40,
//     seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//     seller: {
//       data: {
//         id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//         user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
//         first_name: "John",
//         last_name: "Doe",
//         country: "USA",
//       },
//     },
//   },
//   {
//     id: "d47ef880-06cd-4fdc-aa63-1dad7b02b2ce",
//     product_code: "PROD001",
//     product_name: "Wireless Mouse",
//     short_description: "Ergonomic wireless mouse with USB receiver",
//     item_price: "25.99",
//     available_stock: 132,
//     seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//     seller: {
//       data: {
//         id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//         user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
//         first_name: "John",
//         last_name: "Doe",
//         country: "USA",
//       },
//     },
//   },
//   {
//     id: "98cb5139-6c88-4001-9144-69fae28d7e9f",
//     product_code: "PROD002",
//     product_name: "Mechanical Keyboard",
//     short_description: "RGB backlit mechanical keyboard, blue switches",
//     item_price: "74.50",
//     available_stock: 69,
//     seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//     seller: {
//       data: {
//         id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//         user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
//         first_name: "John",
//         last_name: "Doe",
//         country: "USA",
//       },
//     },
//   },
//   {
//     id: "f45d378b-1a2d-4703-bf2a-31fbac6b7a20",
//     product_code: "PROD005",
//     product_name: "USB-C Hub",
//     short_description:
//       "Multiport USB-C hub with HDMI, USB 3.0, and SD card reader",
//     item_price: "29.99",
//     available_stock: 120,
//     seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//     seller: {
//       data: {
//         id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//         user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
//         first_name: "John",
//         last_name: "Doe",
//         country: "USA",
//       },
//     },
//   },
//   {
//     id: "8f4b4aca-56d7-4bed-b1a4-a81172aa6a54",
//     product_code: "PROD007",
//     product_name: "1080p Webcam",
//     short_description: "Full HD webcam with built-in microphone",
//     item_price: "39.99",
//     available_stock: 110,
//     seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//     seller: {
//       data: {
//         id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//         user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
//         first_name: "John",
//         last_name: "Doe",
//         country: "USA",
//       },
//     },
//   },
//   {
//     id: "a2025334-c1bd-4006-a6b5-bfec1a405178",
//     product_code: "PROD009",
//     product_name: "Wireless Charger",
//     short_description: "Fast wireless charger pad for smartphones",
//     item_price: "19.99",
//     available_stock: 140,
//     seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//     seller: {
//       data: {
//         id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//         user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
//         first_name: "John",
//         last_name: "Doe",
//         country: "USA",
//       },
//     },
//   },
//   {
//     id: "3320a259-b206-48f9-b6f9-a3d41d4e7ad1",
//     product_code: "PROD011",
//     product_name: "Gaming Chair",
//     short_description: "Ergonomic chair designed for gamers",
//     item_price: "129.99",
//     available_stock: 40,
//     seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//     seller: {
//       data: {
//         id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
//         user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
//         first_name: "John",
//         last_name: "Doe",
//         country: "USA",
//       },
//     },
//   },
// ];

export default function SellerHome() {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetchData(
        `product/get-all-products-by-userId/${user.id}`,
        null
      );
      setProducts(response?.products || []);
      setLoading(false);
    };

    fetchProducts();
  }, []); // Refecth on skip and take change

  const newlyAddedProduct = async (newProduct) => {
    console.log(`newlyAddedProduct`, newProduct);

    const productWithId = {
      ...newProduct,
      id: "67a1d6f-0fc1-400f-bd5a-242c462323ad0",
      seller_id: CURRENT_SELLER_ID,
      seller: {
        data: {
          id: CURRENT_SELLER_ID,
          user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
          first_name: "John",
          last_name: "Doe",
          country: "USA",
        },
      },
    };

    console.log(productWithId);

    setProducts([productWithId, ...products]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">My Products</h2>
            <div className="text-sm text-muted-foreground">
              Showing {products.length} products
            </div>
          </div>{" "}
          {products?.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="flex justify-center mb-4">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  No Products from Seller found
                </h2>
              </CardContent>
            </Card>
          ) : (
            <ProductGrid products={products} viewType="seller" />
          )}
        </div>
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <CreateProductForm
              onProductCreated={newlyAddedProduct}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
