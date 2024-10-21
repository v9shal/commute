import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Resource {
  _id: string;
  title: string;
  description: string;
}

const Resource: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [newResource, setNewResource] = useState({ title: "", description: "" });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDeleteResource = async (resourcesId: string) => {
    try {
      await axios.delete(`http://localhost:5000/resource/${resourcesId}`, {
        withCredentials: true,
      });
      setResources((prev) => prev.filter((resource) => resource._id !== resourcesId));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get<Resource[]>("http://localhost:5000/resource", {
        withCredentials: true,
      });
      console.log("Fetched resources:", response.data); // Log the response
      setResources(response.data || []); // Default to an empty array if undefined
    } catch (error) {
      console.error("Error fetching resources:", error);
      setError("Error fetching resources");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newResource.title && newResource.description) {
      try {
        const response = await axios.post("http://localhost:5000/resource/addResource", newResource, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setResources((prev) => [...prev, response.data.newResource]);
        setNewResource({ title: "", description: "" });
      } catch (error) {
        setError("Error adding resource");
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md border border-blue-800 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Add New Resource</h2>
        <form onSubmit={handleSubmit} className="grid w-full items-center gap-4 mb-4">
        <input
  type="text"
  name="title"
  placeholder="Resource Title"
  value={newResource.title}
  onChange={handleInputChange}
  className="border border-gray-300 rounded p-2 w-full bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<textarea
  name="description"
  placeholder="Resource Description"
  value={newResource.description}
  onChange={handleInputChange}
  className="border border-gray-300 rounded p-2 w-full bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  rows={4}
/>
          <button
            type="submit"
            className="mt-1 w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Resource
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <h2 className="text-lg font-semibold mt-4 mb-2">Resources</h2>
        <div className="mt-4">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="mt-2 p-3 border border-gray-300 rounded shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{resource.title}</h3>
                <p className="text-sm">{resource.description}</p>
              </div>
              <button
                onClick={() => handleDeleteResource(resource._id)}
                className="ml-4 text-red-600 hover:text-red-800 focus:outline-none"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resource;
