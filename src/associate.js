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
                associate: Student.belongsTo(Class) // 如果model那里没有建立关系，需要在这里创建，且这里的关系优先级高
            }
        ],
    })
    console.log('res = ', res)
}

async function associateForeignKeyTest() {
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
                // 如果表中自建的外建名跟默认的不一致，可以显式指定外键名
                associate: Student.belongsTo(Class, { foreignKey: 'class_id' }), // 显式指定外建，默认是通过表名和主键生成的 classId 驼峰式
            }
        ],
        logging: log => {
            console.log('========> ', log)
        }
    })
    console.log('res = ', res)
}

// 设置别名，需要在 include 中用as声明，同时在belongsTo 中表明
async function associateAsTest() {
    const res = await Student.findAll({
        where: {
            isAdult: 1
        },
        include: [  // 前提是model那里已经建立了关系
            {
                model: Class,
                as: 'c',
                where: {
                    student_num: {
                        [Op.gt]: 20
                    }
                },
                // required: false // 添加where 后变为内联，需要显式指定 false 左联
                associate: Student.belongsTo(Class, { as: 'c' }) // 如果model那里没有建立关系，需要在这里创建，且这里的关系优先级高
            }
        ],
    })
    console.log('res = ', res)
}

(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(associateForeignKeyTest)