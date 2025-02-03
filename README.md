# Number Classification API

This is a NestJS-based API that classifies numbers with mathematical properties and fetches a fun fact from NumbersAPI.

## Features
- Checks if a number is **prime, perfect, or Armstrong**.
- Determines if the number is **odd or even**.
- Computes the **digit sum**.
- Retrieves a **fun fact** from NumbersAPI.

## API Endpoint
**GET** `/api/classify-number?number={number}`

### Example Request
https://your-api-name.onrender.com/api/classify-number?number=371


### Example Response (200 OK)
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Example Response (400 Bad Request)
```
{
    "number": "invalid",
    "error": true
}
```

### How to Run Locally
npm install
npm run start:dev

### Deployment
This API is deployed at:
https://your-api-name.onrender.com/api/classify-number?number=371
