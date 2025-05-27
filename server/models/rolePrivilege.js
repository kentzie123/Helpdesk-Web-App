const mongoose = require('mongoose');

const rolePrivilegeSchema = new mongoose.Schema({
    roleID: { type: Number, unique: true },
    name: { type: String, unique: true },
    dashboard: { type: Boolean, required: true },
    access_control: { type: Boolean, required: true },
    knowledge_base: { type: Boolean, required: true },
    notification: { type: Boolean, required: true },
    settings: { type: Boolean, required: true },
    tickets: { type: Boolean, required: true },
    users: { type: Boolean, required: true }
}, { collection: 'roles' });

module.exports = mongoose.model('Role', rolePrivilegeSchema);
