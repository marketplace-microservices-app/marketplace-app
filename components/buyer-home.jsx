"use client";
import React, { useState, useEffect } from "react";
import ProductGrid from "./product-grid";
import { fetchData } from "@/lib/apiService";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function BuyerHome() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentPage = Math.floor(skip / take) + 1;
  const totalPages = Math.ceil(total / take);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetchData(
        `product/get-all-products/paginated?skip=${skip}&take=${take}`,
        null
      );
      setProducts(response?.data || []);
      setTotal(response?.total || 0);
      setLoading(false);
    };

    fetchProducts();
  }, [skip, take]); // Refecth on skip and take change

  const goToPage = (page) => {
    setSkip((page - 1) * take);
  };

  const handlePrevious = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const renderPaginationLinks = () => {
    const pagesToShow = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesToShow.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={(e) => {
              e.preventDefault();
              goToPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pagesToShow;
  };

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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ProductGrid products={products} viewType="buyer" />
        )}
      </div>

      {totalPages > 1 && (
        <div className="fixed bottom-0 left-0 w-full bg-white py-20 shadow-md">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePrevious();
                  }}
                />
              </PaginationItem>

              {renderPaginationLinks()}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default BuyerHome;
