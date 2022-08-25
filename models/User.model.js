const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim : true
    },
            
   password: { 
       type: String, 
       required: true },

   name: {
       type:String,
       required: true,
   },

   lastName: {
       type:String,
       required: true,
   },
  
  telephone: {
       type:Number,
       required: true,
   },

  company: { 
      type: Schema.Types.ObjectId, 
      ref:'Company',
      required: false
      },
          
  role: { 
      type: String,
      required: false,
      enum : ['admin', 'agent', 'analyst','client'],
      default : 'agent'    
      },
          
  clientRole: { 
      type: String,
      required: false,
      enum : ['owner', 'standard', 'partners'],
      default : 'standard'    
      },
          
          
  teams: [ { 
      type: Schema.Types.ObjectId, 
      ref:'Team' } ],
      
  tickets: [ { 
      type: Schema.Types.ObjectId, 
      ref:'Ticket' } ],
      
  chat: [ { 
      type: Schema.Types.ObjectId, 
      ref:'Chat' } ],
  
  },
  
  {
      timestamps:true,
  }
);

const User = model("User", userSchema);

module.exports = User;
