const { Sequelize, Op } = require('sequelize')
const { Student, Class, sequelize } = require('./init')

async function associateTest() {
    const res = await Student.findAll({
        where: {
            isAdult: 1
        },
        include: [  // 前提是model那里已经建立了关系
            {
                model: Class,
                where: {
                    student_num: {
                        [Op.gt]: 20
                    }
                },
                // required: false // 添加where 后变为内联，需要显式指定 false 左联
            }
        ],
        associate: Student.belongsTo(Class) // 如果model那里没有建立关系，需要在这里创建，且这里的关系优先级高
    })
    console.log('res = ', res)
}

(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(associateTest)