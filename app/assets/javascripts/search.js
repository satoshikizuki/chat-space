$(document).on('turbolinks:load', function(){
  var search_list = $("#user-search-result");

  function appendUser(user){ //チャットメンバーの追加
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user){  //チャットメンバー追加時、ユーザーが存在しない
    var html = `<div class="chat-group-user clearfix"'>${user}
                </div>`
    search_list.append(html);
  }

  var member_list = $("#chat-group-users");

  function appendmember(id, name) { //チャットメンバーの表示と削除ボタン
    var html = `<div class="chat-group-user clearfix">
                  <input name="group[user_ids][]" type="hidden" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    member_list.append(html);
      }

    $("#user-search-field").on("input", function() {
      $("#user-search-result").empty();
      var input = $("#user-search-field").val();

      if(input.length == 0){  //要改善 Web上での動きが少しおかしい
        $("#user-search-result").empty();
        return;
      }

      $.ajax({
        type: "GET",
        url: "/users",
        data: { keyword: input },
        dataType: "json"
      })

      .done(function(users){
        $("#user-search-result").empty();
        if(users.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致する名前はありません");
        }
      })

      .fail(function(){
        alert("ユーザー検索に失敗しました");
      })
    })

    $(document).on("click",".chat-group-user__btn--add", function() {
      var user_id = $(this).attr("data-user-id");
      var user_name = $(this).attr("data-user-name");
      appendmember(user_id, user_name);
      $(this).parent(".chat-group-user").remove();
    });  //「チャットメンバーを追加」部分で検索して出たユーザーを「チャットメンバー」に追加した際、ユーザー検索部分を消す

    $("#chat-group-users").on("click",".js-remove-btn", function() {
      $(this).parent().remove();
      });  //".js-remove-btn"「this」を"click"したら"#chat-group-users"の親要素「parent()」を削除する「remove()」
})
