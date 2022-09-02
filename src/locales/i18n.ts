/*
 * @Author: YuanfengYan yanyuanfeng_sspu@163.com
 * @Date: 2022-09-02 13:49:56
 * @LastEditors: YuanfengYan yanyuanfeng_sspu@163.com
 * @LastEditTime: 2022-09-02 14:11:55
 * @FilePath: /my-project/src/locales/i18n.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import cn from "./zh-CN/index";
import en from "./en/index";

const langList = ["en", "zh"];

const initKey = initLangKey();


// 初始化语言key
function initLangKey() {
    let langkey = localStorage.getItem("langkey");
    // 如果未初始化，通过浏览器判断应该设置成啥语言
    if (!langkey) {
        const lang = (navigator.language || 'zh')
            .toLowerCase()
            .substring(0, 2);
        switch (lang) {
            case "en":
                langkey = "en";
                break;
            case "zh":
                langkey = "zh";
                break;

            default:
                langkey = "en";
                break;
        }
    } else if (!langList.includes(langkey)) {
        // 如果不是en,zh,默认en
        langkey = "en";
    }
    localStorage.setItem("langkey", langkey);
    return langkey;
}

const i18n = createI18n({
    locale: initKey,
    fallbackLocale: 'ch',//预设语言环境
    globalInjection: true,
    legacy: false, // you must specify 'legacy: false' option
    messages: {
        en: Object.assign({}, en),
        zh: Object.assign({}, cn),
    },
});

export default i18n;
