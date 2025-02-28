import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n/config'
import i18n from 'i18next'

// 타이틀과 파비콘 변경 함수
const updateTitleAndFavicon = (lang: string) => {
  document.title = lang === 'ko' ? '잼잼400 - 즐거운 재활 운동 게임' : 'GemGem400 - Fun Rehabilitation Exercise Game'
  
  const favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']")
  if (favicon) {
    favicon.href = lang === 'ko' 
      ? '/images/잼잼400_파비콘 등/GemGem400_logo_KR/favicon.ico' 
      : '/images/잼잼400_파비콘 등/GemGem400_logo_EN/favicon.ico'
  }
}

// 언어 변경 이벤트 리스너
i18n.on('languageChanged', (lang: string) => {
  updateTitleAndFavicon(lang)
})

// 초기 설정
updateTitleAndFavicon(i18n.language)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
