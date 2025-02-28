import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// 언어 설정을 객체로 관리
const LANGUAGES = {
  ko: { 
    code: 'ko', 
    label: 'KR', 
    logo: '/images/gemgem-logo-ko.png',
    name: '한국어'
  },
  en: { 
    code: 'en', 
    label: 'EN', 
    logo: '/images/gemgem-logo-en.png',
    name: 'English'
  },
  // ja: { 
  //   code: 'ja', 
  //   label: 'JA', 
  //   logo: '/images/gemgem-logo-ja.png',
  //   name: '日本語'
  // }
} as const;

// 네비게이션 메뉴 설정
const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/gemgem400", label: "GemGem400" },
  { path: "/content", label: "Content" },
  { path: "/for-parents", label: "For parents" },
  { path: "/about", label: "About" }
] as const;

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isIOS, setIsIOS] = useState<boolean | null>(null);
  const { t, i18n } = useTranslation();

  // 현재 언어에 따른 로고 이미지 선택
  const currentLanguage = LANGUAGES[i18n.language as keyof typeof LANGUAGES] || LANGUAGES.ko;
  const logoImage = currentLanguage.logo;

  // 활성 경로 확인
  const isActive = (path: string) => {
    const currentLang = i18n.language;
    const localizedPath = path === '/' ? `/${currentLang}` : `/${currentLang}${path}`;
    return location.pathname === localizedPath;
  };

  // 경로 이동 처리
  const handleNavigation = (path: string) => {
    const currentLang = i18n.language;
    const localizedPath = path === '/' ? `/${currentLang}` : `/${currentLang}${path}`;
    setMenuOpen(false);
    navigate(localizedPath);
    window.scrollTo(0, 0);
  };

  // 언어 변경 처리
  const handleLanguageChange = (newLang: string) => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    pathSegments[0] = newLang;
    const newPath = `/${pathSegments.join('/')}${location.search}`;
    
    navigate(newPath);
    setIsLangDropdownOpen(false);
  };

  // 언어 선택 드롭다운
  const LanguageDropdown = () => (
    <div className="absolute top-[42px] right-0 w-20 bg-[#ddf4ff] rounded shadow-lg z-10">
      {Object.values(LANGUAGES).map(lang => (
        <button
          key={lang.code}
          type="button"
          className={`w-full h-10 flex justify-center items-center hover:bg-[#C0E4F5] ${
            i18n.language === lang.code ? 'bg-[#C0E4F5]' : ''
          }`}
          onClick={() => handleLanguageChange(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );

  // 모바일 언어 선택
  const MobileLanguageSelector = () => (
    <div className="flex gap-4 mb-12 justify-center">
      {Object.values(LANGUAGES).map((lang, index, array) => (
        <React.Fragment key={lang.code}>
          <button
            onClick={() => handleLanguageChange(lang.code)}
            className={`text-base font-bold ${
              i18n.language === lang.code ? 'text-gemgem-blue' : 'text-gray-400'
            }`}
          >
            {lang.label}
          </button>
          {index < array.length - 1 && <span>|</span>}
        </React.Fragment>
      ))}
    </div>
  );

  const handleStoreNavigation = () => {
    if (isIOS) {
      // iOS App Store 링크를 새 탭에서 열기
      window.open(
        "https://walla.my/v/9dSeLph2tplo0m6q0Xtd",
        "_blank"
      );
    } else {
      // Google Play Store 링크를 새 탭에서 열기
      window.open(
        "https://walla.my/v/9dSeLph2tplo0m6q0Xtd",
        "_blank"
      );
    }
  };

  useEffect(() => {
    // iOS 기기 감지
    const detectOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    };
    detectOS();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Link 컴포넌트의 to prop 수정
  const getLocalizedPath = (path: string) => {
    const currentLang = i18n.language;
    return path === '/' ? `/${currentLang}` : `/${currentLang}${path}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 custom:h-[64px] bg-white z-50 shadow-md">
      <div className="max-w-[1920px] h-full mx-auto">
        <div className="h-full flex items-center px-8 2xl:px-[120px]">
          <div className="w-full max-w-[1440px] h-full mx-auto flex items-center">
            <button
              onClick={() => handleNavigation("/")}
              className="h-[2.5rem] custom:h-[3rem] flex-shrink-0 flex items-center"
            >
              <img
                src={logoImage}
                alt="GemGem400 Logo"
                className="h-full w-auto"
              />
            </button>

            {/* 네비게이션 메뉴 (가운데 정렬, PC만 보이기) */}
            <ul className="hidden custom:flex absolute left-1/2 transform -translate-x-1/2 text-gray-700 font-pretendard text-base custom:space-x-6 xl:space-x-8 whitespace-nowrap h-full items-center">
              {NAV_ITEMS.map(
                (item, index) => (
                  <li key={index} className="relative">
                    <Link
                      to={getLocalizedPath(item.path)}
                      className={`hover:text-gemgem-blue text-[16px] xl:text-base ${
                        isActive(item.path) ? "text-gemgem-blue" : ""
                      }`}
                    >
                      {t(item.label)}
                    </Link>
                    {isActive(item.path) && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gemgem-blue -mb-2"></div>
                    )}
                  </li>
                )
              )}
            </ul>

            {/* 시작하기 & 언어 선택 버튼 (오른쪽 정렬, PC만 보이기) */}
            <div className="hidden custom:flex items-center gap-3 xl:gap-6 ml-auto h-full">
              <button
                onClick={handleStoreNavigation}
                className="px-4 xl:px-6 py-2 xl:py-2.5 bg-gemgem-blue hover:bg-gemgem-hover text-white rounded transition-colors text-[14px]"
              >
                {t("nav.start")}
              </button>
              {/* 언어 선택 버튼 */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="bg-[#ddf4ff] hover:bg-[#C0E4F5] cursor-pointer w-20 h-10 pl-[23.52px] pr-[18.52px] py-3 rounded flex justify-end items-center gap-[4.79px]"
                >
                  {i18n.language === "ko" ? "KR" : "EN"}
                  <svg 
                    width="10" 
                    height="6" 
                    viewBox="0 0 10 6" 
                    fill="black" 
                    className="ml-1"
                  >
                    <path 
                      d="M5 6L0 0L10 0L5 6Z" 
                    />
                  </svg>
                </button>
                {isLangDropdownOpen && (
                  <LanguageDropdown />
                )}
              </div>
            </div>

            {/* 햄버거 버튼 (모바일 전용) */}
            <button
              className="custom:hidden text-gemgem-blue text-3xl ml-auto h-full flex items-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40
          ${
            menuOpen
              ? "opacity-70 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* 모바일 메뉴 */}
      <div
        className={`fixed top-0 right-0 w-5/6 h-full bg-white z-50 flex flex-col p-6 shadow-lg custom:hidden
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* 상단 로고와 닫기 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <img src={logoImage} alt="Logo" className="h-[2.5rem]" />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 언어 선택 버튼 */}
        <MobileLanguageSelector />

        {/* 네비게이션 메뉴 */}
        <ul className="flex flex-col gap-6 text-center text-gray-800 font-extrabold text-[18px] mb-auto">
          {NAV_ITEMS.map(
            (item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={isActive(item.path) ? "text-gemgem-blue" : ""}
                >
                  {t(item.label)}
                </button>
              </li>
            )
          )}
        </ul>

        {/* 하단 SNS 링크와 버튼 */}
        <div className="mt-auto mb-16">
          {/* SNS 링크 */}
          <div className="flex justify-center gap-1 mb-6">
            <a
              href="https://pf.kakao.com/_xhXQFG"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full"
            >
              <img
                src="/images/nav/Link - Kakao Link.png"
                alt="Kakao"
                className="w-10 h-10"
              />
            </a>
            <a
              href="https://www.instagram.com/gemgem_400"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center"
            >
              <img
                src="/images/nav/Link - Instagram Link.png"
                alt="Instagram"
                className="w-10 h-10"
              />
            </a>
            <a
              href="https://youtube.com/@gemgem400"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center"
            >
              <img
                src="/images/nav/Link - Youtube Link.png"
                alt="Youtube"
                className="w-10 h-10"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/gemgemthera/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center"
            >
              <img
                src="/images/nav/Link - Linkedin Link.png"
                alt="LinkedIn"
                className="w-10 h-10"
              />
            </a>
          </div>

          {/* 다운로드 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={handleStoreNavigation}
              className="bg-gemgem-blue hover:bg-[#107ec2] text-white rounded-full py-[10px] px-[38px] text-center w-[226px] mx-auto"
            >
              {t("nav.download")}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
