"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Save } from "lucide-react";
import { fetchData, postData } from "@/lib/apiService";

export default function EditProductForm({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const response = await fetchData(
        `product/get-product-details-by-productId/${productId}`,
        null
      );
      setProduct(response?.data || []);
      setLoading(false);
    };

    fetchProduct();
  }, []);

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productName: product?.product_name,
    shortDesc: product?.short_description,
    itemPrice: product?.item_price,
    availableStock: product?.available_stock,
  });
  const [initialFormData, setInitialFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      const newFormData = {
        productName: product.product_name,
        shortDesc: product.short_description,
        itemPrice: product.item_price,
        availableStock: product.available_stock,
      };

      setInitialFormData(newFormData);
      setFormData(newFormData);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Get which fields have been modified
    if (value !== initialFormData[name]) {
      setModifiedFields((prev) => ({ ...prev, [name]: true }));
    } else {
      setModifiedFields((prev) => {
        const newState = { ...prev };
        delete newState[name];
        return newState;
      });
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(modifiedFields)?.length === 0) {
      toast({
        title: "No changes detected",
        description: "You haven't made any changes to the product.",
      });
      return;
    }

    const updatedProduct = {
      id: productId,
      ...formData,
    };

    try {
      const response = await postData(`product/update`, updatedProduct);
      console.log("response", response);

      if (response.status !== 200 || !response) {
        setError(response.message);
        setIsSubmitting(false);

        toast.error(error, {
          description: "There was an issue with updating the product",
          variant: "error",
        });

        return;
      } else if (response.status === 200) {
        toast.success(response.message, {
          title: "Product Updated!",
          description: "Your product has been successfully updated.",
        });
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

    setIsSubmitting(true);
  };

  // Check if a field has been modified
  const isFieldModified = (fieldName) => {
    return !!modifiedFields[fieldName];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Product: {product?.product_name}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="productName">Product Name</Label>
                {isFieldModified("productName") && (
                  <span className="text-xs text-primary">Modified</span>
                )}
              </div>
              <Input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className={`${errors.productName ? "border-red-500" : ""} ${
                  isFieldModified("productName") ? "border-primary" : ""
                }`}
              />
              {errors.productName && (
                <p className="text-sm text-red-500">{errors.productName}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="shortDesc">Short Description</Label>
                {isFieldModified("shortDesc") && (
                  <span className="text-xs text-primary">Modified</span>
                )}
              </div>
              <Textarea
                id="shortDesc"
                name="shortDesc"
                rows={3}
                value={formData.shortDesc}
                onChange={handleChange}
                className={`${errors.shortDesc ? "border-red-500" : ""} ${
                  isFieldModified("shortDesc") ? "border-primary" : ""
                }`}
              />
              {errors.shortDesc && (
                <p className="text-sm text-red-500">{errors.shortDesc}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {formData.shortDesc?.length}/100 characters
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="itemPrice">Price ($)</Label>
                  {isFieldModified("itemPrice") && (
                    <span className="text-xs text-primary">Modified</span>
                  )}
                </div>
                <Input
                  id="itemPrice"
                  name="itemPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.itemPrice}
                  onChange={handleChange}
                  className={`${errors.itemPrice ? "border-red-500" : ""} ${
                    isFieldModified("itemPrice") ? "border-primary" : ""
                  }`}
                />
                {errors.itemPrice && (
                  <p className="text-sm text-red-500">{errors.itemPrice}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="availableStock">Available Stock</Label>
                  {isFieldModified("availableStock") && (
                    <span className="text-xs text-primary">Modified</span>
                  )}
                </div>
                <Input
                  id="availableStock"
                  name="availableStock"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.availableStock}
                  onChange={handleChange}
                  className={`${
                    errors.availableStock ? "border-red-500" : ""
                  } ${
                    isFieldModified("availableStock") ? "border-primary" : ""
                  }`}
                />
                {errors.availableStock && (
                  <p className="text-sm text-red-500">
                    {errors.availableStock}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                Product Code:{" "}
                <span className="font-medium">{product?.product_code}</span>{" "}
                (cannot be changed)
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/seller/dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting || Object.keys(modifiedFields)?.length === 0
              }
              className="flex items-center"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
