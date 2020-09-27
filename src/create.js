const { Student, sequelize } = require('./init')

async function createUser() {
    let user = {
        name: 'wst',
        age: 19,
        isAdult: true
    }
    return await Student.create(user)
}


(async (fn) => {
    fn()
        .then(data => { console.log('create user:', data) })
        .finally(() => { sequelize.close() })
})(createUser)