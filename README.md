#  API Documentation

This repository contains the REST API for a simple blog-like system. It includes user authentication, post creation, update/delete, and commenting functionality. This API is tested using **Postman**.

##  Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for Authentication
- Postman for API testing

##  Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

2. **Install dependencies**

npm install

3. **Set up environment variables**

Create a .env file and add your MongoDB URI, JWT secret, and port.


MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=my_jwt_secret
PORT=5000

4. **Run the server**

npm start

**API Endpoints**

All endpoints are prefixed with: http://localhost:5000/api

------------Authentication----------------------

 Register User
URL: /auth/register

Method: POST

Body:

{
  "name": "Shyam",
  "email": "shyam@gmail.com",
  "password": "123456"
}
-------
 Login User
URL: /auth/login

Method: POST

Body:

{
  "email": "shyam@gmail.com",
  "password": "123456"
}

-------------- Posts----------------------
 Create Post

URL: /posts

Method: POST

Headers: Authorization: Bearer <your_token>

Body:

{
  "title": "My Second Post",
  "content": "Database",
  "tags": ["MongoDB", "MySql", "PostGreSql"]
}
------
 Get All Posts
URL: /posts?page=1&limit=10

Method: GET
------
 Get Single Post
URL: /posts/:id

Method: GET
-------
 Update Post
URL: /posts/:id

Method: PUT

Headers: Authorization: Bearer <your_token>

Body:
{
  "title": "Updated Title",
  "content": "Updated Content"
}
-------
 Delete Post
URL: /posts/:id

Method: DELETE

Headers: Authorization: Bearer <your_token>

---------------- Comments----------------------
 Add Comment
URL: /comments/:postId

Method: POST

Headers: Authorization: Bearer <your_token>

Body:

{
  "text": "This is my Krishna comment"
}
-----
 List Comments
URL: /comments/:postId

Method: GET

Headers: Authorization: Bearer <your_token>

--------------- Testing with Postman------------------

Import the Postman_collection.json file in the Postman app.

Set the environment variable base_url to http://localhost:5000.

Generate a token via the login route and use it in the Authorization header as:

Bearer <your_token>

----------Author-------------

Krishna Shukla



