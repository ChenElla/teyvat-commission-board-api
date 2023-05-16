require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5050;
const CommissionRoutes = require('./routes/CommissionRoutes');
const UserRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');

app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);


//Middleware
app.use((_req,_res,next) => {
    console.log("Middleware running");
    next();
})
app.use((req, res, next) => {
    if (
        req.method === "POST" &&
        req.headers["content-type"] !== "application/json"
    ) {
        return res.status(400).send("Hey, the request must be in a proper JSON format");
    }
    // If all is well, continue to the next middleware
    next();
});

//Routes
app.use("/commissions", CommissionRoutes);
app.use("/users", UserRoutes);
app.use("/auth",AuthRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})