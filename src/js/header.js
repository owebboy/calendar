import ui from './ui'
import Calendar from './calendar'
export default class Header {
  constructor (state, dom, curDate) {
    this.dom = dom
    this.state = state
    this.curDate = curDate

    this.current = curDate.getFullYear()
    this.prev = this.current - 1
    this.next = this.current + 1

    this.buildHeader()
  }

  setCurrent (year) {
    this.current = year
    this.prev = this.current - 1
    this.next = this.current + 1

    this.buildHeader()
  }

  buildHeader () {
    this.dom.innerHTML = ''

    this.buildYears()
    this.buildMonths()
  }

  buildYears () {
    const yearWrapper = document.createElement('div')
    yearWrapper.classList.add('header-years')
    const prevYear = ui.makeYear(this.prev, 'prev')
    prevYear.addEventListener('click', (e) => {
      const key = `year-${this.prev}`
      this.state.addAndChangeView(key, new Calendar(this.state, this.prev))
      this.setCurrent(this.prev)
    })

    yearWrapper.appendChild(prevYear)

    const currentYear = ui.makeYear(this.current, 'current')
    currentYear.addEventListener('click', (e) => {
      const key = `year-${this.next}`
      this.state.addAndChangeView(key, new Calendar(this.state, this.curDate.getFullYear()))
      this.setCurrent(this.curDate.getFullYear())
    })
    yearWrapper.appendChild(currentYear)

    const nextYear = ui.makeYear(this.next, 'next')
    nextYear.addEventListener('click', (e) => {
      const key = `year-${this.next}`
      this.state.addAndChangeView(key, new Calendar(this.state, this.next))

      this.setCurrent(this.next)
    })
    yearWrapper.appendChild(nextYear)

    this.dom.append(yearWrapper)
  }

  buildMonths () {
    const monthWrapper = document.createElement('div')
    monthWrapper.classList.add('header-months')
    for (const month of this._listMonths()) {
      const m = document.createElement('div')
      m.classList.add('header-month')
      m.textContent = month
      monthWrapper.append(m)
    }

    this.dom.append(monthWrapper)
  }

  _listMonths () {
    const months = []
    for (let m = 0; m < 12; m++) {
      months.push(new Date(this.current, m, 1).toLocaleDateString('en-us', {
        month: 'short'
      }))
    }
    return months
  }
}
