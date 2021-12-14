/*
 * @Description: 重写Mockjs的原型，因为在地球显示上，mockjs会导致球体显示失败
 * @Author: yanyuanfeng
 * @Date: 2021-12-14 20:45:01
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-14 21:04:54
 */
// @ts-nocheck
import Mock from "mockjs"
let  HTTP_STATUS_CODES = {
  100: "Continue",
  101: "Switching Protocols",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  300: "Multiple Choice",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Requested Range Not Satisfiable",
  417: "Expectation Failed",
  422: "Unprocessable Entity",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported"
}
Mock.XHR.prototype.send =  function send(data) {
  var that = this
  this.custom.options.body = data

  // 原生 XHR
  if (!this.match) {
    this.custom.xhr.responseType = this.responseType
    this.custom.xhr.send(data)

      return
  }

  // 拦截 XHR

  // X-Requested-With header
  this.setRequestHeader('X-Requested-With', 'MockXMLHttpRequest')

  // loadstart The fetch initiates.
  this.dispatchEvent(new Event('loadstart' /*, false, false, this*/ ))

  if (this.custom.async) setTimeout(done, this.custom.timeout) // 异步
  else done() // 同步

  function done() {
      that.readyState = Mock.XHR.HEADERS_RECEIVED
      that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/ ))
      that.readyState = Mock.XHR.LOADING
      that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/ ))

      that.status = 200
      that.statusText = HTTP_STATUS_CODES[200]

      // fix #92 #93 by @qddegtya
      that.response = that.responseText = JSON.stringify(
          convert(that.custom.template, that.custom.options),
          null, 4
      )

      that.readyState = Mock.XHR.DONE
      that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/ ))
      that.dispatchEvent(new Event('load' /*, false, false, that*/ ));
      that.dispatchEvent(new Event('loadend' /*, false, false, that*/ ));
  }
}
	// 数据模板 ＝> 响应数据
function convert(item, options) {
  return typeof item.template == 'function' ?
      item.template(options) : Mock.XHR.Mock.mock(item.template)
}
export default  Mock