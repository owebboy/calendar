/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

// CONCATENATED MODULE: ./src/js/ui.js

const ui = {
  makeCalendar: () => {
    const cal = document.createElement('div')
    cal.classList.add('calendar')

    return cal
  },

  makeMonth: (month) => {
    const m = document.createElement('div')
    m.classList.add('month')

    const n = document.createElement('div')
    n.classList.add('month-name')
    n.textContent = new Intl.DateTimeFormat('en-us', {
      month: 'long'
    }).format(month)

    m.appendChild(n)

    m.appendChild(ui.addLabels())

    const g = document.createElement('div')
    g.classList.add('month-months')

    m.appendChild(g)

    return m
  },

  makeDay: (date) => {
    const d = document.createElement('div')
    d.classList.add('date')
    d.textContent = date.getDate()
    d.dataset.date = date.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })

    return d
  },

  makeOffset: (offset) => {
    const o = document.createDocumentFragment()

    for (let i = 0; i < offset; i++) {
      const offsetBlock = document.createElement('div')
      offsetBlock.classList.add('offset-block')
      offsetBlock.innerHTML = '00'
      o.appendChild(offsetBlock)
    }

    return o
  },

  addLabels: () => {
    const dayLabel = document.createElement('div')
    dayLabel.classList.add('days-labels')

    const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    labels.forEach((l) => {
      const label = document.createElement('div')
      label.classList.add('label')
      label.textContent = l
      dayLabel.appendChild(label)
    })

    return dayLabel
  },

  getToday: (dom) => {
    dom.classList.add('today')

    return dom
  },

  makeJournal: (date) => {
    const dom = document.createElement('div')
    dom.classList.add('journal')

    const heading = document.createElement('div')
    heading.classList.add('journal-heading')
    heading.textContent = date.toLocaleDateString('en-us', {
      month: 'long',
      day: 'numeric'
    })
    dom.appendChild(heading)

    const editor = document.createElement('textarea')
    editor.classList.add('journal-editor')
    dom.appendChild(editor)

    return dom
  },

  makeYear: (yr, type) => {
    const year = document.createElement('div')
    year.textContent = yr
    year.classList.add(`${type}-year`)

    return year
  }
}

/* harmony default export */ const js_ui = (ui);

// CONCATENATED MODULE: ./src/js/month.js


class Month {
  constructor (year, month) {
    this.year = year
    this.month = month
  }

