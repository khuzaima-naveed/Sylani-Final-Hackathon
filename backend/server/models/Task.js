// const mongoose = require('mongoose');

// const TaskSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   status: { type: String, enum: ['todo', 'inprogress', 'completed'], default: 'todo' },
// }, { timestamps: true });

// module.exports = mongoose.model('Task', TaskSchema);


const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['todo', 'inprogress', 'completed'], default: 'todo' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);
