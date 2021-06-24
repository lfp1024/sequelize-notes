const { Student, sequelize, Teacher } = require('./init')
const { Op } = require('sequelize');

/**
 * 详见笔记
 */

async function update() {
    // 获取出来的是一个 json 字符串，需要 parse 成 JavaScript 对象
    // desc: '{ "proxy": { "site": { "JP": "foreign", "SA": "foreign", "SZ": "domestic" } }, "others": {} }',
    // await Teacher.update(
    //     {
    //         // {"title": "sheena cabenian", "content": "系统自动填充内容😊"}
    //         desc: { "proxy": { "site": { "JP": "foreign", "SA": "foreign", "SZ": "domestic" } }, "others": { "title": "sheena cabenian", "content": "Kelan po kaya dadating ang inorder ko " } },
    //         // desc
    //     },
    //     {
    //         where: {
    //             name: 'everson'
    //         }
    //     }
    // );
    const res = await Teacher.findOne({
        where: {
            name: 'everson'
        },
        // attributes: ['desc']
    });

    // 更新json中的某个字段值：
    // 不成功
    // res.desc.proxy = 22;
    // await res.save();

    // 非原子操作可以成功
    // res.set('desc.proxy.site', 2);
    // await res.save();

    // 原子操作，可以成功
    await res.update({ "desc.proxy.site": 3 });

    console.log('res = ', typeof res.desc, res, res.desc.proxy) // 不加引号，取出来的是一个对象
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
})(update)