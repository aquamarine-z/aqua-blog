import React, { useEffect } from 'react';

import { useLocation } from '@docusaurus/router';
import { useTranslation } from 'react-i18next';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function I18nSync() {
  const { i18n } = useTranslation();
  const { i18n: docusaurusI18n } = useDocusaurusContext();
  const location = useLocation();

  useEffect(() => {
    // 当前 Docusaurus 路由语言
    const currentLocale = docusaurusI18n.currentLocale;

    // 如果 react-i18next 的语言与 Docusaurus 不一致，则同步
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale);
      console.log("change language to" +currentLocale)
    }
  }, [location, docusaurusI18n.currentLocale, i18n]);

  return <></>; // 不需要渲染任何 UI
}

export default I18nSync;