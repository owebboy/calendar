import Month from "./month";
import ui from "./ui"

export default class Calendar {
  constructor(state, year) {
    this.year = year
    this.state = state
    this.dom = document.createDocumentFragment()

    let cal = ui.makeCalendar();

    for(let i = 1; i <= 12; i++) {
      let month = this.buildMonth(i)
      cal.appendChild(month);
    }

    this.dom.appendChild(cal);


    let todayDom = this.dom.querySelector(
      `[data-date="${(new Date()).toLocaleDateString("en-us", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}"]`
    );

    if(todayDom) {
      ui.getToday(todayDom);
    }
  

  }


  buildMonth(monthIndex) {
    let month = new Month(this.year, monthIndex)
    return month.show()
  }
}