const ui = require('./ui')
const app = document.querySelector('#app')

let cal = ui.makeCalendar()

let today = new Date()

let year = today.getFullYear()
let month = today.getMonth()+1

for(let i = month; i < 12 + month; i++) {
    
    let m = new Date(year, i, 0)
    let month = ui.makeMonth(m)


    for(let j = 1; j < m.getDate()+1; j++) {
            
        let d = new Date(m.getFullYear(), m.getMonth(), j)

        if(j==1) {
            month.childNodes[2].appendChild(ui.makeOffset(d.getDay()))          
        }

        let day = ui.makeDay(d)

        month.childNodes[2].appendChild(day)
    }


    cal.appendChild(month)
}

app.appendChild(cal)

ui.getToday(today)
