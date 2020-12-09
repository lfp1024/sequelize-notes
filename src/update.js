const { Student, sequelize, Teacher } = require('./init')
const { Op } = require('sequelize')

async function update() {
    const res = await Student.update(
        {
            age: 190,
        },
        {
            where: {
                name: '小七1212'
            }
        }
    );
    console.log('res =', res)
}
/**
 * 查找到符合条件的记录，如果值相等，则不更新，返回受影响的个数为[0]
 * 查找不到符合条件的记录，返回受影响的个数为[0]，
 */


(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(update)