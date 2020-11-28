import './app.scss'
import 'normalize.css'
import Calendar from './js/calendar'
import Header from './js/header'

import State from './js/state'

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
