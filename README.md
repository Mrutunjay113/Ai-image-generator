# AI-image-generator
The AI image generation project using MERN stack and DALL-E API is a web application that allows users to generate unique and creative images based on natural language inputs. 
Users can input a description of an image they would like to generate, and the application uses the DALL-E API to create the image. 
The application is built using the MERN stack, which includes MongoDB, Express, React, and Node.js, and uses Axios to make API calls to the DALL-E API. 
The generated images are stored in a MongoDB database and displayed back to the user on the front-end of the application. 

# Run

To run the AI image generation project using MERN stack and DALL-E API, you would need to follow these steps:

Clone the project repository from GitHub onto your local machine.

Install Node.js and MongoDB on your local machine if you haven't already.

Open a terminal or command prompt and navigate to the project directory.

Install the project dependencies by running the following command: npm install

Create a .env file in the project root directory and add the following environment variables:

#file
PORT=3000
MONGO_URI=<your MongoDB connection string>
DALLE_API_KEY=<your DALL-E API key>
