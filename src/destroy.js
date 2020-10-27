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

(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(destroy)