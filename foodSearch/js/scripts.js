const API_URL ='https://floating-harbor-78336.herokuapp.com/fastfood';

$(function() {
  $('.btn-search').click(function() {
    var searchKeyword = $('#txt-search').val();
    search(searchKeyword);
  });
});

function search(searchKeyword) {
  $.get(API_URL, {
  //$.get('http://localhost:5000/fastfood', {
    searchKeyword: searchKeyword
  }, function(data) {
    var list = data.list;
    var total = data.total;

    $('.total').html('총 ' + total + '개의 패스트푸드점을 찾았습니다.');

    var $list = $('.list');

    for (var i = 0; i < list.length; i++) {
      // 목록의 항목 하나하나마다 DOM 객체를 만들어서 $list에 추가한다
      var item = list[i];
      // 1. 템플릿을 복제한다.
      // 2. 복제한 템플릿에 데이터를 세팅한다.
      // 3. 목록에 복제한 템플릿을 추가한다.
      var $elem = $('#item-template')
        .clone()
        .removeAttr('id');

      $elem.find('.item-no').html(i + 1);
      $elem.find('.item-name').html(item.name);
      $elem.find('.item-addr').html(item.addr);

      $list.append($elem);
    }
  });
}