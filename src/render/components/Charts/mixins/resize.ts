import { debounce } from '@/utils'

let $_sidebarElm = null;
let $_resizeHandler = null;


export function initListener(chart) {
  $_resizeHandler = debounce(() => {
    resize(chart)
  }, 100)
  window.addEventListener('resize', $_resizeHandler)

  $_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
  $_sidebarElm && $_sidebarElm.addEventListener('transitionend', $_sidebarResizeHandler)
}


function $_sidebarResizeHandler(e) {
  if (e.propertyName === 'width') {
    $_resizeHandler()
  }
}
function destroyListener() {
  window.removeEventListener('resize', $_resizeHandler)
  $_resizeHandler = null

  $_sidebarElm && $_sidebarElm.removeEventListener('transitionend', $_sidebarResizeHandler)
}

function resize(chart) {
  chart && chart.resize()
}
