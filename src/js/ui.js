
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

export default ui
