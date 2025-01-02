# Quiz App API

### Using Docker

1. Clone the repository.
2. Ensure Docker and Docker Compose are installed.
3. Run the following command to build and start the containers:
   ```bash
   docker-compose up --build

## API Endpoints

### Create Quiz
**POST** `/api/quizzes`
      
       

### Get Quiz
**GET** `/api/quizzes/:id`

### Submit Answer
**POST** `/api/quizzes/:quizId/questions/:questionId/answer`

### Get Results
**GET** `/api/quizzes/:quizId/results/:userId`

## Known Issues
- Currently, no authentication is implemented.
- Limited to in-memory data for partial results.


## import collection file  Quize App.postman_collection.json 
- set http://localhost:3000/api as {{base_url}}




