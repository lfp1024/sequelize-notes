const { Student, sequelize, Teacher } = require('./init')
const { Op } = require('sequelize')

async function findOne() {
    const res = await Teacher.findOne({
        where: {
            id: 14,
        }
    });
    console.log('res = ', res.name, typeof res.name);
}


(async (fn) => {
    fn()
        .then(data => { console.log('create user:', data) })
        .finally(() => { sequelize.close() })
})(findOne)