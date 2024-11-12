const Skill = require('../models/Skill');

const addSkill = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id; 

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
  const searchQuery = req.query.query || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const query = searchQuery
      ? {
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } }
          ]
        }
      : {};

    const skills = await Skill.find(query)
      .select('title description owner createdAt updatedAt') 
      .lean() 
      .skip(skip)
      .limit(limit); 
    res.status(200).json(skills);
  } catch (error) {
    res.status(400).json({ message: "Error fetching skills", error: error.message });
  }
};
const deleteSkill = async (req, res) => {
  const skillId = req.params.id;

  try {
    const result = await Skill.deleteOne({ _id: skillId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Error while deleting skill", error: error.message });
  }
};

module.exports = { addSkill, getSkills, deleteSkill };
