const { Student, sequelize, Teacher } = require('./init')
const { Op } = require('sequelize')

async function findAll() {
    const res = await Teacher.findAll({
        attribute: ['name'],
        group: ['name','sex'],
    });
    console.log('res = ', res.map(res=>res.dataValues), res.length);
}


(async (fn) => {
    fn()
        .then(data => { console.log('create user:', data) })
        .finally(() => { sequelize.close() })
})(findAll)