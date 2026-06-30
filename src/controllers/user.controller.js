import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinar} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    
    const {fullName, username, email, password} = req.body
    console.log(username, email);
    
    if (fullName === "" || username === "" || email === "" || password === "") {
        throw new ApiError(400, "All fields are required")
    }

    const ExistedUser = User.findOne({username, email})

    if(ExistedUser){
        throw new ApiError(409,"User with email or username already existed")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError("400", "avatar file is required")
    }
    
    const avatar = await uploadOnCloudinar(avatarLocalPath)
    const coverImage = await uploadOnCloudinar(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError("400", "avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowercase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})




export {registerUser}