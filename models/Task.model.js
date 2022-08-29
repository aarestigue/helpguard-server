const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: String,
  description: String,
  ticket: { type: Schema.Types.ObjectId, ref: 'Ticket' },
  client: { type: Schema.Types.ObjectId, ref: 'Client' },

});

module.exports = model('Task', taskSchema);