const Skill = require('../models/Skill');

const addSkill = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id; // Assuming req.user is set by your auth middleware

  try {
    const newSkill = new Skill({
      title,
      description,
      owner: userId,
    });

    await newSkill.save();
    return res.status(201).json({ message: "Successfully added the skill", newSkill });
  } catch (error) {
    return res.status(400).json({ message: "Error while adding skill", error: error.message });
  }
};

const getSkills = async (req, res) => {
  const searchQuery = req.query.query;

  try {
    const query = {
      ...(searchQuery && { 
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search
          { description: { $regex: searchQuery, $options: 'i' } }
        ]
      })
    };

    const skills = await Skill.find(query);
    res.status(200).json(skills);
  } catch (error) {
    res.status(400).json({ message: "Error fetching skills", error: error.message });
  }
};
const deleteSkill=async(req,res)=>{
  const skillId=req.params.id;
  try {
    await Skill.findByIdAndDelete(skillId);
    res.status(200).json({ message: "Skill deleted successfully" });  
    
  } catch (error) {
    return res.status(400).json({message:"error while delteting skill"})
    
  }
}


module.exports = { addSkill, getSkills ,deleteSkill};
