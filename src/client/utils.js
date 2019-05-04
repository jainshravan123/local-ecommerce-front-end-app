const jwt = require('jsonwebtoken')

export const getLocationSearch = () => {
  return window.location.search
}

export const getLocalStorageItem = item => {
  return window.localStorage.getItem(item)
}

export const setLocalStorageItem = (item, value) => {
  return window.localStorage.setItem(item, value)
}

export const isiPad = () => {
  return (/iPhone|iPad/i.test(window.navigator.userAgent))
}

export const isMac = () => {
  return (/Mac/i.test(window.navigator.userAgent))
}

export const getUserMailId = (token) => {
  return (jwt.decode(token).uid.split('/')[0])
}

export const getUserEmailId = () => {
  return (jwt.decode(getToken()).uid.split('/')[0])
}

const publicKey = 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC3vvXUZPQJtVYIBlFi7NH+KOAM0fKZ6QUG3cqbtJAkHe5oe1mSVDUEt6NZjgXxGB35X3s/vjZcBRMk3Ltt0wPwYgpvfoK1VmSooBpoc6Jq9qJ/IEiVsPTOqbTyJ1UkU71u22ofmPrGjqxFsmTLxB8Xf0PvI9h0zOgQcQ24A+FrRynH/GNL9Asz+1b6rb6z9Rgm8nrqJXixZ7ppMNY8uQfujBb+Vp2u0AJV8wnlSrzWdkboy6VoF1TJR4Osm8bO8tsDpVRNUcPveVSVg6+DpTdPZrIwjtvJtubHztouEtt7giCq0dqgUy/25mbbhoMqVuNOqbU1B9OUenjmjxuiAXhpAgMBAAECggEBAIx0PBWO1bxWEN0xdyTXQe218Q3brkZYCK+m+ijrbQMunf7fyyg/lgd1GDhsh74zYTYt9lhTXdoZRvj2gY8BrhEh4Dg5zFAxKeB8AbO2MIDy5mOmmdVS3s7aiqZPypVqLXN/5S8iEQ+WH7lnFAVudRXRAmzaSat+tiVbRdFTpgwJngTpSw/2CquuOzEfNKSu1F5TRfcpx97FBGPacqTibP8qzljY+KwKIHXfPe3RQ3iiDM5qvpOdFuSJc6Jrm1qDGVPw3seT0jvXVxlpmW8cVWzGNMkRrZ8tDGDHWBkov9uQwpy8sI9wTsniTPpUzydqkr/sXNI2opWaRUV7bjxkkwECgYEA3sG6Aj8hWOGEWuVy4k7DCEOWG351hdD1zOdS+aiOELMVe3lNIGK0UzbyC2TiQjlyCM8pUpokSu8P2CMyjJ+R/a0TWbRcm4jFzdcmSCTFsYbkdQ6dlPVXeQ9zgFdGP9f/TmBuL0tQ9E9wA0x88o5IG5HwuckrTmMwc25y/af9Pj0CgYEA0yraDLSDafP7pqTVm91JpTOx3/sE58uHlC0/dBbMmgOpO0QUcBubvipe1rKyTeuQB4/TJr4cB6Lxo6B42vtNoXOgMRcazOj7i2Z3TuECqFKMCtofHI3Buv9O4KnoMqIJP8i3fXuYr5+wfMJLLA91GHcllH0tcO89npzRXeAVUZ0CgYAiXeMTu6eqbcicuW+bCKnAWaUMAtug1JdHkJzVlbKtUuPKk/FZQMEvYXfAWEUsEG7Oex+V9eAJi453Ox7uYSQF7jDhExmCiXxzAHGQidPSSsxuXt3jAGMJc1/PeieFbA6gifIV69nGh4bxi1hvl5H6Zu6ryySaSGVOOckV51gDxQKBgQCk2X0kEf/NRRUdwOypIxWNDFA+RJ5Nvkv3V2OD4xCS42zHwZwa8NKioD0tao9b2Ru1a4gxZJRJOeFeFbaDbU/rTHKwIBNiCDfnWXSmdW43rUl6Z1GGXvvwWcNgDAQjEvAZhT4JjeVipU2H973rhZ2qHcmOpDJHSd1W56Fiob7C2QKBgQDLVvQONNAlJQ8YRPzFiFzg92nxWC0G329BgibxdXuWKltG05z8V65dUbUChphzxhwHcIG1/OlWm08YIV8uLfhQ1nxKpUqRgWzaXgn1TVJ2rWszfw3AZqs7MNWp+YoIL4EF9fAFpV91M4t1aee5niSIOJbhVySbRqjtdRkFMnzxbA=='

export const verifyToken = (token) => {
  return jwt.verify(token, publicKey, function (err, decoded) {
    if (err) return false
    return true
  })
}

export const setToken = (token) => {
  return window.localStorage.setItem('token', token)
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}
