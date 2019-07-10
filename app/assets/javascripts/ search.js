$(function() {
  $(".search__query").on("keyup", function() {
    var input = $(".search__query").val();

    $.ajax({
      type: 'POST',
      url: '/products/search',
      data: { keyword: input },
      dataType: 'json'
    })
  });
});