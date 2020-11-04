const { Student, sequelize } = require('./init')
const { Op } = require('sequelize')

async function findOneNotExist() {
    // const res = await Student.findOne({
    //     where: {
    //         name: 'lxxxx',
    //     },
    // })
    // console.log('res = ', res) // res = null 找不到，返回null

    const res = await Student.findOne({
        where: {
            name: 'lxxxx',
        },
    }).then(result => (result ? result : {}))

    if (res) {
        console.log('succeed:', typeof res, res) // object {}
    } else {
        console.log('failure:', res)
    }
}

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


async function findAll() {
    const res = await Student.findAll().then(row => row.map(e => e.name));
    console.log('res = ', res);
}

// 如果该字段没有值，查出来的为null
// res =  [
//     'dsb',  'wst',  'lx',
//     'wst',  null,   null,
//     'xh',   'xh',   '小五',
//     '小六', '小五', '小六',
//     '小七', '小七'
//   ]


async function findOneReturnValue() {
    const res = await Student.findOne({
        where: {
            name: 'lx',
        },
    }).then()
    console.log('res = ', res)
    if (res) {
        console.log('succeed:', typeof res, res)
    } else {
        console.log('failure:', res)
    }
    const res2 = res.dataValues;
    res2.age = 2010;
    delete res2.id
    console.log('res2 = ', res2)
    const rr = await Student.create(res2);
    console.log('rr = ', rr);
}


(async (fn) => {
    fn()
        .then(data => { console.log('create user:', data) })
        .finally(() => { sequelize.close() })
})(findOneReturnValue)






// async function update(model) {
//     model.age = 12
//     return await model.save()
// }
// (async (fn) => {
//     fn()
//         .then(data => { console.log('create user:', data) })
//         .finally(() => { sequelize.close() })
// })(findByUndefined)
// (async (fn1,fn2) => {
//     const res = await fn1();
//     await fn2(res)
//     await fn1()
//         .then(data => { console.log('create user:', data) })
//         .finally(() => { sequelize.close() })
// })(findOne,update)
