$(function() {

  function buildHTML(message){
    message.image == null ? image_html = `` : image_html = `<img class="chat-message__body-message-image" src="${message.image}">`
    var html = `
    <div class="chat-message" data-message-id="${message.id}">
      <div class="chat-message__body-member-list">
        <div class="chat-message__body-member">
          ${message.user_name}
        </div>
        <div class="chat-message__body-date">
          ${message.created_at}
        </div>
      </div>
      <div class="chat-message__body-message">
          <div class="chat-message__body-message-content">
            ${message.content}
          </div>
          ${image_html}
      </div>
    </div>`
    return html;
  }

  var interval = setInterval(function(){
    var last_id = $('.chat-message:last').data('message-id');
    if (typeof last_id === 'undefined'){ return false }
    var url = window.location.href;
    if (url.match(/\/groups\/\d+\/messages/)){
    $.ajax({
      type: "GET",
      url: url,
      data: { id: last_id },
      dataType: 'json'
    })
    .done(function(data){
      if (data.length !== 0){
        data.forEach(function(message){
          $(".chat-messages").append(buildHTML(message));
        });
      }
      $('.chat-messages').animate({scrollTop: $('.chat-messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(data) {
      alert('error');
    });
  } else {
    clearInterval(interval);
  }}, 5000);

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-messages').append(html);
      $('.form__message').val('');
      $('.hidden').val('');
      $('.form__submit').prop("disabled", false)
      $('.chat-messages').animate({scrollTop: $('.chat-messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      $('.form__submit').prop("disabled", false)
      alert('error');
    })
  });
});
