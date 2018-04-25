function decode(str) {
  if (global.atob) {
    return global.atob(str)
  }

  return Buffer.from(str, 'base64').toString('utf8')
}

export function isNsgRoute(routeName) {
  return routeName.indexOf('NSG:') === 0
}

export default function getRouteInfo(routeName) {
  if (!isNsgRoute(routeName)) {
    return {}
  }

  return JSON.parse(decode(routeName.match(/NSG:(.*):/)[1]))
}
