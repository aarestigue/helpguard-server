const { Schema, model } = require("mongoose");

const teamSchema = new Schema(

    {

    teamName: {
    type:String,
    required: true,
    },

   teamMembers: [ { 
   type: Schema.Types.ObjectId, 
   ref:'User' } ],

   company: { 
   type: Schema.Types.ObjectId, 
   ref:'Company',
   required: false,
   },
       
   teamAccess: { 
   type: String,
   required: false,
   enum : ['admin', 'agent',                       'analyst'],
   default : 'agent'    
   },
       

},

{
   timestamps:true,
}

);


const Team = model("Team", teamSchema);

module.exports = Team;

