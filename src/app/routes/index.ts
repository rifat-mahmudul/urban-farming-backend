import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { VendorRoutes } from "../modules/vendor/vendor.route";
import { ProductRoutes } from "../modules/product/product.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { OrderRoutes } from "../modules/order/order.route";
import { RentalRoutes } from "../modules/rental/rental.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/vendors",
    route: VendorRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/rentals",
    route: RentalRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
