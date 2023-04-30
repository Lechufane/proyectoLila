import express from "express";
import playerRoutes from "./routes/playerRoutes.js";

const App = express();

App.use(express.json());

App.use("/players", playerRoutes);

export default App;
