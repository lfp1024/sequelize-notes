const { Student, sequelize, Teacher } = require('./init')
const { Op } = require('sequelize');

async function update() {
    await Teacher.update(
        {
            desc: '{"proxy":{"site":{"JP":"foreign","SA":"foreign","SZ":"domestic"}},"others":{}}',
        },
        {
            where: {
                name: 'park'
            }
        }
    );

    const res = await Teacher.findOne({
        where: {
            name: 'park'
        },
        attributes: ['desc']
    });
    const obj = JSON.parse(res.desc)
    console.log('res = ', typeof res.desc, res.desc, res.desc.proxy) // 获取出来的是一个 json 字符串，需要 parse 成 JavaScript 对象
    console.log('res = ', typeof obj, obj, obj.proxy)
}


(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(update)