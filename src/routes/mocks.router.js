import { Router } from "express";
import { getMockedPets, getMockedUsers, postGenerateData } from "../controllers/mocks.controller.js";

const mocksRouter = Router();

mocksRouter.get("/mockingusers", (req, res) => {
  const { countUsers } = req.body;
  const mockedUsers = getMockedUsers(countUsers);
  res.json(mockedUsers);
});

mocksRouter.get("/mockingpets", (req, res) => {
  const { countPets } = req.body;
  const mockedPets = getMockedPets(countPets);
  res.json(mockedPets);
});

mocksRouter.post("/generateData", async (req, res) => {
  const { countUsers, countPets } = req.body;

  if (!countUsers && !countPets) {
    return res.status(400).json({ error: "Please provide at least one of countUsers or countPets." });
  }
  if (!countUsers) countUsers = 1;
  if (!countPets) countPets = 1;

  const generatedUsers = getMockedUsers(countUsers);
  const generatedPets = getMockedPets(countPets);

  if (generatedUsers.length === 0 && generatedPets.length === 0) {
    return res.status(404).json({ error: "No data generated." });
  }

  const datos = await postGenerateData(countUsers, countPets);

  res.setHeader('Content-Type','application/json');
    return res.status(200).json({datos: { users: datos.users, pets: datos.pets }});
});

export default mocksRouter;
