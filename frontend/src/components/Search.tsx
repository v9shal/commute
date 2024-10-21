import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Skill {

  _id: string;
  title: string;
  description: string;
  owner: string;
  
}

interface Resource {
  _id: string;
  title: string;
  description: string;
  owner: string;
  
}

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState<string>('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSkills, setShowSkills] = useState<boolean>(true);

  const handleSearch = () => {
    if (searchItem) {
      navigate(`/home/search?query=${encodeURIComponent(searchItem)}`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    setSearchQuery(query);

    if (query) {
      fetchSkills(query);
      fetchResources(query);
    }
  }, [location]);

  const fetchSkills = async (query: string) => {
    try {
      const response = await axios.get<Skill[]>(`http://localhost:5000/skill?query=${query}`, {
        withCredentials: true,
      });
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError("Failed to fetch skills.");
    }
  };

  const fetchResources = async (query: string) => {
    try {
      const response = await axios.get<Resource[]>(`http://localhost:5000/resource?query=${query}`, {
        withCredentials: true,
      });
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setError("Failed to fetch resources.");
    }
  };

  const handleItemClick = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto px1 py-20">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">Search Results for: {searchQuery}</h1>

        {error && <p className="text-red-400">{error}</p>}

        <p className="text-lg mb-6">
          Here are the results for "<span className="font-semibold">{searchQuery}</span>"
        </p>

        <motion.div
          className="flex mb-8 space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="mt-1 bg-blue-600 text-white rounded p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </motion.div>

        {/* Toggle Buttons */}
        <div className="mb-4">
          <button
            onClick={() => setShowSkills(true)}
            className={`mr-2 px-4 py-2 rounded ${showSkills ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            Skills
          </button>
          <button
            onClick={() => setShowSkills(false)}
            className={`px-4 py-2 rounded ${!showSkills ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            Resources
          </button>
        </div>

        {/* Display Skills or Resources */}
        {showSkills ? (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mt-8 text-blue-400">Skills</h2>
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div key={skill._id} onClick={() => handleItemClick(skill.owner)} className="mt-2 p-3 bg-gray-800 border border-gray-600 rounded shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
                  <h3 className="font-semibold">{skill.title}</h3>
                  <p className="text-sm">{skill.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No skills found.</p>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mt-8 text-blue-400">Resources</h2>
            {resources.length > 0 ? (
              resources.map((resource) => (
                <div key={resource._id} onClick={() => handleItemClick(resource.owner)} className="mt-2 p-3 bg-gray-800 border border-gray-600 rounded shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm">{resource.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No resources found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}