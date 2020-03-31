// 모듈을 가져옴
import MainController from './controllers/MainController.js'


document.addEventListener('DOMContentLoaded', () => {
  MainController.init()
})

// DOMcontentLoaded 이벤트는 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생.