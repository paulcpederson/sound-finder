import similarUsers from './similar-users'
import * as templates from './templates'
import observable from 'observable'
import diffDOM from 'diff-dom'
import scroll from './scroll'
import $ from './$'

let users = observable()
let $users = document.querySelector('#users')
let dd = new diffDOM()

users(u => {
  let tmp = $users.cloneNode(false)
  tmp.innerHTML = templates.users.render({users: u})
  dd.apply($users, dd.diff($users, tmp))
})

$('.username-form').on('submit', (e) => {
  e.preventDefault()
  $('.loader').addClass('show')
  scroll.to(document.querySelector('.loader'))
  let username = document.getElementById('username').value
  similarUsers(username).then(response => {
    users(response)
    $('#users').addClass('show')
  }).catch(err => console.log(err))
})

// toggle info screen
$('.info-toggle').on('click', () => $('.info').toggleClass('is-active'))