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


## Request parameters For Quize creation


{
  "title": "Quiz Title",
  "questions": [
    {
      "text": "Question 1?",
      "options": ["option 1", "option 2", "option 3", "option 4"],
      "correct_option": 1
    },
    .,
    .,
    .,
    .
  ]
}'





