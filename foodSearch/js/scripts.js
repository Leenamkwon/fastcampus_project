const API_URL ='https://floating-harbor-78336.herokuapp.com/fastfood';

$(function() {
  $('.btn-search').click(function() {
    $.get(API_URL, {}, function(data) { // .get() 인자 순서대로 'url, data, success, dataType'
    var list = data.list;
    var total = data.total;

    const $list = $('.list');
    
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      console.log(list[i]);

      var $elem = $('#item-template')
      .clone()
      .removeAttr('id');
      
      $elem.find('.item-no').html(i + 1);
      $elem.find('.item-name').html(item.name);
      $elem.find('.item-addr').html(item.addr);
      
      $list.append($elem);
    }

    $('.total').html('총' + total + '개의 패스트푸드점을 찾았습니다.');
    }, 'json');

  });
});