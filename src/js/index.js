require('6to5/polyfill');

import hogan from 'hogan.js';
import SC from './sound-cloud';
import $ from './query';

var sc = SC('739b39925c3cc275aeb03837ff27762c');

var getFriends = (username) => {
  sc.userID('paulcpederson')
  .then(user => sc.favorites(user.id))
  .then(favorites => console.log(favorites))
  .catch(err => console.error('Something went wrong', err));
};

$('.username-form').on('submit', (e) => {
  e.preventDefault();
  getFriends(document.getElementById('username').value);
});

// compile template
// var $users = document.getElementById('users');
// var template = hogan.compile($users.innerHTML);
// var users = [{ name: 'bob' }, { name: 'jill' }, { name: 'mary' }, { name: 'james' }];
// $users.innerHTML = template.render({users: users});

// toggle info screen
$('.info-toggle').on('click', () => $('.info').toggleClass('is-active'));

