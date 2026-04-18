# 🌿 Urban Farming API

A robust and scalable backend solution designed to bridge the gap between urban farmers, consumers, and farm-space owners. This platform enables users to purchase organic products, rent farm plots, share agricultural tips, and manage professional vendor certifications.

---

## 🚀 Key Features

* **Secure Authentication:** JWT-based login and registration with Role-Based Access Control (Admin, Vendor, User).
* **Vendor Ecosystem:** Dedicated profiles for farmers to showcase products and manage organic certifications.
* **Rental Marketplace:** A unique system for listing and booking urban farm spaces/plots.
* **E-commerce Workflow:** Full shopping cart management and seamless order processing.
* **Community Engagement:** Social feed for users to post farming tips and experiences.
* **API Documentation:** Fully interactive documentation powered by Swagger/OpenAPI.

---

## 🛠 Tech Stack

* **Language:** TypeScript
* **Framework:** Node.js / Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Auth:** JSON Web Token (JWT)
* **Documentation:** Swagger (OpenAPI 3.0.0)

---

## 📋 Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd urban-farming-backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and configure it as follows:
    ```env
    PORT=5000
    DATABASE_URL="postgresql://db_name:password@localhost:5432/urban_farming?schema=public"
    NODE_ENV=development

    JWT_ACCESS_SECRET=super_access_secret
    JWT_REFRESH_SECRET=super_refresh_secret

    JWT_ACCESS_EXPIRES_IN=1d
    JWT_REFRESH_EXPIRES_IN=7d
    ```

4.  **Database Migration & Client Generation:**
    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

5.  **Start the Server:**
    ```bash
    npm run dev
    ```

---

## 📖 API Documentation (Swagger)

This project uses **Swagger UI** for interactive API documentation. You can test all endpoints, view request/response schemas, and handle authentication directly from the browser.

* **Swagger UI URL:** `http://localhost:5000/api-docs`
* **OpenAPI Spec:** Find the raw YAML/JSON spec in `docs/openapi.yaml`.

---

## 🔌 API Endpoints Summary

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Create a new account |
| `POST` | `/api/v1/auth/login` | Login and receive Access & Refresh Tokens |

### Vendor
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/vendors` | Create vendor profile |
| `GET` | `/api/v1/vendors` | Get all vendors |

### Category
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/categories` | Create category (Admin only) |
| `GET` | `/api/v1/categories` | Get all categories |

### Product
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/products` | Get products with filter & pagination |
| `POST` | `/api/v1/products` | Add new product (Vendor only) |

### Cart
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/cart` | Add product to cart |
| `GET` | `/api/v1/cart` | Get my cart |
| `DELETE` | `/api/v1/cart/{productId}` | Remove item from cart |

### Order
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/orders` | Create order from cart |
| `GET` | `/api/v1/orders` | Get my orders |

### Farm Rentals
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/rentals` | Create farm space |
| `GET` | `/api/v1/rentals` | Browse available farm plots |
| `POST` | `/api/v1/rentals/book` | Book a space for specific dates |

### Certification
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/certifications` | Submit certification (Vendor only) |
| `GET` | `/api/v1/certifications` | Get all certifications (Admin only) |

### Community
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/community` | Create community post |
| `GET` | `/api/v1/community` | Get all community posts |

---

## 🔐 Security

To access protected routes, include the JWT in your request header:
`Authorization: Bearer <your_access_token>`

In **Swagger UI**, click the **"Authorize"** button and enter your Bearer token to test locked endpoints.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

### 👨‍💻 Developed By
**Mahmudul Hasan Rifat** *Full-stack Web Developer | MERN & Next.js Specialist* [GitHub Profile](https://github.com/rifat-mahmudul)