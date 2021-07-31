const commonPF = require('../util_functions/commonPF');

module.exports = {
    data1: {
        email: commonPF.genRandomStr(5),
        pwd: commonPF.genRandomStr(1),
        fname: commonPF.getRandomNumExMax(10) + commonPF.genRandomStr(1),
        lname: commonPF.getRandomNumExMax(10) + commonPF.genRandomStr(1),
        phone: '1234abc'
    },
    data2: {
        email: `${commonPF.genRandomStr(5)}@${commonPF.genRandomStr(1)}`,
        pwd: commonPF.genRandomStr(4),
        fname: commonPF.getRandomNumExMax(10) + commonPF.genRandomStr(2),
        lname: commonPF.getRandomNumExMax(10) + commonPF.genRandomStr(2),
        phone: commonPF.genRandomStr(6)
    },
    data3: {
        email: `${commonPF.genRandomStr(5)}@${commonPF.genRandomStr(1)}.${commonPF.getRandomNumExMax(10)}`,
        pwd: commonPF.genRandomStr(5),
        fname: commonPF.genRandomStr(3) + commonPF.getRandomNumExMax(10),
        lname: commonPF.genRandomStr(3) + commonPF.getRandomNumExMax(10),
        phone: commonPF.getRandomNumExMax(1000000)    
    }
}