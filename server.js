const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const { swaggerSetup, swaggerServe } = require("./routes/swagger");
const dotenv = require("dotenv").config();
const logResponseStatus = require("./middleware/logApiHits")

//swagger manual implementation from documentation

connectDb();
const app = express();

const port = process.env.PORT || 5000;

//Middlewares
//this will give a parser which helps in getting data from client and get parsed, as without it, the req body will be undefined
//we need to parse the data from request body and for that we need to use a middleware, which express provides us for json
app.use(express.json());

// Attach the middleware globally to log status codes for all routes
app.use(logResponseStatus);

//this middleware is telling whenever end-point is this go to that file and there we have more routes and http requests

app.get('/', (req, res) => {
    res.send("Hello");
})

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// app.get("/api/contacts", (req,res) => {
//     res.status(200).json({msg : "Get all contacts"});
// });

app.use(errorHandler);

  
app.use("/api-docs", swaggerServe, swaggerSetup);
  

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
