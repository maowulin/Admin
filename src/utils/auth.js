import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const MenuKey = 'Admin-Menu'

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  window.sessionStorage.removeItem(TokenKey)
}

export function getMenuSession() {
  return window.sessionStorage.getItem(MenuKey)
}

export function setMenuSession(menu) {
  window.sessionStorage.setItem(MenuKey, menu)
}

export function removeMenuSession() {
  window.sessionStorage.removeItem(MenuKey)
}
