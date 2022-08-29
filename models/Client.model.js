const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const clientSchema = new Schema(
  {
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please use a valid email address']
    },

    username: { 
        type: String, 
        unique: true,
        lowercase: true,
        trim: true,
    },
            

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
       required: false,
   },

   type: { 
      type: String,
      required: false,
      enum : ['paid', 'free', 'trial'],
      default : 'free'    
      },

    owner: {
        type: Schema.Types.ObjectId, 
        ref:'User',
        type:String,
        required: false,
        },

    company: { 
        type: Schema.Types.ObjectId, 
        ref:'Company',
        required: false
        },

    createDate: {
       type: Date,
       default: Date.now,
       required: false,
    },

    products: { 
        type: [String],
        required: false,
          
    },

    tasks: [ { 
      type: Schema.Types.ObjectId, 
      ref:'Task' } ],
  
      
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
);

const Client = model("Client", clientSchema);

module.exports = Client;
