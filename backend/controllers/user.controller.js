import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";  // Used for hashing passwords.
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js"; // Utility to transform file data into a format compatible with Cloudinary.
import cloudinary from "../utils/cloudinary.js"; //Used for uploading profile photos.

// Register User
// export const register = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, password, role } = req.body;
//     console.log(fullname, email, phoneNumber, password, role);
//     if (!fullname || !email || !phoneNumber || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false
//       });
//     };
//     // implement cloudinary
//     const file = req.file;
//     const fileUri = getDataUri(file);
//     const cloudResponse = await User.findOne({email});

//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         message: "User already exist with this email.",
//         success: false,
//       })
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//       profile: {
//         profilePhoto:cloudResponse.secure_url,
          
//       }
//     });
//     return res.status(201).json({
//       message: "User created successfully.",
//       success: true
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    console.log(fullname, email, phoneNumber, password, role);

    // Check if all fields are provided
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    
    // User Existence: Checks if a user with the provided email already exists. If so, it returns a 400 error.
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    // Handle file upload with Cloudinary
    let profilePhotoUrl = ""; // Initialize with an empty string if no file is provided
    if (req.file) {
      const file = req.file;
      const fileUri = getDataUri(file);

      try {
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        profilePhotoUrl = cloudResponse.secure_url; // Use secure_url from Cloudinary response
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({
          message: "Failed to upload profile photo.",
          success: false,
        });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // User Creation: Creates a new user and stores their hashed password and profile photo URL in the database.
    // Create a new user
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    return res.status(201).json({
      message: "User created successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error in register:", error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    // Validation: Ensures that all fields (email, password, role) are provided. If not, returns a 400 error.
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      })
    }
    // User Verification: Checks if the user exists and verifies the password using bcrypt.compare(). If the credentials are incorrect, returns a 400 error.
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      })
    };
    // Role Check: Ensures that the user's role matches the one provided. If not, returns a 400 error.
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with correct role.",
        success: false,
      });
    }
    // Token Generation: Creates a JWT token that includes the user's ID and stores it as a cookie.
    const tokenData = {
      userId: user._id
    }
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    // storing token in cookie
    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true
    })
  } catch (error) {
    console.log(error)
  }
}
// Login user
// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
    
//     // Check if all fields are provided
//     if (!email || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }

//     // Find user by email
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }

//     // Check if the user role matches
//     if (role !== user.role) {
//       return res.status(400).json({
//         message: "Account doesn't exist with correct role.",
//         success: false,
//       });
//     }

//     // Generate a JWT token
//     const tokenData = {
//       userId: user._id,
//     };
//     const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//     user = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     // Set the token in a secure cookie
//     return res.status(200)
//       .cookie("token", token, {
//         httpOnly: true, // Prevent access via JavaScript
//         secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
//         sameSite: 'None', // Required for cross-site cookies
//         maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie expires in 1 day
//       })
//       .json({
//         message: `Welcome back, ${user.fullname}`,
//         user,
//         success: true,
//       });
//   } catch (error) {
//     console.log("Error during login:", error);
//     res.status(500).json({
//       message: "Server error during login",
//       success: false,
//     });
//   }
// };


// logout user
// Clears the JWT token by setting an empty cookie with maxAge: 0, effectively logging the user out.
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Loged out successfully",
      success: true
    })
  } catch (error) {
    console.log(error)
  }
}

// update profile
export const updateProfile = async (req, res) => {
  try {
    // Validation: Extracts profile details from req.body, including optional file uploads for resumes.
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    // console.log( fullname, email, phoneNumber, bio, skills)
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    // cloudinary ayega idher
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",")
    }


    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      });
    }

    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;


    // resume comes later here..
    if(cloudResponse){
      user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname // save the original name
    }
    
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user, email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }
    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true
    })

  } catch (error) {
    console.log(error)
  }
}



// Explanation of How it Works:

// The controller interacts with the User model to handle user data stored in a MongoDB database.
// It handles file uploads (profile photos, resumes) using Cloudinary.
// Password encryption is done with bcryptjs to store passwords securely in the database.
// Authentication is handled via JWT, and the token is stored as a cookie for authentication in subsequent requests.
// This controller is essential for managing user authentication and profile handling within your job portal project. Let me know if you need a detailed breakdown of other parts of the backend or further clarification on any section!