const { Schema, model } = require("mongoose");

const companySchema = new Schema(

    {
        name: {
        type:String,
        required: true,
        },
         
    
        owner: {
        type: Schema.Types.ObjectId, 
        ref:'User',
        type:String,
        required: false,
        },

        users: [{ 
        type: Schema.Types.ObjectId, 
        ref:'User',
        required: true,
        }],
            
        category: { 
        type: String,
        required: true,
        enum : ['paid', 'free user', 'trial'],
        default : 'free user'    
        },
    
        becameClientDate: {
        type:Date,
        required: false,
         },
            
            
        teams: [ { 
        type: Schema.Types.ObjectId, 
        ref:'Team' } ],
        
        tickets: [ { 
        type: Schema.Types.ObjectId, 
        ref:'Ticket' } ],
        
        chats: [ { 
        type: Schema.Types.ObjectId, 
        ref:'Chat' } ],
        
    
    },
    
    {
        timestamps:true,
    }
     
)


const Company = model("Company", companySchema);

module.exports = Company;