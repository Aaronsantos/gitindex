// https://api.github.com/search/users?q=aaron

let searchArea = document.querySelector('#search')
let btGo = document.querySelector('#submit_search')
let main = document.querySelector('main')

btGo.addEventListener("click", function(event) {
  /*
  let url = `https://api.github.com/search/users?q=${searchArea.value}`
  fetch(url)
  .then(data => data.json())
  .then( function(data){
    main.innerHTML += `<img src="${data.items[0].avatar_url}">`
  } )*/
  main.innerHTML += '<h1>click</h1>'
  console.log("click")
})
