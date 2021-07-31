module.exports = {
    lblAlert: $$('.alert'),
    tfEmail: element(by.id('registration__email')),
    tfPwd: element(by.id('registration__password')),
    tfFname: element(by.id('registration__first-name')),
    tfLname: element(by.id('registration__last-name')),
    cbbDob: $$('.btn--'),
    ddlDay: $$("li[class*='date-of-birth_date'] div li[role='menuitem'] a span"),
    ddlMonth: $$("li[class*='date-of-birth_month'] div li[role='menuitem'] a span"),
    ddlYear: $$("li[class*='date-of-birth_year'] div li[role='menuitem'] a span"),
    tfPhone: element(by.id('registration__phone')),
    lblMale: $("label[for='registration__gender--male']"),
    ckbMale: element(by.id('registration__gender--male')),
    lblFemale: $("label[for='registration__gender--female']"),
    ckbFemale: element(by.id('registration__gender--female')),
    ckbTnc: $("label[for='join-now__term-privacy']"),
    btnContinue: $('.btn--success')
}