const { Student, Teacher, Class, sequelize } = require('./init')

async function findOrCreate() {

    const res = await Student.findOrCreate({
        where: {
            name: '阿斯顿服爱的', // 该字段也会跟 defaults 字段一起插入
        },
        defaults: {
            age: 22,
            isAdult: 1, // 如果model配置了 underscored: true, 则会将小驼峰自动转换为下划线格式
            class_id: 2,
        }
    });
    console.log('res = ', res);
}

(async (fn) => {
    fn()
        .then(data => { console.log('operator successfully', data) })
        .finally(() => { sequelize.close() })
})(findOrCreate)
