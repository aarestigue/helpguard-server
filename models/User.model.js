const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please use a valid email address']
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


  hgEmployee: {
    type: Boolean,
    default: false,
  },
          
  role: { 
      type: String,
      required: false,
      enum : ['admin', 'agent', 'analyst','client'],
      default : 'agent'    
      },
          
  persona: { 
      type: String,
      required: false,
      enum : ['owner', 'executive', 'manager', 'partners'],
      default : 'executive'    
      },

  owner: {
        type: Schema.Types.ObjectId, 
        ref:'User',
        
        required: false,
        },
        
    category: { 
    type: String,
    required: false,
    enum : ['paid', 'free user', 'trial'],
    default : 'free user'    
    },

    becameClientDate: {
    type:Date,
    required: false,
     },

  profileImg : {
    type: String,
  },
          
          
  assigned: [{ 
      type: Schema.Types.ObjectId, 
      refPath:'model_type' }],
  
  model_type: {
    type: String, 
    enum: ['User', 'Client'], 
    required: false
  },

  assignedCompanies: [ { 
    type: Schema.Types.ObjectId, 
    ref:'Company' } ],

  teams: [ { 
      type: Schema.Types.ObjectId, 
      ref:'Team' } ],
      
  tickets: [ { 
      type: Schema.Types.ObjectId, 
      ref:'Ticket' } ],
      
  chats: [ { 
      type: Schema.Types.ObjectId, 
      ref:'Chat' } ],

  tasks: [ { 
      type: Schema.Types.ObjectId, 
      ref:'Task' } ],
  
  },
  
  {
      timestamps:true,
  }
);

const User = model("User", userSchema);

module.exports = User;
