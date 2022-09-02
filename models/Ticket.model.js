const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(

    {
    
        subject: {
        type:String,
        required: true,
        },
            
        description: {
        type:String,
        required: true,
        },

        comments:{
        type:String,
        required: false,
        },
        
        category: {
        type:String,
        required: true,
        enum : ['Technical issue', 'How to', 'Sales question', 'Cancel my plan', 'Feature           request'],
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
        enum : ['New','Assigned', 'In progress', 'Solved', 'Discarded','Stand by','Closed'],
        default : 'New' 
         },

        statusColumn: { 
            type: Schema.Types.ObjectId, 
            ref:'TicketColumn',
            default:'6311f7de99920a174003756b',
            required: false,
        },
            
        owner: {
        type: Schema.Types.ObjectId, 
        ref:'User',
        
        required: false,
        },
            
        sender: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        
        required: false,
        },

       
            
        company: {
        type: Schema.Types.ObjectId, 
        ref:'Company',
        
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

const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;