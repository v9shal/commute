import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CIcon } from '@coreui/icons-react';
import { cilUser } from '@coreui/icons';
import { useSelector } from 'react-redux';

type RootState = {
  auth: {
    username: string | null;
  }
};

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>('');

  const username = useSelector((state: RootState) => state.auth.username);
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/addSkill");
  };
  const handleClick2 = () => {
    navigate("/addResource");
  };
  const handleSearch = () => {
    if (searchItem) {
      navigate(`/home/search?query=${encodeURIComponent(searchItem)}`);
    }
  };
  const handleProfile = () => {
    if (username) {
      navigate(`/home/profile?user=${encodeURIComponent(username)}`);
    } else {
      // Handle the case where username is null (user not logged in)
      navigate('/login'); // or show a message, etc.
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen text-white">
      <header className="container mx-auto px-3 py-3">
        <nav className="flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Commute
          </motion.h1>

          {/* Container for search, search button, and user button */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Search Input */}
            <input 
              type="text" 
              placeholder="Search" 
              className="px-4 py-2 rounded-lg text-black" 
              value={searchItem} 
              onChange={(e) => setSearchItem(e.target.value)}
            />
            {/* Search Button */}
            <button 
              onClick={handleSearch} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
            {/* User Button */}
            <button 
              onClick={handleProfile}
              className=""
            >
              <CIcon icon={cilUser} title='profile' />
            </button>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-20 text-center">
        <motion.h2 
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Share Skills, Exchange Resources
        </motion.h2>
        <motion.p 
          className="text-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Join our community to learn, teach, and trade in a collaborative ecosystem.
        </motion.p>
      </main>

      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Skills', 'Resources', 'Community'].map((item, index) => (
            <motion.div 
              key={item}
              className="bg-gray-700 bg-opacity-90 p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300">{item}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 space-x-4">
          <button 
            onClick={handleClick1} 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            <span className="mr-2">+</span> Add Skill
          </button>
          <button 
            onClick={handleClick2} 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            <span className="mr-2">+</span> Add Resource
          </button>
        </div>
      </section>

      <footer className="text-center py-8">
        <p>&copy; 2024 SkillSwap. All rights reserved.</p>
      </footer>
    </div>
  );
}