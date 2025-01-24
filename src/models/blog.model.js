import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
     name: {
        type: String,
        required: true
     },
     category: {
        type: String,
        required: true
     },
     status: {
        type: String,
      
     },
   //   date: {
   //      type: Date,
   //      default: Date.now
   //   },
     view: {
        type: Number,
        default: 0
     },
     title: {
        type: String,
        required: true
     },
     description: {
        type: String,
        required: true
     },
     coverImage: {
        type: String,
        
     },
     content: {
        type: String,
        required: true
     }

}, {
    timestamps: true
});

 const Blog = mongoose.model('Blog', blogSchema);

 export default Blog;
