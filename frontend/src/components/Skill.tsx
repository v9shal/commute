import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Skill {
  _id: string;
  title: string;
  description: string;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get<Skill[]>("http://localhost:5000/skill", {
        withCredentials: true,
      });
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    try {
      await axios.delete(`http://localhost:5000/skill/${skillId}`, {
        withCredentials: true,
      });
      setSkills((prev) => prev.filter(skill => skill._id !== skillId));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (newSkill.title && newSkill.description) {
      try {
        const response = await axios.post<any>("http://localhost:5000/skill/add", newSkill, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSkills((prev) => [...prev, response.data.newSkill]);
        setNewSkill({ title: "", description: "" });
      } catch (error) {
        console.error("Error adding skill:", error);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md border border-blue-800 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Skills</h2>
        <div className="grid w-full items-center gap-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Skill title"
            value={newSkill.title}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Skill description"
            value={newSkill.description}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="mt-1 w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSubmit}
        >
          <span className="mr-2">+</span> Add Skill
        </button>
        <div className="mt-4">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="mt-2 p-3 border border-gray-300 rounded shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{skill.title}</h3>
                <p className="text-sm">{skill.description}</p>
              </div>
              <button
                onClick={() => handleDeleteSkill(skill._id)}
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

export default Skills;
