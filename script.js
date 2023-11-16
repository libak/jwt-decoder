let b64DecodeUnicode = str =>
    decodeURIComponent(
        Array.prototype.map.call(atob(str), c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''))

let parseJwt = (token, index) =>
    JSON.parse(
        b64DecodeUnicode(
            token.split('.')[index].replace('-', '+').replace('_', '/')
        )
    )


let form = document.getElementById("form")
form.addEventListener("submit", (e) => {
  form.header.value = JSON.stringify(
      parseJwt(form.jwt.value, 0)
  )
  form.payload.value = JSON.stringify(
      parseJwt(form.jwt.value, 1)
  )
  e.preventDefault();
})
