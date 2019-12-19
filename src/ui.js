
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

    getToday: (today) => {
        let todayInCal = document.querySelector(`[data-date="${today.toLocaleDateString('en-us', { year: 'numeric', month: 'numeric', day: 'numeric'})}"]`)

        todayInCal.classList.add('today')

        return todayInCal
    }
 }

module.exports = ui