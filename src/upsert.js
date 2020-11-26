const { Student, sequelize } = require('./init')
const { Op } = require('sequelize')

async function upsertTest() {
    let user1 = {
        name: '小七',
        age: 19,
    };
    let user2 = {
        name: '小七',   // 必须要有唯一性约束，才能更新插入
        age: 190,
    }
    // INSERT INTO `students` (`id`,`name`,`age`) VALUES (DEFAULT,?,?);
    await Student.create(user1, { logging: sql => console.log(sql) });
    // INSERT INTO `students` (`name`,`age`) VALUES (?,?) ON DUPLICATE KEY UPDATE `name`=VALUES(`name`),`age`=VALUES(`age`)
    await Student.upsert(user2, { logging: sql => console.log(sql) })
}


(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(upsertTest)