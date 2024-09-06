const User = require("../Model/UserModel.js");

const CreateUser = async (req,res)=>{
    try{
    const data = req.data;
   await User.create(data);
    res.send("user Created").send(data);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error in creating user");
    }
}

const FindUser =async(req,res)=>{
    try{
    const id = req.params.id;
    const data = await User.findOne({ where: { id } });

    if (data) {
        console.log("User found:", data.toJSON());
        res.json({ message: "User found", user: data.createdAt });
    } else {
        console.log("User not found");
        res.status(404).send("User not found");
    }
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
}

const DeleteUser = async (req,res)=>{
    try{
    const id = req.params.id;

    const user = await User.findOne({ where: { id } });

    if (user) {
        await user.destroy();

        console.log("User deleted");
        res.json({ message: "User deleted", user: user.toJSON() });
    } else {
        console.log("User not found");
        res.status(404).send("User not found");
    }
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
}

const UpdateUser = async (req,res)=>{
    try{
    const id = req.params.id;

    const user = await User.findOne({ where: { id } });

    if (user) {
        await user.update(req.body);

        console.log("User updated");
        res.json({ message: "User updated", user: user.toJSON() });
    } else {
        console.log("User not found");
        res.status(404).send("User not found");
    }
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
}

module.exports = {CreateUser,FindUser,DeleteUser,UpdateUser}