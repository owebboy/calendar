export default class State {
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
