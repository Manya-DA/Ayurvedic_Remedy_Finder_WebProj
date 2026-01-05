🌿 Ayurvedic Remedy Finder

An interactive web-based application that helps users discover Ayurvedic remedies for common health symptoms using traditional knowledge enhanced with AI.
The system combines a clean Tailwind CSS UI, PHP backend, database search, Wikipedia integration, and AI-generated insights using Hugging Face models.

🚀 Features

🔍 Search remedies by symptom (e.g., cold, headache, fever)

🌿 Displays Ayurvedic remedy name, herbs used, and description

📚 Fetches herb information from Wikipedia automatically

🤖 AI-generated insights on how herbs help treat symptoms

🎨 Modern, responsive UI built with Tailwind CSS

⚡ Asynchronous data fetching (AJAX-based)

🧠 Combines ancient Ayurvedic knowledge with modern AI

🛠️ Tech Stack

Frontend

HTML5

Tailwind CSS

JavaScript (ES6)

Backend

PHP

MySQL

APIs Used

Wikipedia REST API

Hugging Face Inference API (RoBERTa-based QA model)

📁 Project Structure
Ayurvedic-Remedy-Finder/
│
├── index.html          
├── script.js           
├── search_remedy.php   
├── db.php              
└── README.md          

⚙️ How It Works

User enters a symptom in the search box.

JavaScript sends the request to search_remedy.php.

PHP queries the database for matching remedies.

Results are returned as JSON.

For each remedy:

Herb details are fetched from Wikipedia

AI generates an explanation using Hugging Face

Results are displayed dynamically without page reload.

🗄️ Database Requirements

Create a MySQL database with a table similar to:

CREATE TABLE remedies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  symptom VARCHAR(100),
  remedy_name VARCHAR(100),
  herbs VARCHAR(100),
  description TEXT,
  image_url TEXT
);

🧪 Setup Instructions

Install XAMPP / WAMP / LAMP

Place the project folder inside:

htdocs/


Import the database into phpMyAdmin

Update database credentials in db.php

Start Apache & MySQL

Open in browser:

http://localhost/Ayurvedic-Remedy-Finder/index.html

🔐 Note on API Keys

⚠️ Important:
The Hugging Face API token in script.js should be moved to environment variables or backend for production use.

🎯 Use Cases

Educational Ayurveda learning tool

Mini project for Web Technology / DBMS

Health-tech hackathon prototype

AI-powered traditional medicine assistant

🔮 Future Enhancements

User login & remedy bookmarking

Voice-based symptom input

Multilingual support (Kannada, Hindi)

Doctor/Ayurveda expert validation

Mobile app using Flutter

📜 Disclaimer

This application is for educational purposes only.
It does not replace professional medical advice.

👩‍💻 Author

Manya D A
5th Semester VTU Student
Aspiring Full Stack & AI Developer
