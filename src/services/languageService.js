import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import * as RNLocalize from "react-native-localize";
import i18n from "../i18n";

const STORAGE_KEY = "app:language";

const deviceDefault = () => {
  const bestLanguage = RNLocalize.findBestAvailableLanguage(["ar", "en"]);
  return bestLanguage?.languageTag?.startsWith("ar") ? "ar" : "en";
};

export async function loadInitialLanguage() {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    const lang = saved === "ar" || saved === "en" ? saved : deviceDefault();

    await i18n.changeLanguage(lang);

    const wantsRTL = lang === "ar";
    if (I18nManager.isRTL !== wantsRTL) {
      I18nManager.allowRTL(wantsRTL);
      I18nManager.forceRTL(wantsRTL);
    }

    return lang;
  } catch (e) {
    const lang = deviceDefault();
    await i18n.changeLanguage(lang);

    const wantsRTL = lang === "ar";
    I18nManager.allowRTL(wantsRTL);
    I18nManager.forceRTL(wantsRTL);

    return lang;
  }
}

export async function setAppLanguage(lang) {
  await AsyncStorage.setItem(STORAGE_KEY, lang);
  await i18n.changeLanguage(lang);

  const wantsRTL = lang === "ar";
  if (I18nManager.isRTL !== wantsRTL) {
    I18nManager.allowRTL(wantsRTL);
    I18nManager.forceRTL(wantsRTL);
  }
}
