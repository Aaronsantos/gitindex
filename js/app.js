
//IMPORTS:
import Chart from 'chartjs'

//DECLARAÇÃO DE DOMs:
let main = document.querySelector('main')
let result = document.querySelector('#search_result')
const searchArea = document.querySelector('#search')
const btGo = document.querySelector('#submit_search')

//REGEX:
let pattern = /\W/

//EVENTO LISTENER NO SUBMIT
  btGo.addEventListener("click", function(event) {
    
    /*Este evento desencadeia os demais, se acionado corretamente.
    O tratamento do acionamento é feito pelo teste do Pattern */
    
    if( !(pattern.test(searchArea.value)) )
    {
      //Requisição da pesquisa:
      let url = `https://api.github.com/search/users?q=${searchArea.value}`
      fetch(url)
      .then(data => data.json())
      .then( function(data){
        
        //Gerando resultado da pesquisa:
        // Cada Usuário terá eventos que geram requisições próprias
        result.innerHTML = `<h3> foram encontrados ${data.items.length} resultados para " ${searchArea.value} "</h3>`
        for(let i = 0; i < data.items.length; i++)
        {
          //Gerando resultados referente aos repositórios do I usuário
          let userinfo_content = ` <div class="result_item wow fadeIn">
          <a href="${data.items[i].html_url}"><img src="${data.items[i].avatar_url}" alt="" class="user_avatar"></a>
          <div class="user_info">
          <a href="${data.items[i].html_url}" class="user_nickname">${data.items[i].login}</a>
          </div>
          <input type="checkbox" id="show-info${i+1}" class="show-info">
          <label for="show-info${i+1}"> Show more </label>

          <div id="user_more_info${i+1}" class="user_more_info">
          <img src=img/spin.gif class="spin">
          </div>
          </div>`
          
          //Inserindo Eventos referente aos repositórios do I usuário
          result.insertAdjacentHTML('beforeend', userinfo_content )
          let btmore_info = document.querySelector(`#show-info${i+1}`)
          let fdmore_info = document.querySelector(`#user_more_info${i+1}`)
          let repourl = `https://api.github.com/users/${data.items[i].login}/repos`
          let userurl = `https://api.github.com/users/${data.items[i].login}`
          
          //Mais ifnormações sobre o I usuário:
          btmore_info.addEventListener('click', function(){
            fetch(userurl)
            .then(userinfo => userinfo.json())
            .then(function(user){
              let result_more_info = `<div class="user_bio"> <h3>${user.name}</h3> <p> ${user.bio != null ? user.bio : ''} </p> <p> Followers: ${user.followers} | Following: ${user.following} </p> <p> ${user.email != null ? user.email : ''} </p>`
              fdmore_info.innerHTML = result_more_info
            })
            
            //Gerando lista de usuários
            fetch(repourl)
            .then(repos => repos.json())
            .then( function(repos){
              let result_repo =   `<div class="repo_field">
              <h3>Repositories of ${repos[0].owner.login}:</h3>
              <div class="repo_flex">
              <ul class="repo_flex">`

              result_repo += repos.map(list_repo).join('')
              result_repo += `</ul></div>
              <h3>Repo Info:</h3>
              <canvas id="repo${repos[0].owner.login}"> </canvas>
              </div> `
              fdmore_info.innerHTML += result_repo
              createChart(repos)
            })
          })
        }
      } )
    
    //Caso a inserção da busca seja inválida 
    }else
      alert("São aceitos apenas letras, números e espaços na pesquisa.")
  })

let list_repo = function(value)
{
  let result = `<li><a href="${value.html_url}" > ${value.name} </a> <p><span class="star"> </span>${value.stargazers_count}</p> <p class="repo_len"> ${ value.language != null ? value.language : '' }</p> </li>`
  return result
}

function createChart(repos)
{
  let data = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ["#9999dd"],
      hoverBackgroundColor: ["#aaaaaa"]
    }]
  }
  console.log(data.datasets)
  for(let values of repos)
  {
    data.datasets.data.push(values.stargazers_count)
    data.labels.push(values.name)
  }

  let type = {
    type: 'bar',
    data: data
  }
  let ctx = document.querySelector(`#repo${repos[0].owner.login}`)
  new Chart(ctx, type);
  console.log(type)
}

