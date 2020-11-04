const { Student, sequelize } = require('./init')
const { Op } = require('sequelize')

async function save() {
    let user1 = {
        name: '小十',
        age: 19,
    };
    // const res = await user1.save(); // 直接调用出错，必须是 model 调用


    const user = await Student.findOne({
        where: {
            id: 1
        }
    })
    console.log('user1 = ', user);
    user.age = 1100;
    const res = await user.save();
    return res
}


(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(save)