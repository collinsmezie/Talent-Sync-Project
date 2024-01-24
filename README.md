# TalentSync - Blog API


## Link to Database schema [UML Here](https://lucid.app/lucidchart/b7868ea9-a7b3-4cd7-b3b2-c3b98ecc706d/edit?beaconFlowId=2A536D39562C4F79&invitationId=inv_92f5173c-e32c-4a27-af7f-54e028ce5df5&page=0_0#)

## Link to [UML Here](https://lucid.app/lucidchart/ed1e2be9-c5e6-4766-b212-27566feeb9ea/edit?invitationId=inv_3af95dc5-1f2d-4f44-9f80-11e19e18b99b&page=0_0#) for API design 



# API Documentation

This documentation outlines the usage of the TalentSync Blog REST API. The API allows you to perform basic CRUD (Create, Read, Update, Delete) operations on a collection of posts stored in a MongoDB database.

## API Base URL

The base URL for all API endpoints is https://talentsync-api.onrender.com
Send Requests from your favorite API clients like Postman and Thunderclient

## Standard Formats for Requests and Responses

**Request Format:** The API accepts JSON-formatted requests.

**Response Format:** The API responds with JSON-formatted data.

## Endpoints

### 1. Signup - Create a New User

- **Endpoint:** `POST /signup`
- **Request Body:**
  - `email` (string): The email of the user to be created.
  - `password` (string): The password of the user to be created.
- **Possible Responses:**
  - `200 OK`: The user was created successfully. The response includes the newly created user's data.

    ```json
    {
      "message": "Signup successful, You can now login with your credentials",
      "user": {
      "email": "collins@gmail.com",
      "password": "$2b$10$TVq0l9GpMX06uGgGwL7B7eTVwkRB3z.igBa8v2qF0SYm.bjBzVkEW",
      "_id": "65b13cf35ddf55ea8b77fd4a"
      }
    }
    ```

  - `400 Bad Request`: Email already taken.
  - `400 Bad Request`: Missing credentials or password is too short
  - `500 Internal Server Error`: An error occurred while creating the user




### 2. Login - Login Existing User

- **Endpoint:** `POST /login`
- **Request Body:**
  - `email` (string): The email of the existing user.
  - `password` (string): The password of the existing user.
- **Possible Responses:**
  - `200 OK`: The user was logged in successfully. The response includes the newly created token.

    ```json
    {
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....."
    }
    ```

  - `400 Bad Request`: User not found.
  - `400 Bad Request`: Missing credentials
  - `400 Bad Request`: Wrong Password 
  - `500 Internal Server Error`: An error occurred.




### 3. Get All Posts

- **Endpoint:** `GET api/posts`
- **Responses:**
  - `200 OK`: The list of posts was fetched successfully.

    ```json
    {
       {
        "_id": "65ae994b4b50c29b4ec36134",
        "title": "MongoDB",
        "author": "Carmak J",
        "content": "Server is running on port 5000 Connected to MongoDB Successfully",
        "created": "22-01-2024 17:35:23",
        "updated": "22-01-2024 17:27:21"
      },
      {
        "_id": "65aea621aa5e3ac25b721ee6",
        "title": "Ruby on rails",
        "author": "Berners Lee",
        "content": "ROR is a web development framework",
        "created": "22-01-2024 17:30:09",
        "updated": "22-01-2024 17:31:57"
      }
    }
    ```

  - `500 Internal Server Error`: An error occurred while fetching the posts.



  ## JWT Protected Routes


  ### 4. Get Post by ID

- **Endpoint:** `GET /api/posts/:postId`
- **Responses:**
  - `200 OK`: The post was found successfully. The response includes the post data.

    ```json
    {
      "_id": "65aea621aa5e3ac25b721ee6",
      "title": "Ruby on rails",
      "author": "Berners Lee",
      "content": "ROR is a web development framework",
      "created": "22-01-2024 17:30:09",
      "updated": "22-01-2024 17:31:57"
    }
    ```

  - `404 Not Found`: The post with the specified ID was not found.

    ```json
    {
      "error": "Post not found"
    }
    ```

  - `500 Internal Server Error`: An error occurred while fetching the post.



 ### 5. Create New Post

