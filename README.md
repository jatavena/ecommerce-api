# E-Commerce REST API

This project is a **practice project** for the Codecademy Full-Stack Career Path, focusing on back-end development.

---

## 1. Introduction and Objectives

### 1.1 Project Objective

The goal of this project is to produce a **fully-functional e-commerce REST API**.

- **API (Application Programming Interface):** A specification that allows applications to communicate with each other.  
- **REST (Representational State Transfer):** An architectural style for providing standardized communication between applications over the internet.

The project requires implementing the following functionality:

- Build a functioning e-commerce REST API using **Express, Node.js, and PostgreSQL**.  
- Allow users to **register and log in** via the API.  
- Provide **CRUD operations** on products, user accounts, user carts, and orders.  
- Allow users to **place orders**.  
- Use **Git version control** and the command line for development.  
- Develop locally and document the API using **Swagger/OpenAPI**.

### 1.2 Project Management

- **Backlog Management:** Managed via GitHub Projects with a **Kanban workflow**.  
- **Version Control:** GitHub is used for source control and collaborative development.  

---

## 2. Setup and Technologies Used

- **Server:** Express 5.2.1, Node.js  
- **Authentication & Security:**  
  - `express-session` for cookies and session management  
  - `bcrypt` for hashing passwords  
  - `passport` & `passport-local` for user authentication  
- **Environment Management:** `dotenv` 17.2.3  
- **Database:** `pg` module for PostgreSQL connections  
- **Development Tools:** `nodemon` 3.1.11 for auto-reloading during development  
- **API Documentation:** OpenAPI 3.0 with Swagger  
- **Version Control:** GitHub  

---

## 3. Database Plan

The database schema was designed to closely match project requirements, avoiding unnecessary tables.

**Design principles:**

- Normalize data to reduce redundancy.  
- Use meaningful, consistent naming conventions (e.g., `user_id` vs. `customer_id`).  
- Ensure referential integrity between tables (`users`, `products`, `carts`, `orders`, etc.).  

---

## 4. OpenAPI and Swagger

The API was designed using **OpenAPI 3.0** and documented with **Swagger**, an industry-standard approach for API design.

**Benefits of this approach:**

- Promotes consistent endpoint design.  
- Allows clear API documentation, including request/response examples via `components`.  
- Uses `tags` to organize endpoints into categories.  
- `.yaml` experience provided insights into structured API documentation.

> This design-first approach improves development speed and reduces cognitive load during implementation.

---

## 5. Architectural Considerations – Repository Pattern

The server follows a **modular and hierarchical architecture**:

- **Routes:** Defined in `/routes` (e.g., `orders.routes.js`) and contain only routing logic.  
- **Controllers:** Handle business logic, requests, responses, and status codes (`/controllers`).  
- **Repositories:** Contain SQL queries and database operations (`/repositories`).  

**Advantages:**

- Separation of concerns makes the codebase easier to **maintain, extend, and debug**.  
- Encourages **reusability** of business logic and database interactions.  

---

## 6. Reflection

The project provided **practical experience** in designing and implementing a back-end REST API.  

### 6.1 Challenges and Lessons Learned

- Database modeling was more complex than expected; consistent naming is crucial.  
- API design with Swagger took longer initially, but simplified coding and reduced errors later.  
- Controller/repository logic became easier after implementing the first endpoints (`/users`, `/users/:id`).  
- Transactions and order placement: Learning how to properly use `BEGIN`, `COMMIT`, and `ROLLBACK` in PostgreSQL was essential for safe order processing.  
- Error handling and debugging: Using `throw new Error()` and structured logging helped identify otherwise invisible issues.  
- Database optimization: Indexes could improve performance in production, but were unnecessary in this small practice dataset.  

### 6.2 Mistakes to Avoid

- Inconsistent naming (e.g., `user_id` vs `customer_id`) caused potential logical conflicts.  
- Careful testing is necessary to prevent **data integrity and security issues** when reusing code across modules.  

### 6.3 Overall Takeaways

- Improved proficiency in **Express.js, authentication, sessions, database interactions, modular architecture, and error handling**.  
- Learned the importance of **planning and design** before coding, particularly for scalable, maintainable back-end systems.
