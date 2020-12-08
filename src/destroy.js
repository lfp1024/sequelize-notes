const { Student, sequelize } = require('./init')

// 值为 undefined 会报错
async function destroy() {
    const res = await Student.destroy({
        // Error: WHERE parameter "name" has invalid "undefined" value
        where: {
            name: undefined
        }
    })
    console.log('res = ', res)
}

async function destroyAll() {
    const res = await Student.destroy({
        // Error: WHERE parameter "name" has invalid "undefined" value
        where: {
            age: 1999
        }
    })
    console.log('res = ', res) // 6 删除所有满足条件的，返回删除条目个数。没有满足条件的则不删除，返回0
}

(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(destroyAll)