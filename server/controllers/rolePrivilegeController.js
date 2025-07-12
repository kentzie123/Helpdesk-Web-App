const Role = require('../models/rolePrivilege');

const getRoles = async (req, res) => {
    try{
        const roles = await Role.find();
        res.json(roles)
    }catch(error){
        res.status(500).json({ error: 'Server error while fetching users' });
    }
}

const getRoleByRoleId = async (req, res) => {
    const { id } = req.params;
    
    try {
        const role = await Role.findOne({ roleID: parseInt(id) });

        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        res.status(200).json(role);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching role' });
    }
};

module.exports = {
    getRoles,
    getRoleByRoleId
};
