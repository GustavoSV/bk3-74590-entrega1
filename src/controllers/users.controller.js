import { usersService } from "../services/index.services.js"

const getAllUsers = async(req,res)=>{
    try {
        const users = await usersService.getAll();
        res.send({status:"success",payload:users})
    } catch (error) {
        res.status(500).send({status:"error",error:"Failed to retrieve users"});
    }
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    try {
        const user = await usersService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error",error:"User not found"})
        res.send({status:"success",payload:user})
    } catch (error) {
        res.status(500).send({status:"error",error:"Failed to retrieve user"});
    }
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    try {
        const user = await usersService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error", error:"User not found"})
        const result = await usersService.update(userId,updateBody);
        res.send({status:"success",message:"User updated"})
    } catch (error) {
        res.status(500).send({status:"error",error:"Failed to update user"});
    }
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    try {
        const result = await usersService.getUserById(userId);
        if(!result) return res.status(404).send({status:"error",error:"User not found"});
        await usersService.delete(userId);
        res.send({status:"success",message:"User deleted"});
    } catch (error) {
        res.status(500).send({status:"error",error:"Failed to retrieve user"});
    }
}


export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}