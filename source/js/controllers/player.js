import events from 'pub-sub'
import $ from '$'

$('.js-play').on('click', events.emit.bind(events, 'player:pause'))
$('.js-pause').on('click', events.emit.bind(events, 'player:play'))
$('.js-next').on('click', events.emit.bind(events, 'player:next'))
$('.js-prev').on('click', events.emit.bind(events, 'player:prev'))
