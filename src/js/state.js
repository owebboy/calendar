module.exports = class State {

    constructor(dom) {
        this.dom = dom
    }

    isView(key) {
        return document.querySelector(`[data-key="${key}"]`)
    }

    addView(key, view) {
        let state = document.createElement('div')
        state.classList.add('view')
        state.style.display = "none"
        state.dataset.key = key

        state.appendChild(view)

        this.dom.appendChild(state)
    }

    changeView(key) {
        document.querySelectorAll('.view').forEach(v => v.style.display = 'none')

        document.querySelector(`[data-key="${key}"]`).style.display = 'block'
    }

}