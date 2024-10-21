const Profile = require('../models/profileModel');

const addUser = async (req, res) => {
    const { name, bio, email, phone_number } = req.body;
    const userId = req.user.id;

    if (!name || !bio || !email) {
        return res.status(400).json({ message: "Name, bio, and email are required" });
    }

    try {
        const existingProfile = await Profile.findOne({ owner: userId });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists for this user" });
        }

        const newProfile = new Profile({
            owner: userId,
            name,
            bio,
            email,
            phone_number: phone_number || null
        });

        await newProfile.save();
        return res.status(201).json({ message: "Profile created successfully", profile: newProfile });
    } catch (error) {
        console.error("Error creating profile:", error);
        return res.status(500).json({ message: "Error while creating user profile", error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const profile = await Profile.findOne({ owner: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        return res.status(200).json({ profile });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ message: "Error while fetching user profile", error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, bio, email, phone_number } = req.body;

    try {
        const profile = await Profile.findOne({ owner: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        if (name) profile.name = name;
        if (bio) profile.bio = bio;
        if (email) profile.email = email;
        if (phone_number !== undefined) profile.phone_number = phone_number;

        await profile.save();
        return res.status(200).json({ message: "Profile updated successfully", profile });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Error while updating user profile", error: error.message });
    }
};

module.exports = { addUser, getUserProfile, updateUserProfile };