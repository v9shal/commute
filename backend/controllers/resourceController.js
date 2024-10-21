const Resource =require('../models/resourceModel')

const addResource=async(req,res)=>{
    const {title,description}=req.body;
    const userId=req.user._id;
    try {
        const newResource= new Resource({
            title:title,
            description:description,
            owner:userId
        });
        await newResource.save();
        return res.status(201).json({message:"new resource has been createrd",newResource})

    } catch (error) {
        res.status(400).json({message:"error while creating a new Resource",error});

    }
}
const getResource = async (req, res) => {
    const searchQuery = req.query.query;
  
    try {
      const query = searchQuery
        ? {
            $or: [
              { title: { $regex: searchQuery, $options: 'i' } }, 
              { description: { $regex: searchQuery, $options: 'i' } }
            ]
          }
        : {};
  
      const resources = await Resource.find(query);
      return res.json(resources);
    } catch (error) {
      return res.status(400).json({ message: "Couldn't fetch resources", error: error.message });
    }
  };
const deleteResource=async(req,res)=>{
    const resourceId=req.params.id;
    try {
        await Resource.findByIdAndDelete(resourceId);
        return res.status(200).json({message:"deleted successfully"});
        
    } catch (error) {
        res.status(400).json({message:"error while deleting a resource",error});
        
    }

}
module.exports={getResource,addResource,deleteResource};