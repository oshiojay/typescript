import {Request, Response} from "express"
import bcrypt from "bcrypt"
import {UserModel} from "../models/userModel"

export const createUser = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password) {
            return res.status(404).json({
                error: "name, email and password are required"
            })
        }

        const existingUser = await UserModel.findByEmail(email)
        if (existingUser){
            return res.status(409).json({
                error: "Email already exist"
            })
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = await UserModel.create({
            name,
            email: email.toLowerCase(),
            password: hashed
        })

        res.status(201).json({
            error: "User created successfully",
            data: user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
}


export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const user = await UserModel.findById(id)
        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }

         const {name, email, password} = req.body
         const data: {name?: string, email?: string, password?: string} = {}

         if (name) data.name= name 
         if (email) data.email = email
         if (password) data.password = await bcrypt.hash(password, 10) 

        const updatedUser = await UserModel.update(id, data)

        res.status(200).json({
            error: "Profile updated successfully",
            data: updatedUser
        })
         

    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const user = await UserModel.findById(id)
        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }

        await UserModel.remove(id)
        res.status(200).json({
            error: "User deleted successfully",
            data: user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
}


export const getAll = async (req: Request, res: Response) => {
    try {
        const allUser = await UserModel.findAll()
        res.status(200).json({
            message: "Users retrieved successfully",
            data: allUser
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const user = await UserModel.findById(id)
        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }
        res.status(200).json({
            message: "User retrieved successfully",
            data: user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
}