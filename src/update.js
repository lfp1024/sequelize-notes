const { Student, sequelize, Teacher } = require('./init')
const { Op } = require('sequelize')

async function update() {
    await Student.update(
        {
            age: 19,
        },
        {
            where: {
                name: '小七'
            }
        }
    );
}


(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(update)