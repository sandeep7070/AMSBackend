import About from "../models/about.model.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";

// Add a new company profile
export const addAbout = async (req, res) => {
  try {
    const { companyName, tagline, ourStory, ourMission } = req.body;
    const file = req.file;

    // Validate required fields
    if (!companyName || !tagline || !ourStory || !ourMission) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!file) {
      return res.status(400).json({ error: "Cover image is required" });
    }

    // Construct socialLinks object from individual fields
    const socialLinks = {
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      instagram: req.body.instagram,
    };

    // Upload cover image to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(file);
    const coverImage = cloudinaryResponse?.url || '';

    // Create new About document
    const newAbout = await new About({
      companyName,
      tagline,
      coverImage,
      socialLinks,
      ourStory,
      ourMission,
    });

    await newAbout.save();
    res.status(201).json({ message: "Company profile added successfully", about: newAbout });
  } catch (error) {
    console.error("Error adding company profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all company profiles
export const getAbout = async (req, res) => {
  try {
    const aboutData = await About.find({});
    res.status(200).json({ message: "Company profiles retrieved successfully", about: aboutData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteAbout = async (req,res)=>{
  try {
    const {id} = req.params;

    const deletedAbout = await About.findByIdAndDelete(id);
    res.status(200).json({ message: "Company profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    
  }
}