let avatar = document.querySelector('.avatar')

let btn = document.querySelector('.form-btn')

btn.addEventListener('click', () => {
})

function randomizeAvatar() {
  const randNum = Math.floor(Math.random() * 6)

  avatar.src = `../img/avatar${randNum}.jpg`
}

document.addEventListener("DOMContentLoaded", randomizeAvatar)

