import settingConfig  from '@/config/setting.config';
const {tokenTableName , storage } = settingConfig

/**
 * @author yanyuanfeng 
 * @description 获取accessToken
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getAccessToken():string|null {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(tokenTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(tokenTableName)
    } else {
      return localStorage.getItem(tokenTableName)
    }
  } else {
    return localStorage.getItem(tokenTableName)
  }
}

/**
 * @author yanyuanfeng 
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken:string) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(tokenTableName, accessToken)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(tokenTableName, accessToken)
    } else {
      return localStorage.setItem(tokenTableName, accessToken)
    }
  } else {
    return localStorage.setItem(tokenTableName, accessToken)
  }
}

/**
 * @author yanyuanfeng 
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(tokenTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else {
      return localStorage.removeItem(tokenTableName)
    }
  } else {
    return localStorage.removeItem(tokenTableName)
  }
}
