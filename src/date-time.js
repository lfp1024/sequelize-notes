const { Teacher, sequelize } = require('./init')
const { Op } = require('sequelize')

const TIMEZONE_IN_MS = 1000 * 60 * 60 * 8;

async function create(model) {
    const val = {
        name: 'park',
        birthday: Date.now(),
        sex: 1
    }
    const teacher = model ? model : val
    return await Teacher.create(teacher);
}

async function findAndCreate() {
    const res = await Teacher.findOne({
        where: {
            name: 'james',
        },
    })

    if (res) {
        console.log('succeed111:', typeof res, res) // object {}
    } else {
        console.log('failure111:', res)
    }

    const rr = res.dataValues;
    delete rr.id
    rr.sex = 11
    rr.birthday = Date.now();   // 自动添加的 created_at 字段不会自动更新，updated_at 字段会更新为插入时间
    console.log('rr = ', rr)
    const res2 = await create(rr);

    console.log('succeed222:', typeof res2, res2) // object {}
}

async function findAndCreateUseOldDate() {
    const res = await Teacher.findOne({
        where: {
            name: 'everson',
        },
    })

    if (res) {
        console.log('succeed111:', typeof res, res) // object {}
    } else {
        console.log('failure111:', res)
    }

    const rr = res.dataValues;
    const values = {
        name:'test',
        sex:112,
        // birthday:rr.birthday, //  服用之前的生日时间，根据本地的时区，具体存入的时间不同。
        // 如果本地是CST，则之前的生日在存入MySQL的时候会被-8，查询的时候再+8，两者生日相同
        // 如果本地是UTC，则之前的生日在存入MySQL的时候不会-8，查询的时候再+8，后者生日+8小时
        // 查询的时候+8是因为sequelize配置了 timezone: '+08:00'
        birthday: Date.parse(rr.birthday) - TIMEZONE_IN_MS, // 减去8小时
    }
    console.log('values = ', values)
    const res2 = await create(values);

    console.log('succeed222:', typeof res2, res2) // object {}
}

(async (fn) => {
    fn()
        .then(data => { console.log('operate successfully:', data) })
        .finally(() => { sequelize.close() })
})(findAndCreateUseOldDate)