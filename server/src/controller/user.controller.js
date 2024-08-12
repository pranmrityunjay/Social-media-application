import { User } from "../models/user.models.js";

export const getUser = async (req, res)=>{
    const {id} = req.params;
    console.log("id", id)
    try {
        const user = await User.findById(id);
        res.status(200).json(user)
        
    } catch (error) {
        res.status(404).json({message: error.message})
        
    }
}

export const getUserFriends = async(req, res)=>{
    const {id} = req.params;
   try {
     const user = await User.findById(id);
     const friends = await Promise.all(
         user.friends.map((id)=>user.findById(id))
     )
 
     const formattedFriends = friends.map(
         ({_id, firstName, lastName, occupation, location, picturePath})=>{
             return {_id, firstName, lastName, occupation, location, picturePath}
 }
     )
 
     res.status(200).json(formattedFriends)
   } catch (error) {
    res.status(404).json({message: err.message});
    
   }
}

export const addRemoveFriends = async(req, res)=>{
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=> id !== friendId);
            friend.friends = friend.friend.filter((id)=> id !== id)
        }else{
            user.friends.push(friendId)
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
    } catch (error) {
        
    }
}
