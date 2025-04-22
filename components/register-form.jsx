"use client";

import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postData } from "@/lib/apiService";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();
  //   const { toast } = useToast();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "buyer",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleRoleChange = (value) => {
    setFormState((prev) => ({ ...prev, role: value }));

    // Clear country error when switching to buyer
    if (value === "buyer" && errors.country) {
      setErrors((prev) => ({ ...prev, country: null }));
    }
  };

  const handleCountryChange = (value) => {
    setFormState((prev) => ({ ...prev, country: value }));
    if (errors.country) {
      setErrors((prev) => ({ ...prev, country: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If Buyer delete country key value pair from formState object
    if (formState.role === "buyer") {
      delete formState.country;
    }

    // Do API call
    const response = await postData("auth/register", formState);
    if (response.status !== 201 || !response) {
      setErrors(response.error);
      setIsSubmitting(false);

      toast.error(`Something went wrong!`, {
        description: "There was an error creating your account.",
        variant: "error",
      });

      return;
    }
    // Handle success
    toast.success(`Account created successfully!`, {
      description: "You can now log in.",
      variant: "success",
    });

    redirect("/login");

    // console.log("Form submitted:", formState);
  };

  const countries = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "IN", label: "India" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="••••••••"
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Password must be at least 8 characters with a number, letter, and
          special character.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            placeholder="John"
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Account Type</Label>
        <RadioGroup
          value={formState.role}
          onValueChange={handleRoleChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="buyer" id="buyer" />
            <Label htmlFor="buyer" className="cursor-pointer">
              Buyer
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="seller" id="seller" />
            <Label htmlFor="seller" className="cursor-pointer">
              Seller
            </Label>
          </div>
        </RadioGroup>
        {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
      </div>

      {formState.role === "seller" && (
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={formState.country} onValueChange={handleCountryChange}>
            <SelectTrigger className={errors.country ? "border-red-500" : ""}>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country}</p>
          )}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
