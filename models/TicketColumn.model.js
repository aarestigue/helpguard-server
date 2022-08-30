const { Schema, model } = require("mongoose");

const ticketColumnSchema = new Schema(
{
    statusName: {
        type:String,
        required: true,
        },

    order: {
        type: Number,
        required: false,

    },

    tickets: [ { 
        type: Schema.Types.ObjectId, 
        ref:'Ticket' } ],
    
    }
)

const TicketColumn = model("TicketColumn", ticketColumnSchema);

module.exports = TicketColumn;