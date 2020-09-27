const { Student, sequelize } = require('./init')
const { Op } = require('sequelize')

async function findOne() {
    const res = await Student.findAll({
        where: {
            name: {
                [Op.in]: ['lfp', 'lx', 'wst']
            }
        }
    })
    if (res) {
        console.log('succeed:', res.length, res)
    } else {
        console.log('failure:', res)
    }
}

(async (fn) => {
    fn()
        .then(data => { console.log('create user:', data) })
        .finally(() => { sequelize.close() })
})(findOne)