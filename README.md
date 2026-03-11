# School Management API

A Node.js REST API for managing school data.

## Features

- Add schools to database
- List schools sorted by distance from user location

## Tech Stack

Node.js  
Express.js  
MySQL  

## API Endpoints

### Add School
POST /addSchool

Body:
{
"name": "ABC School",
"address": "Hyderabad",
"latitude": 17.3850,
"longitude": 78.4867
}

### List Schools
GET /listSchools?latitude=17.3850&longitude=78.4867

## Setup

npm install  
node server.js

Server runs on:

http://localhost:3333