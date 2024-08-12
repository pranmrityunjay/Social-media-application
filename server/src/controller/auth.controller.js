
import jwt from 'jsonwebtoken'
 // Ensure bcrypt is imported
import bcrypt from 'bcrypt';
import { User } from '../models/user.models.js'; // Adjust the path as needed

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, picturePath, location, occupation } = req.body;
        console.log(req.body)
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
         
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("All is fine")
        // Create a new user
        const newUser = new User({
            username:"ok",
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            location,
            occupation
        });
        console.log(newUser)
        await newUser.save();
       
        // Respond with the created user
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token, user });
        
    } catch (error) {
        console.error("Error logging in:", error); // Log the full error
        res.status(500).json({ error: error.message });
    }
};
