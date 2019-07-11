$(function(){
  var search_list = $("#user_search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user){
    var html = `<div class='chat-group-user clearfix'>${ user }</div>`
    search_list.append(html);
  }

  var member_list = $("#chat-group-users");

  function addUser(userId,userName) {
    var html = `<div id='chat-group-users'>
                  <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                    <input name='group[user_ids][]' type='hidden' value='${userId}'>
                      <p class='chat-group-user__name'>${userName}</p>
                      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
    member_list.append(html);
      }

    $("#user-search-field").on("keyup", function() {
      console.log("成功")
      $("#user-search-result").empty();
      var input = $("#user-search-field").val();
      console.log(input)
      $.ajax({
        type: "GET",
        url: "/users",
        data: { keyword: input },
        dataType: "json"
      })

      .done(function(users){
        if(users.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUserName("一致する名前はありません");
        }
      })

      .fail(function(){
        alert("ユーザー検索に失敗しました");
      })
    })
})