module.exports = new commonPF();

function commonPF() {
    this.formatDate = (date, separator) => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        if (day < 10)
            day = '0' + day;
        if (month < 10)
            month = '0' + month;
        return [day, month, year].join(separator);
    }
    this.getRandomNumExMax = total => Math.floor(Math.random() * total);
    this.getRandomNumForRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    this.getElementText = elm => elm.map(elm => elm.getText());
    this.genRandomStr = len => require('crypto').randomBytes(Math.ceil(len / 2))
        .toString('hex').slice(0, len);
    this.selectFromElmArray = (elm, input) => elm.reduce((acc, elm) => {
        if (acc) return acc;
        return elm.getText().then(val => {
            if (val === input) {
                elm.click();
                return true;
            }
        });
    });
}