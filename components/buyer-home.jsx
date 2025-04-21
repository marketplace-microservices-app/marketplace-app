import React from "react";
import ProductGrid from "./product-grid";

const products = [
  {
    id: "78a63aa4-7d9d-4509-a307-bb88aae6356c",
    product_code: "PROD003",
    product_name: "Noise Cancelling Headphones",
    short_description: "Over-ear wireless headphones with noise canceling",
    item_price: "129.99",
    available_stock: 40,
    seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
    seller: {
      data: {
        id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
        user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
        first_name: "John",
        last_name: "Doe",
        country: "USA",
      },
    },
  },
  {
    id: "d47ef880-06cd-4fdc-aa63-1dad7b02b2ce",
    product_code: "PROD001",
    product_name: "Wireless Mouse",
    short_description: "Ergonomic wireless mouse with USB receiver",
    item_price: "25.99",
    available_stock: 132,
    seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
    seller: {
      data: {
        id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
        user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
        first_name: "John",
        last_name: "Doe",
        country: "USA",
      },
    },
  },
  {
    id: "98cb5139-6c88-4001-9144-69fae28d7e9f",
    product_code: "PROD002",
    product_name: "Mechanical Keyboard",
    short_description: "RGB backlit mechanical keyboard, blue switches",
    item_price: "74.50",
    available_stock: 69,
    seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
    seller: {
      data: {
        id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
        user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
        first_name: "John",
        last_name: "Doe",
        country: "USA",
      },
    },
  },
  {
    id: "f45d378b-1a2d-4703-bf2a-31fbac6b7a20",
    product_code: "PROD005",
    product_name: "USB-C Hub",
    short_description:
      "Multiport USB-C hub with HDMI, USB 3.0, and SD card reader",
    item_price: "29.99",
    available_stock: 120,
    seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
    seller: {
      data: {
        id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
        user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
        first_name: "John",
        last_name: "Doe",
        country: "USA",
      },
    },
  },
  {
    id: "8f43649e-24a5-489f-ad91-d2ba78e62b71",
    product_code: "PROD006",
    product_name: "Bluetooth Speaker",
    short_description: "Portable Bluetooth speaker with deep bass",
    item_price: "49.99",
    available_stock: 90,
    seller_id: "e0bd2f0b-9bd0-485b-a0f0-adba62c35686",
    seller: {
      data: {
        id: "e0bd2f0b-9bd0-485b-a0f0-adba62c35686",
        user_id: "6a491027-f71e-4fae-a2fa-8d6d2e5141ae",
        first_name: "Jimmy",
        last_name: "Doe",
        country: "IN",
      },
    },
  },
  {
    id: "8f4b4aca-56d7-4bed-b1a4-a81172aa6a54",
    product_code: "PROD007",
    product_name: "1080p Webcam",
    short_description: "Full HD webcam with built-in microphone",
    item_price: "39.99",
    available_stock: 110,
    seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
    seller: {
      data: {
        id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
        user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
        first_name: "John",
        last_name: "Doe",
        country: "USA",
      },
    },
  },
  {
    id: "fb55f3bd-30d5-4986-a5b5-0c04cbfd1e22",
    product_code: "PROD008",
    product_name: "Portable SSD 500GB",
    short_description: "High-speed external solid-state drive",
    item_price: "79.00",
    available_stock: 60,
    seller_id: "e0bd2f0b-9bd0-485b-a0f0-adba62c35686",
    seller: {
      data: {
        id: "e0bd2f0b-9bd0-485b-a0f0-adba62c35686",
        user_id: "6a491027-f71e-4fae-a2fa-8d6d2e5141ae",
        first_name: "Jimmy",
        last_name: "Doe",
        country: "IN",
      },
    },
  },
  {
    id: "a2025334-c1bd-4006-a6b5-bfec1a405178",
    product_code: "PROD009",
    product_name: "Wireless Charger",
    short_description: "Fast wireless charger pad for smartphones",
    item_price: "19.99",
    available_stock: 140,
    seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
    seller: {
      data: {
        id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
        user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
        first_name: "John",
        last_name: "Doe",
        country: "USA",
      },
    },
  },
  {
    id: "2c311606-a1bc-4c71-b4f4-145d6fade805",
    product_code: "PROD010",
    product_name: "Smart LED Bulb",
    short_description: "Color-changing LED bulb controllable via app",
    item_price: "12.50",
    available_stock: 300,
    seller_id: "e0bd2f0b-9bd0-485b-a0f0-adba62c35686",
    seller: {
      data: {
        id: "e0bd2f0b-9bd0-485b-a0f0-adba62c35686",
        user_id: "6a491027-f71e-4fae-a2fa-8d6d2e5141ae",
        first_name: "Jimmy",
        last_name: "Doe",
        country: "IN",
      },
    },
  },
  {
    id: "3320a259-b206-48f9-b6f9-a3d41d4e7ad1",
    product_code: "PROD011",
    product_name: "Gaming Chair",
    short_description: "Ergonomic chair designed for gamers",
    item_price: "129.99",
    available_stock: 40,
    seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
    seller: {
      data: {
        id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
        user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
        first_name: "John",
        last_name: "Doe",
        country: "USA",
      },
    },
  },
];

function BuyerHome() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Welcome to <span className="text-primary">MarketPlace App</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            A secure platform for buyers and sellers to connect and do business.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <ProductGrid products={products} viewType="buyer" />
      </div>
    </div>
  );
}

export default BuyerHome;