- **Endpoint:** `POST /api/posts/`
- **Request Body:** The post data 
```json
    {
      "title": "Fantasy Grill",
      "author": "Mira", 
      "content": "Once upon a time... The end"
    }

```
- **Responses:**
  - `200 OK`: The post was created successfully. The response includes the newly created post data.

    ```json
    {
      "title": "Fantasy Grill",
      "author": "Mira",
      "content": "Once upon a time... The end",
      "created": "23-01-2024 14:20:22",
      "updated": null,
      "_id": "65afbd163b93aa94cd67cadc"
    }
    ```

  - `500 Internal Server Error`: An error occurred while creating the Post.


### 6. Update Post by ID

- **Endpoint:** `PUT /api/posts/:postId`
- **Request Body:** The updated post fields.
```json
{
  "author": "Mira Sonya"
}

```
- **Responses:**
  - `200 OK`: The Post was updated successfully.

    ```json
    {
      "_id": "65afbd163b93aa94cd67cadc",
      "title": "Fantasy Grill",
      "author": "Mira Sonya",
      "content": "Once upon a time... The end",
      "created": "23-01-2024 14:20:22",
      "updated": "23-01-2024 14:22:20",
      "__v": 0
    }
    ```


  - `404 Not Found`: The Post with the specified ID does not exist.


    ```json
    {
      "error": "Post not found"
    }
    ```

  - `500 Internal Server Error`: An error occurred while updating the Post.

### 7. Delete Post by ID

- **Endpoint:** `DELETE /api/posts/:postId`
- **Responses:**
  - `200 OK`: The post was deleted successfully.

    ```json
    {
      "message": "Post deleted successfully"
    }
    ```

  - `404 Not Found`: The Post with the specified ID does not exist.

    ```json
    {
      "error": "Post not found"
    }
    ```

  - `500 Internal Server Error`: An error occurred while deleting the Post.

## Sample Usage

1. Create a New User

   ```http
   POST /signup
   Content-Type: application/json

   {
     "email": "ekene@gmail.com",
     "password": "ekene123"
   }

   
2. Login existing User

   ```http
   POST /login
   Content-Type: application/json

   {
     "email": "ekene@gmail.com",
     "password": "ekene123"
   }


3. Get Post by ID

   ```http
   GET /api/posts/5ffdb3b243454f35d8f41e12


4. Get All Posts

    ```http
    GET /api/posts


5. Create Posts

    ```http
    POST /api/posts
    Content-Type: application/json

    
```json
{
  "title": "Kotlin",
  "author": "Andrew NG",
  "content": "A dynamic language"
}
```


6. Update Post by ID

    ```http
    PUT /api/posts/5ffdb3b243454f35d8f41e12
    Content-Type: application/json

```json
{
  "content": "A programming language"
}
```

7. Delete Post by ID

```http
DELETE /api/posts/5ffdb3b243454f35d8f41e12
```




## Known Limitations and Assumptions

- The initial loading time may take longer due to occasional server spin down (Free hosting)
- The API assumes a MongoDB database is set up and running.
- The API does include authentication/authorization mechanisms.

## Setting Up and Deploying the API

### Locally

1. Clone the repository containing the API code.
2. Install the required dependencies using `npm install`.
3. Set up a MongoDB database and obtain the connection URI.
4. Update the `uri` variable in the code with your MongoDB connection URI.
5. Run the API using `npm start`.
6. The API will be available locally at http://localhost:3000.

### On a Server

1. Follow steps 1 to 4 from the local setup instructions.
2. Choose a server hosting provider (e.g., AWS, Heroku, or Render).
3. Deploy the API code to the server.
4. Update the `uri` variable in the code with your production MongoDB connection URI.
5. Start the API on the server.
6. The API will be available at the server's URL.
