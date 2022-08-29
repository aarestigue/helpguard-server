const { Schema, model } = require("mongoose");

const companySchema = new Schema(

    {
        name: {
        type:String,
        required: true,
        },
         

        users: [{ 
        type: Schema.Types.ObjectId, 
        refPath:'model_type',
        required: false,
        }],

        model_type: {
            type: String, 
            enum: ['User', 'Client'], 
            required: false
          },

        owner: {
            type: Schema.Types.ObjectId, 
            ref:'User',
            required: false,
            },
            
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