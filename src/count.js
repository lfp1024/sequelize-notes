'use strict';

const { Sequelize, Op } = require('sequelize')
const { Student, Class, sequelize } = require('./init');

(async () => {
    const numOfStudents = await Student.count();
    console.log('num of students = ', numOfStudents);

})();


