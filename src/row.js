const { Student, sequelize } = require('./init')
const { Op } = require('sequelize')

async function findAll() {
    const res = await Student.findAll({
        where: {
            name: {
                [Op.in]: ['lfp', 'lx', 'wst']
            }
        }
    }).then(students => students.map(row => row.age)) // 结果是数组，返回指定的字段列表
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
})(findAll)