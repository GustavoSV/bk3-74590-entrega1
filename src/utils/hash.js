import { genSaltSync, hashSync, compareSync } from "bcrypt";

// const createHash = (password) => {
//   const salt = genSaltSync(10);
//   const hash = hashSync(password, salt);
//   return hash;
// };
// versión reducida
const createHash = (password) => hashSync(password, genSaltSync(10));

// const verifyHash = (reqPass, mongoPass) => {
//   const verify = compareSync(reqPass, mongoPass);
//   return verify;
// };
// versión reducida
const verifyHash = (reqPass, mongoPass) => compareSync(reqPass, mongoPass);

export { createHash, verifyHash };