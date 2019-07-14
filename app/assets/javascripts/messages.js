$(document).on('turbolinks:load', function(){ //turbolinks Gemfileに記述している
  function buildHTML(message){
    var image = message.image_url ? `<img src = '${message.image_url}' class: "Message__text__image"` : ''; // htmlでの書き方
    var html = `<div class="Message">
                  <div class="Message__upper-info">
                    <div class="Message__upper-info__talker">
                      <p>${message.name}</p>
                    </div>
                    <div class="Message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="Message__text">
                    <div class="Message__text__content">
                      <p>${message.content}</p>
                      <p>${image}</p>
                    </div>
                  </div>
                </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.Messages').append(html);
      $('.Submit-btn').prop('disabled', false);
      $('.Messages').animate({scrollTop: $('.Messages')[0].scrollHeight}, 'fasts');
      $('#new_message')[0].reset(); //配列の中の[0]番目(formタグ全体)を指定している、jQueryオブジェクトからDOM要素を取得する
    })
    .fail(function(){
      alert('error');
    })
  })

//リファクタリングでコードを編集する
  var buidMessageHTML = function(message){
    if (message.content && message.image.url){ //data-idが反映されるようにしている
      var html = `<div class="message" '${message.id}' + '>' +
        <div class="upper-message"> +
          <div class="upper-message__user-name"> +
            ${message.user_name} +
          </div> +
          <div class="upper-message__date"> +
            ${message.created_at} +
          </div> +
        </div> +
        <div class="lower-message"> +
          <p class="lower-message__content"> +
            ${message.content} +
          '</p>' +
          '<img src="' + '${message.image.url} + class="lower-message__image" > +
        '</div>' +
      '</div>'
    } else if (${message.content}) {  // 同様に、data-idが反映されるようにしている
      var html = <div class="message" data-id= + '${message.id}' + '>' +
        <div class="upper-message">' +
          <div class="upper-message__user-name"> +
            ${message.user_name} +
          </div> +
          <div class="upper-message__date"> +
            ${message.created_at} +
          </div> +
        </div> +
        <div class="lower-message"> +
          <p class="lower-message__content"> +
            ${message.content} +
          </p> +
        </div> +
      </div>
    } else if (message.image.url){ //同様に、data-idが反映されるようにしている
      var html = <div class="message" data-id=' + '${message.id}' + '>' +
        <div class="upper-message"> +
          <div class="upper-message__user-name"> +
            message.user_name +
          </div> +
          <div class="upper-message__date"> +
            ${message.created_at} +
          </div> +
        </div> +
        <div class="lower-message"> +
          <img src=" + '${message.image.url}' + class="lower-message__image" > +
        </div> +
      </div>`
    };
    return html;
  };


  var reloadMessages = function(){

    last_message_id = 
    $.ajax({
      url: ,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = '';
      alert('success');
    })
    .fail(function(){
      alert('error');
    });
  };
  setInterval(reloadMessages, 5000);
});