  show () {
    const m = new Date(this.year, this.month, 0)
    const month = js_ui.makeMonth(m)

    for (let j = 1; j <= m.getDate(); j++) {
      // generate a day
      const d = new Date(m.getFullYear(), m.getMonth(), j)

      // if this is the first day,
      if (j === 1) {
        month.childNodes[2].appendChild(js_ui.makeOffset(d.getDay()))
      }

      const day = js_ui.makeDay(d)
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

// CONCATENATED MODULE: ./src/js/calendar.js



class Calendar {
  constructor (state, year) {
    this.year = year
    this.state = state
    this.dom = document.createDocumentFragment()

    const cal = js_ui.makeCalendar()

    for (let i = 1; i <= 12; i++) {
      const month = this.buildMonth(i)
      cal.appendChild(month)
    }

    this.dom.appendChild(cal)

    const todayDom = this.dom.querySelector(
      `[data-date="${(new Date()).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })}"]`
    )

    if (todayDom) {
      js_ui.getToday(todayDom)
    }
  }

  buildMonth (monthIndex) {
    const month = new Month(this.year, monthIndex)
    return month.show()
  }
}

// CONCATENATED MODULE: ./src/js/header.js


class Header {
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
    const prevYear = js_ui.makeYear(this.prev, 'prev')
    prevYear.addEventListener('click', (e) => {
      const key = `year-${this.prev}`
      this.state.addAndChangeView(key, new Calendar(this.state, this.prev))
      this.setCurrent(this.prev)
    })

    yearWrapper.appendChild(prevYear)

    const currentYear = js_ui.makeYear(this.current, 'current')
    currentYear.addEventListener('click', (e) => {
      const key = `year-${this.next}`
      this.state.addAndChangeView(key, new Calendar(this.state, this.curDate.getFullYear()))
      this.setCurrent(this.curDate.getFullYear())
    })
    yearWrapper.appendChild(currentYear)

    const nextYear = js_ui.makeYear(this.next, 'next')
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

// CONCATENATED MODULE: ./src/js/state.js
class State {
  constructor (dom) {
    this.dom = dom
  }

  isView (key) {
    return document.querySelector(`[data-key="${key}"]`)
  }

  addView (key, view) {
    const state = document.createElement('div')
    state.classList.add('view')
    state.style.display = 'none'
    state.dataset.key = key

    state.appendChild(view.dom)

    this.dom.appendChild(state)
  }

  addAndChangeView (key, view) {
    if (!this.isView(key)) {
      this.addView(key, view)
    }

    this.changeView(key)
  }

  changeView (key) {
    document
      .querySelectorAll('.view')
      .forEach((v) => (v.style.display = 'none'))

    document.querySelector(`[data-key="${key}"]`).style.display = 'block'
  }
}

// CONCATENATED MODULE: ./src/app.js







const headerDiv = document.querySelector('header')
const app = document.querySelector('#app')

function main () {
  const today = new Date()
  const state = new State(app)
  const cal = new Calendar(state, today.getFullYear())
  window.header = new Header(state, headerDiv, today)

  state.addView('calendar', cal)
  state.changeView('calendar')
}

window.addEventListener('load', main)

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYWxlbmRhci8uL3NyYy9qcy91aS5qcyIsIndlYnBhY2s6Ly9jYWxlbmRhci8uL3NyYy9qcy9tb250aC5qcyIsIndlYnBhY2s6Ly9jYWxlbmRhci8uL3NyYy9qcy9jYWxlbmRhci5qcyIsIndlYnBhY2s6Ly9jYWxlbmRhci8uL3NyYy9qcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vY2FsZW5kYXIvLi9zcmMvanMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vY2FsZW5kYXIvLi9zcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUEsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixLQUFLOztBQUUvQjtBQUNBO0FBQ0E7O0FBRUEsNENBQWUsRUFBRTs7O0FDM0dJOztBQUVOO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixlQUFZOztBQUU5QixtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxnQkFBYTtBQUNyRDs7QUFFQSxrQkFBa0IsYUFBVTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FDcEMyQjtBQUNOOztBQUVOO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLGtCQUFlOztBQUUvQixtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsT0FBTyxFQUFFO0FBQ1Q7O0FBRUE7QUFDQSxNQUFNLGNBQVc7QUFDakI7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0E7QUFDQTs7O0FDbkNxQjtBQUNZO0FBQ2xCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBVztBQUNoQztBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLDJDQUEyQyxRQUFRO0FBQ25EO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQSx3QkFBd0IsY0FBVztBQUNuQztBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLDJDQUEyQyxRQUFRO0FBQ25EO0FBQ0EsS0FBSztBQUNMOztBQUVBLHFCQUFxQixjQUFXO0FBQ2hDO0FBQ0EsMEJBQTBCLFVBQVU7QUFDcEMsMkNBQTJDLFFBQVE7O0FBRW5EO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7OztBQ3BGZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRCxJQUFJO0FBQ3BEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5QyxJQUFJO0FBQzdDO0FBQ0E7OztBQ25DbUI7QUFDRztBQUNjO0FBQ0o7O0FBRUY7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixLQUFLO0FBQ3pCLGtCQUFrQixRQUFRO0FBQzFCLHNCQUFzQixNQUFNOztBQUU1QjtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoibWFpbi5tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCB1aSA9IHtcbiAgbWFrZUNhbGVuZGFyOiAoKSA9PiB7XG4gICAgY29uc3QgY2FsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjYWwuY2xhc3NMaXN0LmFkZCgnY2FsZW5kYXInKVxuXG4gICAgcmV0dXJuIGNhbFxuICB9LFxuXG4gIG1ha2VNb250aDogKG1vbnRoKSA9PiB7XG4gICAgY29uc3QgbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbS5jbGFzc0xpc3QuYWRkKCdtb250aCcpXG5cbiAgICBjb25zdCBuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBuLmNsYXNzTGlzdC5hZGQoJ21vbnRoLW5hbWUnKVxuICAgIG4udGV4dENvbnRlbnQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCgnZW4tdXMnLCB7XG4gICAgICBtb250aDogJ2xvbmcnXG4gICAgfSkuZm9ybWF0KG1vbnRoKVxuXG4gICAgbS5hcHBlbmRDaGlsZChuKVxuXG4gICAgbS5hcHBlbmRDaGlsZCh1aS5hZGRMYWJlbHMoKSlcblxuICAgIGNvbnN0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGcuY2xhc3NMaXN0LmFkZCgnbW9udGgtbW9udGhzJylcblxuICAgIG0uYXBwZW5kQ2hpbGQoZylcblxuICAgIHJldHVybiBtXG4gIH0sXG5cbiAgbWFrZURheTogKGRhdGUpID0+IHtcbiAgICBjb25zdCBkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkLmNsYXNzTGlzdC5hZGQoJ2RhdGUnKVxuICAgIGQudGV4dENvbnRlbnQgPSBkYXRlLmdldERhdGUoKVxuICAgIGQuZGF0YXNldC5kYXRlID0gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLXVzJywge1xuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgbW9udGg6ICdudW1lcmljJyxcbiAgICAgIGRheTogJ251bWVyaWMnXG4gICAgfSlcblxuICAgIHJldHVybiBkXG4gIH0sXG5cbiAgbWFrZU9mZnNldDogKG9mZnNldCkgPT4ge1xuICAgIGNvbnN0IG8gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2Zmc2V0OyBpKyspIHtcbiAgICAgIGNvbnN0IG9mZnNldEJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIG9mZnNldEJsb2NrLmNsYXNzTGlzdC5hZGQoJ29mZnNldC1ibG9jaycpXG4gICAgICBvZmZzZXRCbG9jay5pbm5lckhUTUwgPSAnMDAnXG4gICAgICBvLmFwcGVuZENoaWxkKG9mZnNldEJsb2NrKVxuICAgIH1cblxuICAgIHJldHVybiBvXG4gIH0sXG5cbiAgYWRkTGFiZWxzOiAoKSA9PiB7XG4gICAgY29uc3QgZGF5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRheUxhYmVsLmNsYXNzTGlzdC5hZGQoJ2RheXMtbGFiZWxzJylcblxuICAgIGNvbnN0IGxhYmVscyA9IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXG5cbiAgICBsYWJlbHMuZm9yRWFjaCgobCkgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnbGFiZWwnKVxuICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBsXG4gICAgICBkYXlMYWJlbC5hcHBlbmRDaGlsZChsYWJlbClcbiAgICB9KVxuXG4gICAgcmV0dXJuIGRheUxhYmVsXG4gIH0sXG5cbiAgZ2V0VG9kYXk6IChkb20pID0+IHtcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgndG9kYXknKVxuXG4gICAgcmV0dXJuIGRvbVxuICB9LFxuXG4gIG1ha2VKb3VybmFsOiAoZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ2pvdXJuYWwnKVxuXG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCdqb3VybmFsLWhlYWRpbmcnKVxuICAgIGhlYWRpbmcudGV4dENvbnRlbnQgPSBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tdXMnLCB7XG4gICAgICBtb250aDogJ2xvbmcnLFxuICAgICAgZGF5OiAnbnVtZXJpYydcbiAgICB9KVxuICAgIGRvbS5hcHBlbmRDaGlsZChoZWFkaW5nKVxuXG4gICAgY29uc3QgZWRpdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKVxuICAgIGVkaXRvci5jbGFzc0xpc3QuYWRkKCdqb3VybmFsLWVkaXRvcicpXG4gICAgZG9tLmFwcGVuZENoaWxkKGVkaXRvcilcblxuICAgIHJldHVybiBkb21cbiAgfSxcblxuICBtYWtlWWVhcjogKHlyLCB0eXBlKSA9PiB7XG4gICAgY29uc3QgeWVhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgeWVhci50ZXh0Q29udGVudCA9IHlyXG4gICAgeWVhci5jbGFzc0xpc3QuYWRkKGAke3R5cGV9LXllYXJgKVxuXG4gICAgcmV0dXJuIHllYXJcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB1aVxuIiwiaW1wb3J0IHVpIGZyb20gJy4vdWknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoIHtcbiAgY29uc3RydWN0b3IgKHllYXIsIG1vbnRoKSB7XG4gICAgdGhpcy55ZWFyID0geWVhclxuICAgIHRoaXMubW9udGggPSBtb250aFxuICB9XG5cbiAgc2hvdyAoKSB7XG4gICAgY29uc3QgbSA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgMClcbiAgICBjb25zdCBtb250aCA9IHVpLm1ha2VNb250aChtKVxuXG4gICAgZm9yIChsZXQgaiA9IDE7IGogPD0gbS5nZXREYXRlKCk7IGorKykge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBkYXlcbiAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShtLmdldEZ1bGxZZWFyKCksIG0uZ2V0TW9udGgoKSwgailcblxuICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgZmlyc3QgZGF5LFxuICAgICAgaWYgKGogPT09IDEpIHtcbiAgICAgICAgbW9udGguY2hpbGROb2Rlc1syXS5hcHBlbmRDaGlsZCh1aS5tYWtlT2Zmc2V0KGQuZ2V0RGF5KCkpKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXkgPSB1aS5tYWtlRGF5KGQpXG4gICAgICBkYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBjb25zdCBrZXkgPSBkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tdXMnLCB7XG4gICAgICAgIC8vICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAvLyAgIG1vbnRoOiAnbnVtZXJpYycsXG4gICAgICAgIC8vICAgZGF5OiAnbnVtZXJpYydcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gaWYgKCF0aGlzLnN0YXRlLmlzVmlldyhrZXkpKSB0aGlzLnN0YXRlLmFkZFZpZXcoa2V5LCB1aS5tYWtlSm91cm5hbChkKSk7XG4gICAgICB9KVxuXG4gICAgICBtb250aC5jaGlsZE5vZGVzWzJdLmFwcGVuZENoaWxkKGRheSlcbiAgICB9XG5cbiAgICByZXR1cm4gbW9udGhcbiAgfVxufVxuIiwiaW1wb3J0IE1vbnRoIGZyb20gJy4vbW9udGgnXG5pbXBvcnQgdWkgZnJvbSAnLi91aSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIge1xuICBjb25zdHJ1Y3RvciAoc3RhdGUsIHllYXIpIHtcbiAgICB0aGlzLnllYXIgPSB5ZWFyXG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlXG4gICAgdGhpcy5kb20gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblxuICAgIGNvbnN0IGNhbCA9IHVpLm1ha2VDYWxlbmRhcigpXG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMjsgaSsrKSB7XG4gICAgICBjb25zdCBtb250aCA9IHRoaXMuYnVpbGRNb250aChpKVxuICAgICAgY2FsLmFwcGVuZENoaWxkKG1vbnRoKVxuICAgIH1cblxuICAgIHRoaXMuZG9tLmFwcGVuZENoaWxkKGNhbClcblxuICAgIGNvbnN0IHRvZGF5RG9tID0gdGhpcy5kb20ucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1kYXRlPVwiJHsobmV3IERhdGUoKSkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi11cycsIHtcbiAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICBtb250aDogJ251bWVyaWMnLFxuICAgICAgICBkYXk6ICdudW1lcmljJ1xuICAgICAgfSl9XCJdYFxuICAgIClcblxuICAgIGlmICh0b2RheURvbSkge1xuICAgICAgdWkuZ2V0VG9kYXkodG9kYXlEb20pXG4gICAgfVxuICB9XG5cbiAgYnVpbGRNb250aCAobW9udGhJbmRleCkge1xuICAgIGNvbnN0IG1vbnRoID0gbmV3IE1vbnRoKHRoaXMueWVhciwgbW9udGhJbmRleClcbiAgICByZXR1cm4gbW9udGguc2hvdygpXG4gIH1cbn1cbiIsImltcG9ydCB1aSBmcm9tICcuL3VpJ1xuaW1wb3J0IENhbGVuZGFyIGZyb20gJy4vY2FsZW5kYXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIge1xuICBjb25zdHJ1Y3RvciAoc3RhdGUsIGRvbSwgY3VyRGF0ZSkge1xuICAgIHRoaXMuZG9tID0gZG9tXG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlXG4gICAgdGhpcy5jdXJEYXRlID0gY3VyRGF0ZVxuXG4gICAgdGhpcy5jdXJyZW50ID0gY3VyRGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgdGhpcy5wcmV2ID0gdGhpcy5jdXJyZW50IC0gMVxuICAgIHRoaXMubmV4dCA9IHRoaXMuY3VycmVudCArIDFcblxuICAgIHRoaXMuYnVpbGRIZWFkZXIoKVxuICB9XG5cbiAgc2V0Q3VycmVudCAoeWVhcikge1xuICAgIHRoaXMuY3VycmVudCA9IHllYXJcbiAgICB0aGlzLnByZXYgPSB0aGlzLmN1cnJlbnQgLSAxXG4gICAgdGhpcy5uZXh0ID0gdGhpcy5jdXJyZW50ICsgMVxuXG4gICAgdGhpcy5idWlsZEhlYWRlcigpXG4gIH1cblxuICBidWlsZEhlYWRlciAoKSB7XG4gICAgdGhpcy5kb20uaW5uZXJIVE1MID0gJydcblxuICAgIHRoaXMuYnVpbGRZZWFycygpXG4gICAgdGhpcy5idWlsZE1vbnRocygpXG4gIH1cblxuICBidWlsZFllYXJzICgpIHtcbiAgICBjb25zdCB5ZWFyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgeWVhcldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyLXllYXJzJylcbiAgICBjb25zdCBwcmV2WWVhciA9IHVpLm1ha2VZZWFyKHRoaXMucHJldiwgJ3ByZXYnKVxuICAgIHByZXZZZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IGB5ZWFyLSR7dGhpcy5wcmV2fWBcbiAgICAgIHRoaXMuc3RhdGUuYWRkQW5kQ2hhbmdlVmlldyhrZXksIG5ldyBDYWxlbmRhcih0aGlzLnN0YXRlLCB0aGlzLnByZXYpKVxuICAgICAgdGhpcy5zZXRDdXJyZW50KHRoaXMucHJldilcbiAgICB9KVxuXG4gICAgeWVhcldyYXBwZXIuYXBwZW5kQ2hpbGQocHJldlllYXIpXG5cbiAgICBjb25zdCBjdXJyZW50WWVhciA9IHVpLm1ha2VZZWFyKHRoaXMuY3VycmVudCwgJ2N1cnJlbnQnKVxuICAgIGN1cnJlbnRZZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IGB5ZWFyLSR7dGhpcy5uZXh0fWBcbiAgICAgIHRoaXMuc3RhdGUuYWRkQW5kQ2hhbmdlVmlldyhrZXksIG5ldyBDYWxlbmRhcih0aGlzLnN0YXRlLCB0aGlzLmN1ckRhdGUuZ2V0RnVsbFllYXIoKSkpXG4gICAgICB0aGlzLnNldEN1cnJlbnQodGhpcy5jdXJEYXRlLmdldEZ1bGxZZWFyKCkpXG4gICAgfSlcbiAgICB5ZWFyV3JhcHBlci5hcHBlbmRDaGlsZChjdXJyZW50WWVhcilcblxuICAgIGNvbnN0IG5leHRZZWFyID0gdWkubWFrZVllYXIodGhpcy5uZXh0LCAnbmV4dCcpXG4gICAgbmV4dFllYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gYHllYXItJHt0aGlzLm5leHR9YFxuICAgICAgdGhpcy5zdGF0ZS5hZGRBbmRDaGFuZ2VWaWV3KGtleSwgbmV3IENhbGVuZGFyKHRoaXMuc3RhdGUsIHRoaXMubmV4dCkpXG5cbiAgICAgIHRoaXMuc2V0Q3VycmVudCh0aGlzLm5leHQpXG4gICAgfSlcbiAgICB5ZWFyV3JhcHBlci5hcHBlbmRDaGlsZChuZXh0WWVhcilcblxuICAgIHRoaXMuZG9tLmFwcGVuZCh5ZWFyV3JhcHBlcilcbiAgfVxuXG4gIGJ1aWxkTW9udGhzICgpIHtcbiAgICBjb25zdCBtb250aFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1vbnRoV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdoZWFkZXItbW9udGhzJylcbiAgICBmb3IgKGNvbnN0IG1vbnRoIG9mIHRoaXMuX2xpc3RNb250aHMoKSkge1xuICAgICAgY29uc3QgbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBtLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci1tb250aCcpXG4gICAgICBtLnRleHRDb250ZW50ID0gbW9udGhcbiAgICAgIG1vbnRoV3JhcHBlci5hcHBlbmQobSlcbiAgICB9XG5cbiAgICB0aGlzLmRvbS5hcHBlbmQobW9udGhXcmFwcGVyKVxuICB9XG5cbiAgX2xpc3RNb250aHMgKCkge1xuICAgIGNvbnN0IG1vbnRocyA9IFtdXG4gICAgZm9yIChsZXQgbSA9IDA7IG0gPCAxMjsgbSsrKSB7XG4gICAgICBtb250aHMucHVzaChuZXcgRGF0ZSh0aGlzLmN1cnJlbnQsIG0sIDEpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tdXMnLCB7XG4gICAgICAgIG1vbnRoOiAnc2hvcnQnXG4gICAgICB9KSlcbiAgICB9XG4gICAgcmV0dXJuIG1vbnRoc1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0ZSB7XG4gIGNvbnN0cnVjdG9yIChkb20pIHtcbiAgICB0aGlzLmRvbSA9IGRvbVxuICB9XG5cbiAgaXNWaWV3IChrZXkpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEta2V5PVwiJHtrZXl9XCJdYClcbiAgfVxuXG4gIGFkZFZpZXcgKGtleSwgdmlldykge1xuICAgIGNvbnN0IHN0YXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzdGF0ZS5jbGFzc0xpc3QuYWRkKCd2aWV3JylcbiAgICBzdGF0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgc3RhdGUuZGF0YXNldC5rZXkgPSBrZXlcblxuICAgIHN0YXRlLmFwcGVuZENoaWxkKHZpZXcuZG9tKVxuXG4gICAgdGhpcy5kb20uYXBwZW5kQ2hpbGQoc3RhdGUpXG4gIH1cblxuICBhZGRBbmRDaGFuZ2VWaWV3IChrZXksIHZpZXcpIHtcbiAgICBpZiAoIXRoaXMuaXNWaWV3KGtleSkpIHtcbiAgICAgIHRoaXMuYWRkVmlldyhrZXksIHZpZXcpXG4gICAgfVxuXG4gICAgdGhpcy5jaGFuZ2VWaWV3KGtleSlcbiAgfVxuXG4gIGNoYW5nZVZpZXcgKGtleSkge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnZpZXcnKVxuICAgICAgLmZvckVhY2goKHYpID0+ICh2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEta2V5PVwiJHtrZXl9XCJdYCkuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgfVxufVxuIiwiaW1wb3J0ICcuL2FwcC5zY3NzJ1xuaW1wb3J0ICdub3JtYWxpemUuY3NzJ1xuaW1wb3J0IENhbGVuZGFyIGZyb20gJy4vanMvY2FsZW5kYXInXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vanMvaGVhZGVyJ1xuXG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9qcy9zdGF0ZSdcblxuY29uc3QgaGVhZGVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJylcbmNvbnN0IGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKVxuXG5mdW5jdGlvbiBtYWluICgpIHtcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gIGNvbnN0IHN0YXRlID0gbmV3IFN0YXRlKGFwcClcbiAgY29uc3QgY2FsID0gbmV3IENhbGVuZGFyKHN0YXRlLCB0b2RheS5nZXRGdWxsWWVhcigpKVxuICB3aW5kb3cuaGVhZGVyID0gbmV3IEhlYWRlcihzdGF0ZSwgaGVhZGVyRGl2LCB0b2RheSlcblxuICBzdGF0ZS5hZGRWaWV3KCdjYWxlbmRhcicsIGNhbClcbiAgc3RhdGUuY2hhbmdlVmlldygnY2FsZW5kYXInKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG1haW4pXG4iXSwic291cmNlUm9vdCI6IiJ9