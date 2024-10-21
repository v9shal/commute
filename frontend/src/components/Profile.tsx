import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

interface RootState {
  auth: {
    username: string;
  };
}

interface ProfileState {
  name: string;
  email: string;
  phone_number: string;
  bio: string;
}

const emptyProfile: ProfileState = {
  name: "",
  email: "",
  phone_number: "",
  bio: ""
};

const Profile: React.FC = () => {
    const username = useSelector((state: RootState) => state.auth.username);
    const [profile, setProfile] = useState<ProfileState>(emptyProfile);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isExistingProfile, setIsExistingProfile] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get<any>('http://localhost:5000/profile/getUserProfile', {
                withCredentials: true
            });
            setProfile(response.data.profile);
            setIsExistingProfile(true);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setProfile(emptyProfile);
                setIsExistingProfile(false);
            } else {
                console.error("Error fetching profile:", error);
                setError("Failed to fetch profile. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditProfile = () => {
        setIsEditing(!isEditing);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            let response;
            if (isExistingProfile) {
                response = await axios.put('http://localhost:5000/profile/updateProfile', profile, {
                    withCredentials: true
                });
            } else {
                response = await axios.post('http://localhost:5000/profile/addUser', profile, {
                    withCredentials: true
                });
            }
            console.log(isExistingProfile ? "Profile updated successfully" : "Profile created successfully");
            setSuccess(isExistingProfile ? "Profile updated successfully!" : "Profile created successfully!");
            setIsExistingProfile(true);
            setIsEditing(false);
            setProfile(response.data.profile);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Axios error: ", error.response.data);
                setError(error.response.data.message || "Failed to save profile. Please try again.");
            } else {
                console.error("Unexpected error: ", error);
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Profile: {username}</h1>
            {isExistingProfile && !isEditing ? (
                <div>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone_number || 'Not provided'}</p>
                    <p><strong>Bio:</strong> {profile.bio}</p>
                    <button onClick={handleEditProfile} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}

                    <div className="form-group">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            minLength={2}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio:</label>
                        <textarea 
                            id="bio"
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            maxLength={500}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                        <input 
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            value={profile.phone_number}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200">
                        {isExistingProfile ? "Save Changes" : "Create Profile"}
                    </button>
                    {isExistingProfile && (
                        <button type="button" onClick={handleEditProfile} className="w-full mt-2 bg-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-400 transition duration-200">
                            Cancel
                        </button>
                    )}
                </form>
            )}
        </div>
    );
};

export default Profile;