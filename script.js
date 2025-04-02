// タブ切り替え機能
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // アクティブタブのクラスを削除
      document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active')
      })

      // タブコンテンツの非表示
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active')
      })

      // クリックされたタブをアクティブに
      tab.classList.add('active')

      // 対応するコンテンツを表示
      const tabId = tab.getAttribute('data-tab')
      document.getElementById(tabId).classList.add('active')
    })
  })

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        })
      }
    })
  })

  // アニメーション効果
  const animateElements = () => {
    const elements = document.querySelectorAll('.card, .step')

    elements.forEach(element => {
      const position = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (position < screenPosition) {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }
    })
  }

  // 初期スタイル設定
  document.querySelectorAll('.card, .step').forEach(element => {
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
  })

  // スクロール時のアニメーション
  window.addEventListener('scroll', animateElements)

  // 初期表示時にもアニメーション実行
  animateElements()
}) 