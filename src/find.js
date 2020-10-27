const { Student, sequelize } = require('./init')
const { Op } = require('sequelize')

async function findOne() {
    const res = await Student.findOne({
        where: {
            name: 'lxx',
        },
    }).then(row => row ? row.age : 0).catch(e => { console.log('err', e) })
    // row 代表结果中的一条记录，如果找不到，则 row 为 undefined
    console.log('res = ', res)
    if (res) {
        console.log('succeed:', typeof res, res) // number 21 直接拿到字段值
    } else {
        console.log('failure:', res)
    }
}

// 测试 find by undefined
// UnhandledPromiseRejectionWarning: Error: WHERE parameter "name" has invalid "undefined" value
async function findByUndefined() {
    const res = await Student.findOne({
        where: {
            name: undefined,
        },
    });
    console.log('res = ', res)
}

async function findALl() {
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
})(findByUndefined)