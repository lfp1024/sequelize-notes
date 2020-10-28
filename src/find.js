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

(async (fn) => {
    fn()
        .then(data => { console.log('create user:', data) })
        .finally(() => { sequelize.close() })
})(findOne)


async function update(model) {
    model.age = 12
    return await model.save()
}


async function findAll() {
    const res = await Student.findAll({
        where: {
            name: {
                [Op.in]: ['lfp', 'lx', 'wst']
            }
        },
        attributes: ['age']
    })
    if (res) {
        // 可以直接取Model中的字段值
        const arr = res.map(ele => { return ele.age })
        console.log('succeed:', res.length, res[0].age, arr)
    } else {
        console.log('failure:', res)
    }
}

(async (fn) => {
    fn()
        .then(data => { console.log('create user:', data) })
        .finally(() => { sequelize.close() })
})(findByUndefined)
// (async (fn1,fn2) => {
//     const res = await fn1();
//     await fn2(res)
//     await fn1()
//         .then(data => { console.log('create user:', data) })
//         .finally(() => { sequelize.close() })
// })(findOne,update)
