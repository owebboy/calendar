
const ui = {
    makeCalendar: () => {
        let cal = document.createElement('div')
        cal.classList.add('calendar')
        
        return cal
    },

    makeMonth: (month) => {
        let m = document.createElement('div')
        m.classList.add('month')
        
        let n = document.createElement('div')
        n.classList.add('month-name')
        n.textContent = new Intl.DateTimeFormat('en-us', {month:"long", year:"numeric"}).format(month)

        m.appendChild(n)

        m.appendChild(ui.addLabels())

        let g = document.createElement('div')
        g.classList.add('month-months')
        
        m.appendChild(g)

        return m
    },

    makeDay: (date) => {
        let d = document.createElement('div')
        d.classList.add('date')
        d.textContent = date.getDate()
        d.dataset.date = date.toLocaleDateString('en-us', { year: 'numeric', month: 'numeric', day: 'numeric'})

        return d
    },

    makeOffset: (offset) => {
        let o = document.createDocumentFragment()

        for(let i = 0; i < offset; i++)
        {
            let offsetBlock = document.createElement('div')
            offsetBlock.classList.add('offset-block')
            offsetBlock.innerHTML = "00"
            o.appendChild(offsetBlock)
        }
        
        return o
    },

    addLabels: () => {
        let dayLabel = document.createElement('div')
        dayLabel.classList.add('days-labels')

        let labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

        labels.forEach(l => {
            let label = document.createElement('div')
            label.classList.add('label')
            label.textContent = l
            dayLabel.appendChild(label)
        })

        return dayLabel;
    },

    getToday: (dom) => {

        dom.classList.add('today')

        return dom
    },

    makeJournal: (date) => {

        let dom = document.createElement('div')
        dom.classList.add('journal')

        let heading = document.createElement('div')
        heading.classList.add('journal-heading')
        heading.textContent = date.toLocaleDateString('en-us', {
            month: 'long', 
            day: 'numeric'
        })
        dom.appendChild(heading)

        let editor = document.createElement('textarea')
        editor.classList.add('journal-editor')
        dom.appendChild(editor)

        
        
        return dom
    },

    makeHeader: (state, curDate) => {
        let header = document.createElement('header')
        let yr = curDate.getFullYear();

        
        let prevYear = document.createElement('div')
        prevYear.classList.add('prev-year')
        prevYear.textContent = yr - 1
        prevYear.addEventListener('click', e => {
            let key = `year-${yr - 1}`
            if(!state.isView(key)) 
                    state.addView(key, new Calendar(d))

            state.changeView(key)
        })
        header.appendChild(prevYear)

        let currentYear = document.createElement('div')
        currentYear.classList.add('current-year')
        currentYear.textContent = yr
        header.appendChild(currentYear)

        let nextYear = document.createElement('div')
        nextYear.classList.add('next-year')
        nextYear.textContent = yr + 1
        header.appendChild(nextYear)

        return header
    }
 }

module.exports = ui