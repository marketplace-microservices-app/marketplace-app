import Navbar from "@/components/nav-bar";
import OrdersPage from "@/components/orders-page";

export const metadata = {
  title: "My Orders | NextAuth",
  description: "View your order history",
};

export default function Orders() {
  return (
    <>
      <Navbar />
      <OrdersPage />
    </>
  );
}
