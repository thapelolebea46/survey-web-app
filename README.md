📝 Lifestyle Survey Application

📌 Overview

This project was created as part of a practical assessment for an internship opportunity.

The goal is to demonstrate the ability to build a full-stack application that handles user input, data storage, and basic data analysis. 

Deployment is not required — the project is intended to be run and tested locally.


The application is designed to collect survey data about people's lifestyle preferences.

It features a user interface for data entry, a database for persistent storage, and logic for analyzing the collected data.

💡 Features
📋 User Interface – Simple form for survey data collection

🗃 Data Storage – Uses MongoDB to persist survey responses

📊 Data Analysis – Calculates average age, food preferences, and ratings


⚙️ Technologies Used
Frontend: HTML, CSS, JavaScript (with EJS templating)

Backend: Node.js with Express.js

Database: MongoDB

Other Packages:

body-parser – To parse form data

dotenv – For managing environment variables

/public           # Static files (CSS, JS)

/views            # EJS templates

.env              # Environment config

server.js         # Entry point

This was developed as an internship submission, but you're welcome to collaborate or offer feedback.


🛠️ Setup Instructions
Clone the repository

bash

git clone <your-repo-url>


cd lifestyle-survey-app


Install dependencies

bash


npm install


Configure .env


Create a .env file in the root:
with the following


MONGO_URI=your_mongodb_connection_string

PORT=4000


Run the app


bash
npm start


View in browser



http://localhost:4000
🙌

Thapelo Lebea
📫 Email: thapeleolebea46@gmail.com
