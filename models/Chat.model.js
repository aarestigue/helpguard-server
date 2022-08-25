const { Schema, model } = require("mongoose");

const chatSchema = new Schema(
 
{
    subject: {
    type:String,
    required: true,
    },
        
    
    category: {
    type:String,
    required: true,
    enum : ['Technical issue', 'How to', 'Sales     question', 'Cancel my plan', 'Feature           request'],
    default : 'Technical issue'    
     },
    
    priority: {
    type:String,
    required: false,
    enum : ['High', 'Medium', 'Low'],
    default : 'Low' 
     },
    
    status: {
    type:String,
    required: false,
    enum : ['New','Assigned', 'In progress',       'Solved', 'No response','Sent as               ticket','Closed'],
    default : 'New' 
     },
        
    agent: {
    type: Schema.Types.ObjectId, 
    ref:'User',
    type:String,
    required: false,
    },
        
    user: {
    type: Schema.Types.ObjectId, 
    ref:'User',
    type:String,
    required: false,
    },
        
    company: {
    type: Schema.Types.ObjectId, 
    ref:'Company',
    type:String,
    required: false,
    },
        
    closeDate: {
    type:Date,
    required: false,
     }
        
},

{
    timestamps:true,
}

);



const Chat = model("Chat", chatSchema);

module.exports = Chat;