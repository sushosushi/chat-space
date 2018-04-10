$(function() {

  function buildHTML(message){
    message.image == null ? image_html = `` : image_html = `<img class="chat-message__body-message-image" src="${message.image}">`
    var html = `
    <div class=chat-message>
      <div class=chat-message__body-member-list>
        <div class=chat-message__body-member>
          ${message.user_name}
        </div>
        <div class=chat-message__body-date>
          ${message.created_at}
        </div>
        <div class=chat-message__body-message>
            <div class=chat-message__body-message-content>
              ${message.content}
            </div>
            ${image_html}
        </div>
      </div>
    </div>`
    return html;
  }



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
