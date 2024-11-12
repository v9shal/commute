const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema(
    {
        title: { type: String, required: true, index: true },
        description: { type: String, required: true, index: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true } 
);

resourceSchema.index({ title: 'text', description: 'text' });

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;
