const tag = '[View]'

// export -- default {}
// 모듈을 이름없이 export합니다.
// 하나의 모듈(파일)에서는 하나의 default export만 가능합니다.

export default {
  init(el) {
    if (!el) throw el
    this.el = el
    return this
  },

  on(event, handler) {
    this.el.addEventListener(event, handler)
    return this
  },

  emit(event, data) {
    const evt = new CustomEvent(event, { detail: data })
    this.el.dispatchEvent(evt)
    return this
  },

  hide() {
    this.el.style.display = 'none'
    return this
  },

  show() {
    this.el.style.display = ''
    return this
  }
}