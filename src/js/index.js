import similarUsers from './similar-users'
import * as templates from './templates'
import scroll from './scroll'
import bind from './bind'
import $ from './$'

let users = [{ username: 'bob' }, { username: 'jill' }, { username: 'mary' }, { username: 'james' }];
let model = bind({users: users}, $('#users')[0], templates.users)

//console.log(model)
//model.users[0].username = 'phil'

$('.username-form').on('submit', (e) => {
  e.preventDefault()
  scroll.to($('.loader'))
  let username = document.getElementById('username').value
  similarUsers(username).then( response => {
    users = response
  }).catch(err => console.log(err))
})

// toggle info screen
$('.info-toggle').on('click', () => $('.info').toggleClass('is-active'));

