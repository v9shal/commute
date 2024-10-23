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
      navigate('/login'); 
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

          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <input 
              type="text" 
              placeholder="Search" 
              className="px-4 py-2 rounded-lg text-black" 
              value={searchItem} 
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button 
              onClick={handleSearch} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
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
              <p>
                {item === 'Skills' && 'Showcase your unique skills, learn new ones, and collaborate with peers to grow in your career.'}
                {item === 'Resources' && 'Access a variety of resources shared by others or contribute your own to help the community thrive.'}
                {item === 'Community' && 'Become part of a vibrant community that connects learners, mentors, and professionals together.'}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center space-x-6">
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
        <p>&copy; Designed by vishal</p>
      </footer>
    </div>
  );
}
