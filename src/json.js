const { Student, sequelize, Teacher } = require('./init')
const { Op } = require('sequelize');

async function update() {
    // 获取出来的是一个 json 字符串，需要 parse 成 JavaScript 对象
    // desc: '{ "proxy": { "site": { "JP": "foreign", "SA": "foreign", "SZ": "domestic" } }, "others": {} }',
    await Teacher.update(
        {
            desc: { "proxy": { "site": { "JP": "foreign", "SA": "foreign", "SZ": "domestic" } }, "others": {} },
        },
        {
            where: {
                name: 'everson'
            }
        }
    );
    const res = await Teacher.findOne({
        where: {
            name: 'everson'
        },
        attributes: ['desc']
    });
    console.log('res = ', typeof res.desc, res.desc, res.desc.proxy) // 不加引号，取出来的是一个对象
}



async function findJson() {
    const res = await Teacher.findOne({
        where: {
            name: 'duncan'
        },
        attributes: ['desc']
    });
    // const obj = JSON.parse(res.desc)
    console.log('res = ', typeof res.desc, res, res.desc)
    // console.log('res = ', typeof obj, obj, obj.proxy)
}


(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(findJson)