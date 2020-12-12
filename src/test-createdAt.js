const { Student, Teacher, Class, sequelize } = require('./init')
const { Op } = require('sequelize')

async function findOneTestCreatedAt() {
    const res = await Class.findOne({
        where: {
            name: '一年级',
        },
    })
    console.log('res = ', res) //  created_at as createdAt 结果是驼峰式的
    if (res) {
        console.log('succeed:', typeof res.createdAt, res.createdAt) // string 2020-11-10 11:33:30
    } else {
        console.log('failure:', res)
    }
}

async function findOneTestCreatedAt() {
    const res = await Class.findAll();

    if (res) {
        console.log('succeed:', typeof res.createdAt, res.createdAt) // object {}
    } else {
        console.log('failure:', res)
    }
    res.forEach(claz => {
        console.log('111111111 ', claz.createdAt, `${new Date().toLocaleDateString().replace(/\//g, '-')} 00:00:00`);
        console.log('222222222 ', claz.createdAt > `${new Date().toLocaleDateString().replace(/\//g, '-')} 00:00:00`);
        if (claz.createdAt >= `${new Date().toLocaleDateString().replace(/\//g, '-')} 00:00:00`
            && claz.createdAt < `${new Date().toLocaleDateString().replace(/\//g, '-')} 23:59:59`) {
            console.log('======== ', claz.createdAt, claz.name);
        }
    });

    // 时间戳
    res.forEach(claz => {
        if (new Date(claz.createdAt).getTime() > new Date(`${new Date().toLocaleDateString()} 00:00:00`).getTime()) {
            console.log('*********** ', claz.createdAt, claz.name)
        }
    });
}

// 111111111  2020-12-10 11:33:30 2020-12-10 00:00:00
// 222222222  true 相同格式的字符串才能比较

(async (fn) => {
    fn()
        .then(data => { console.log('operator successfully', data) })
        .finally(() => { sequelize.close() })
})(findOneTestCreatedAt)