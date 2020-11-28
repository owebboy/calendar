import ui from './ui'

export default class Month {
  constructor (year, month) {
    this.year = year
    this.month = month
  }

  show () {
    const m = new Date(this.year, this.month, 0)
    const month = ui.makeMonth(m)

    for (let j = 1; j <= m.getDate(); j++) {
      // generate a day
      const d = new Date(m.getFullYear(), m.getMonth(), j)

      // if this is the first day,
      if (j === 1) {
        month.childNodes[2].appendChild(ui.makeOffset(d.getDay()))
      }

      const day = ui.makeDay(d)
      day.addEventListener('click', (e) => {
        // const key = d.toLocaleDateString('en-us', {
        //   year: 'numeric',
        //   month: 'numeric',
        //   day: 'numeric'
        // })
        // if (!this.state.isView(key)) this.state.addView(key, ui.makeJournal(d));
      })

      month.childNodes[2].appendChild(day)
    }

    return month
  }
}
