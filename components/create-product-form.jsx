"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { fetchData, postData } from "@/lib/apiService";

export default function CreateProductForm({ onProductCreated, user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productCode: "",
    productName: "",
    shortDesc: "",
    itemPrice: "",
    availableStock: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    // Get Seller Data using User Id
    const sellerDataResponse = await fetchData(
      `users/get-seller-details-from-userId/${user.id}`
    );

    if (sellerDataResponse) {
      toast.error(sellerDataResponse.message);
    }

    const createProductPayload = {
      ...formData,
      sellerId: sellerDataResponse.data.id,
    };

    console.log("createProductPayload", createProductPayload);

    setIsSubmitting(true);

    try {
      const response = await postData(`product/create`, createProductPayload);
      console.log("createProductResponse", response);

      if (response.status !== 201 || !response) {
        setError(response.message);
        setIsSubmitting(false);

        toast.error(error, {
          description: "There was an issue with creating the product",
          variant: "error",
        });

        return;
      } else if (response.status === 201) {
        toast.success(response.message, {
          title: "Product Created!",
          description: "Your product has been successfully created.",
        });

        // Call the passed parent function to update parent state about the new product
        console.log("onProductCreated", onProductCreated);
        if (onProductCreated) {
          console.log("created product", response.data);
          onProductCreated(response.data);
        }
      }

      setIsSubmitting(false);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);

      toast.error(error, {
        description: "There was an issue with creating the product",
        variant: "error",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productCode">Product Code</Label>
            <Input
              id="productCode"
              name="productCode"
              placeholder="e.g., PROD012"
              value={formData.productCode}
              onChange={handleChange}
              className={errors.productCode ? "border-red-500" : ""}
            />
            {errors.productCode && (
              <p className="text-sm text-red-500">{errors.productCode}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              name="productName"
              placeholder="e.g., Smart Watch"
              value={formData.productName}
              onChange={handleChange}
              className={errors.productName ? "border-red-500" : ""}
            />
            {errors.productName && (
              <p className="text-sm text-red-500">{errors.productName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDesc">Short Description</Label>
            <Textarea
              id="shortDesc"
              name="shortDesc"
              placeholder="Brief description of your product"
              rows={3}
              value={formData.shortDesc}
              onChange={handleChange}
              className={errors.shortDesc ? "border-red-500" : ""}
            />
            {errors.shortDesc && (
              <p className="text-sm text-red-500">{errors.shortDesc}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.shortDesc.length}/100 characters
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemPrice">Price ($)</Label>
              <Input
                id="itemPrice"
                name="itemPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="99.00"
                value={formData.itemPrice}
                onChange={handleChange}
                className={errors.itemPrice ? "border-red-500" : ""}
              />
              {errors.itemPrice && (
                <p className="text-sm text-red-500">{errors.itemPrice}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableStock">Available Stock</Label>
              <Input
                id="availableStock"
                name="availableStock"
                type="number"
                min="0"
                step="1"
                placeholder="85"
                value={formData.availableStock}
                onChange={handleChange}
                className={errors.availableStock ? "border-red-500" : ""}
              />
              {errors.availableStock && (
                <p className="text-sm text-red-500">{errors.availableStock}</p>
              )}
            </div>
          </div>
        </CardContent>
        <br />
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
