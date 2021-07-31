module.exports = {
    tfSearch: $$('.form-control.text-field'),
    ddlService: $("ul[class *= 'common-searches']"),
    ddlServiceSearch: $("ul[class='dropdown-menu search-suggestion']"),
    lblService: $$('.item-content.ng-binding'),
    lnkFullList: $('.common-search-footer__content'),
    lblFullService: $$('.list-specialties li a'),
    lblSearchTag: $$("strong[class='is-highlight']"),
    btnSearch: $('.btn--lg'),
    lnkRegister: $('.join-now'),
    ddlLocation: $("ul[class='dropdown-menu search-location']"),
    lblLocation: $$("ul[class='dropdown-menu search-location'] > li:not(:nth-child(2)) > a > span:nth-child(1)"),
    ddlDatePicker: $("div[ng-switch='datepickerMode']"),
    lblHeader: $("button[class*='btn-sm'][role='heading']"),
    lblDay: $$("button[class*='btn-sm'][ng-click*='select'] span[class='ng-binding']"),
    // this.lblDay = $$("button[class*='btn-sm'][ng-click*='select'] span[class='ng-binding'],[class*='text-info']");
    lblCurrentDay: $('.text-info'),
    btnPrevMonth: $('.btn-sm.pull-left'),
    btnNextMonth: $('.btn-sm.pull-right')
}
