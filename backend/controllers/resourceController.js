const Resource = require('../models/resourceModel');

const addResource = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user._id;

    try {
        const newResource = new Resource({
            title,
            description,
            owner: userId
        });

        await newResource.save();
        return res.status(201).json({ message: "New resource has been created", newResource });
    } catch (error) {
        res.status(400).json({ message: "Error while creating a new resource", error });
    }
};

const getResource = async (req, res) => {
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

        const resources = await Resource.find(query)
            .select('title description owner createdAt updatedAt') 
            .lean() 
            .skip(skip) 
            .limit(limit);

        return res.json(resources);
    } catch (error) {
        return res.status(400).json({ message: "Couldn't fetch resources", error: error.message });
    }
};

const deleteResource = async (req, res) => {
    const resourceId = req.params.id;

    try {
        const result = await Resource.deleteOne({ _id: resourceId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Resource not found" });
        }

        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error while deleting a resource", error });
    }
};

module.exports = { getResource, addResource, deleteResource };
