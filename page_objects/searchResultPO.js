module.exports = new searchResultPO();

function searchResultPO() {
    this.cbbMainFilter = $$('.form-control');
    this.cbbSubFilter = $$('.btn.dropdown-toggle');
    this.lblCalMonthYear = $("table[role='grid'] thead tr:nth-child(1) th:nth-child(2)");
    this.lblSelectedDay = $('.btn-info.active');
    this.lblDay = $("tbody tr:not(:nth-child(6)) td button span[class='ng-binding'],[class*='text-info']");
    this.lblLocation = $(".search__info_location");
    this.lblSpecialty = $$('.doctor-profile__specialties');
    // this.lblSpecialty = $$('.doctor-profile__specialties li span');
    this.btnNext = $("li[class='next'] a");
}