 
 const mongoose=require('mongoose')

const resourceSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,

    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
})
resourceSchema.pre('save',async function (next) {
    this.updatedAt=Date.now()
    next();
    
})
const Resource=mongoose.model('Resource',resourceSchema);
module.exports=Resource