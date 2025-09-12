import { fakerES as fa } from "@faker-js/faker";
import { createHash } from "../utils/hash.js";
import { usersService, petsService } from "../services/index.services.js";

export const getMockedUsers = (count) => {
  const first_name = fa.person.firstName();
  const last_name = fa.person.lastName();
  return Array.from({ length: count }, () => ({
    first_name,
    last_name,
    email: fa.internet.email({
        firstName: first_name,
        lastName: last_name
    }),
    password: createHash("coder123"),
    role: fa.helpers.arrayElement(["user", "admin"]),
    pets: [],
  }));
};

export const getMockedPets = (count) => {
  return Array.from({ length: count }, () => ({
    name: fa.animal.dog(),
    specie: fa.animal.type(),
    birthDate: fa.date.past(),
    // owner: {
    //   id: fa.number.int({ min: 1000000, max: 9999999 }),
    //   name: fa.person.firstName(),
    // },
    image: fa.image.animal,
  }));
};

export const postGenerateData = async (countUsers, countPets) => {
  const generatedUsers = getMockedUsers(countUsers);
  const generatedPets = getMockedPets(countPets);
  try {
    await usersService.createMany(generatedUsers);
    await petsService.createMany(generatedPets);
  } catch (error) {
    console.error("Error generating mock data:", error);
  }

  return { users: generatedUsers, pets: generatedPets };
};