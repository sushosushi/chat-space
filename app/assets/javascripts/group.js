$(function() {

  var search_list = $("#user-search-result");
  $(search_list).empty();

  function appendUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.user_name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.user_id} data-user-name=${user.user_name}>追加</a>
      </div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user}</p>
      </div>`
    search_list.append(html);
  }
  function appendHTML(user_id, user_name) {
    var html =`
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
        <input name='group[user_ids][]' type='hidden' value='${user_id}'>
        <p class='chat-group-user__name'>${user_name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
    return html;
  }

  $(document).on("click", ".user-search-add", function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    $(this).parent().remove();
    $('#chat-group-user').append(appendHTML(user_id, user_name));
  })

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input == "") {
      $(search_list).empty();
    } else {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $(search_list).empty();
        if(users.length !== 0) {
          users.forEach(function(user) {
            appendUser(user);
          });
        } else {
          appendNoUser("一致するユーザはいません。");
        }
      })
      .fail(function() {
        alert('ユーザ検索に失敗しました。');
      })
    }
  });
});
