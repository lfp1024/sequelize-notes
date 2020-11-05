const { Student, sequelize } = require('./init')
const { Op } = require('sequelize')

async function findAllAndOrder() {
    const res = await Student.findAll({
        where: {
            id: {
                [Op.lt]: 7
            }
        },
        // order: [['age', 'ASC']] // 嵌套数组的形式，第一个字段为列名，第二个字段是排序方式 DESC ASC
        order: ['age'] // 仅指定列名，默认按升序asc排序
    }).then(result => result.map(e => e.dataValues))

    if (res) {
        console.log('succeed:', typeof res, res) // object {}
    } else {
        console.log('failure:', res)
    }
}


(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(findAllAndOrder)