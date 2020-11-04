const { Student, sequelize } = require('./init')

async function bulkCreateUser() {
    let user = [
        {
            name: '小五',
            age: 19,
            isAdult: true
        },
        {
            name: '小六',
            age: 19,
            isAdult: true
        }
    ]
    const res = await Student.bulkCreate(user)
    console.log('res = ', res.length, res[0].name, res.map(user => user.name))
    return res;
}

(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(bulkCreateUser)