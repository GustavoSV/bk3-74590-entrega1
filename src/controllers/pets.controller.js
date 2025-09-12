import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.services.js"
import __dirname from "../utils/index.js";

const getAllPets = async(req,res)=>{
    try {
        const pets = await petsService.getAll();
        res.send({status:"success",payload:pets})
    } catch (error) {
        res.status(500).send({status:"error",error:"Failed to retrieve pets"});
    }
}

const createPet = async(req,res)=> {
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    try {
        const pet = PetDTO.getPetInputFrom({name, specie, birthDate});
        const result = await petsService.create(pet);
        res.send({status:"success",payload:result})
    } catch (error) {
        res.status(500).send({status:"error", error:"Failed to create pet"});
    }
}

const updatePet = async(req,res) =>{
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    try {
        const result = await petsService.update(petId, petUpdateBody);
        res.send({ status: "success", message: "pet updated" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Failed to update pet" });
    }
}

const deletePet = async(req,res)=> {
    const petId = req.params.pid;
    try {
        const result = await petsService.delete(petId);
        res.send({ status: "success", message: "pet deleted" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Failed to delete pet" });
    }
}

const createPetWithImage = async(req,res) =>{
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    if(!file) return res.status(400).send({status:"error",error:"Image is required"});  
    try {
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image:`${__dirname}/../public/img/${file.filename}`
        });
        const result = await petsService.create(pet);
        res.send({status:"success",payload:result})
    } catch (error) {
        res.status(500).send({status:"error",error:"Failed to create pet with image"});
    }
    
}
export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}