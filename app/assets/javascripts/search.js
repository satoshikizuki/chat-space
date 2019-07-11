$(function(){
  var search_list = $("#user-search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user){
    var html = `<div class="chat-group-user clearfix"'>${user}
                </div>`
    search_list.append(html);
  }

  var member_list = $("#chat-group-users");

  function appendmember(user) {
    var html = `<div class="chat-group-user clearfix">
                  <input name="chat_group[user_ids][]" type="hidden" value="${user.id}">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    member_list.append(html);
      }

    $("#user-search-field").on("keyup", function() {
      $("#user-search-result").empty();
      var input = $("#user-search-field").val();
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
      var user = $(this).attr("data-user-id");
      var user = $(this).attr("data-user-name");
      var addNewUser = appendmember(user);
      $("#chat-group-users").append(addNewUser);
      $(this).parent(".chat-group-user").remove();
    });

    $("#chat-group-users").on("click",".js-remove-btn", function() {
      $(this).parent().remove();
      });
})