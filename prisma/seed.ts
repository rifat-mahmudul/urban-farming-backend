import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, OrderStatus } from "../generated/prisma";
import bcrypt from "bcrypt";

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding started...");

  // USERS
  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@test.com" },
    update: {},
    create: {
      name: "Customer One",
      email: "customer@test.com",
      password: hashedPassword,
      role: Role.CUSTOMER,
    },
  });

  const vendorUser = await prisma.user.upsert({
    where: { email: "vendor@test.com" },
    update: {},
    create: {
      name: "Vendor One",
      email: "vendor@test.com",
      password: hashedPassword,
      role: Role.VENDOR,
    },
  });

  // VENDOR PROFILE
  const vendorProfile = await prisma.vendorProfile.upsert({
    where: {
      userId: vendorUser.id,
    },
    update: {},
    create: {
      userId: vendorUser.id,
      farmName: "Green Organic Farm",
      farmLocation: "Dhaka, Bangladesh",
    },
  });

  // CATEGORY
  const vegetables = await prisma.category.upsert({
    where: { name: "Vegetables" },
    update: {},
    create: { name: "Vegetables" },
  });

  const fruits = await prisma.category.upsert({
    where: { name: "Fruits" },
    update: {},
    create: { name: "Fruits" },
  });

  // PRODUCTS
  const tomato = await prisma.product.create({
    data: {
      name: "Organic Tomato",
      price: 50,
      quantity: 100,
      description: "Fresh organic tomatoes",
      vendorId: vendorProfile.id,
      categoryId: vegetables.id,
    },
  });

  const mango = await prisma.product.create({
    data: {
      name: "Mango",
      price: 120,
      quantity: 50,
      vendorId: vendorProfile.id,
      categoryId: fruits.id,
    },
  });

  // RENTAL SPACE
  const space = await prisma.rentalSpace.create({
    data: {
      vendorId: vendorProfile.id,
      title: "Organic Farm Plot",
      location: "Gazipur",
      size: 100,
      pricePerDay: 500,
    },
  });

  // COMMUNITY POST
  await prisma.communityPost.create({
    data: {
      userId: customer.id,
      postContent: "Excited about urban farming platform",
    },
  });

  // CART
  await prisma.cart.create({
    data: {
      userId: customer.id,
      productId: tomato.id,
      quantity: 2,
    },
  });

  // ORDER
  await prisma.order.create({
    data: {
      userId: customer.id,
      total: tomato.price * 2,
      status: OrderStatus.PENDING,
      items: {
        create: [
          {
            productId: tomato.id,
            quantity: 2,
            price: tomato.price,
          },
        ],
      },
    },
  });

  // CERTIFICATION
  await prisma.sustainabilityCert.create({
    data: {
      vendorId: vendorProfile.id,
      certifyingAgency: "Bangladesh Organic Board",
      certificationDate: new Date(),
    },
  });

  console.log("Seeding completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
