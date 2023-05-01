import express from "express";
import playerRoutes from "./routes/playerRoutes.js";
import clanRoutes from "./routes/clanRoutes.js";

const App = express();

App.use(express.json());

App.use("/players", playerRoutes);
App.use("/clans", clanRoutes);

export default App;
