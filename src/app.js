const State = require('./js/state')
const ui = require('./js/ui')

const app = document.querySelector('#app')

let today = new Date()
let state = new State(app)

let header = ui.makeHeader(today)
app.appendChild(header)

function main() {
    let cal = calendar(today.getFullYear())

    state.addView('calendar', cal)
    state.changeView('calendar')  
}

function journal(date) {
    let dom = document.createDocumentFragment()

    

    return dom
}

function calendar(year) {
    let dom = document.createDocumentFragment()

    let cal = ui.makeCalendar()

    for(let i = 1; i < 13; i++) {
        
        let m = new Date(year, i, 0)
        let month = ui.makeMonth(m)

        for(let j = 1; j < m.getDate()+1; j++) {
                
            let d = new Date(m.getFullYear(), m.getMonth(), j)

            if(j==1) {
                month.childNodes[2].appendChild(ui.makeOffset(d.getDay()))          
            }

            let day = ui.makeDay(d)
            day.addEventListener('click', e => {
                let key = d.toLocaleDateString('en-us', { year: 'numeric', month: 'numeric', day: 'numeric'})
                if(!state.isView(key)) 
                    state.addView(key, ui.makeJournal(d))

                state.changeView(key)
            })

            month.childNodes[2].appendChild(day)
        }

        cal.appendChild(month)
    }

    dom.appendChild(cal)

    let todayDom = dom.querySelector(`[data-date="${today.toLocaleDateString('en-us', { year: 'numeric', month: 'numeric', day: 'numeric'})}"]`)

    ui.getToday(todayDom)

    return dom
}

window.addEventListener('load', main)