const { Student, sequelize } = require('./init')
const { Op } = require('sequelize')

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

async function findInEmpty() {
    const res = await Student.findOne({
        where: {
            name: {
                [Op.in]: []
            }
        },
    })
    if (res) {
        console.log('succeed:', res, res)
    } else {
        console.log('failure:', res) // 返回 null
    }

    const res2 = await Student.findAll({
        where: {
            name: {
                [Op.in]: []
            }
        },
    }).then(stu => {
        console.log('stu = ', stu)
        stu.map(row => {
            console.log('row = ', row)  // 如果找不到 返回 空数组，空数组不会进入 map 执行，不会报错，依然返回空数组
            return row.age
        })
    })
    if (res2) {
        console.log('succeed:', res2) // 返回空数组 []
    } else {
        console.log('failure:', res2)
    }
}

async function destroyInEmpty() {
    const res = await Student.destroy({
        where: {
            name: {
                [Op.in]: []
            }
        },
        logging: log => {
            console.log('========> ', log)
        }
    })
    console.log('res = ', res)
}


(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(findInEmpty)
