import petModel from "./models/Pet.js";

export default class Pet {
  get = (params) => {
    return petModel.find(params);
  };

  getBy = (params) => {
    return petModel.findOne(params);
  };

  save = (doc) => {
    return petModel.create(doc);
  };

  createMany = (data) => {
    return petModel.insertMany(data);
  };

  update = (id, doc) => {
    return petModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return petModel.findByIdAndDelete(id);
  };
}
