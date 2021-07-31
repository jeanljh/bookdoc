const commonPF = require('../util_functions/commonPF');

module.exports = {
    email: `${commonPF.genRandomStr(5)}@${commonPF.genRandomStr(4)}.${commonPF.genRandomStr(3)}`,
    pwd: commonPF.genRandomStr(6),
    fname: 'aaa',
    lname: 'bbb',
    dob: new Date('7 Mar 1985'),
    sex: 'male',
    phone: commonPF.getRandomNumForRange(10000000, 100000000)
}