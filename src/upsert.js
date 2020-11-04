const { Student, sequelize } = require('./init')
const { Op } = require('sequelize')

async function upsertTest(){
    let user1 = {
        name: '小七',
        age: 19,
    };
    let user2 = {
        name: '小七',   // 必须要有唯一性约束，才能更新插入
        age: 190,
    }
    await Student.create(user1);
    await Student.upsert(user2)
}


(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(upsertTest)