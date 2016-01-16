// JSLint settings
/*global $, jQuery, alert*/
/*jslint plusplus: true*/

// Contact form checker

function sendForm() {
  'use strict';
  var status = true;
//  $('.ss-submit-progress').animate({'width': '100%'}, 500);
  $('#ss-submit').addClass('button-sent').attr('disabled', true);
  $('.form-name, .form-phone, .form-email, .form-text').addClass('form-input-sent');
  $('.form-message').css({'opacity': '0'}).html("メッセージが送信されました").addClass('form-message-sent').delay(500).animate({'opacity': '1'}, 300);
  return status;
}

// Recent posts

(function ($) {
  'use strict';
  $.fn.notifyGen = function () {
    var $this = null,
      tag = '',
      nesting = '',
      date = '',
      title = '',
      post_url = '',
      dataList = [],
      url = 'yamanopanya.tumblr.com',
      key = 'GklC2Exbx9eYCntqmuYovmapXkKueCu95cSZ1rgobRcTqjH0hF';

    function renderData() {
      $this.empty();
      $.each(dataList, function (idx, a) {
        nesting = $('<li>').append(
          $('<a>').attr({
            'href': a.url,
            'title': a.title
          })
            .html(a.date + '&nbsp;&nbsp;&nbsp;' + a.title)
        );
        $this.append(nesting);
      });
    }

    function processResponse(data) {
      var i;
      $this.empty();
      if (data.response.total_posts === 0) {
        $this.append($('<li>（現在お知らせはありません）</li>'));
      } else {
        $.each(data.response.posts, function (idx, post) {
          date = post.date.substr(5, 5).replace('-', '/');
          if (post.type === 'photo') {
            title = '写真を投稿しました';
          } else {
            title = post.title;
          }
          post_url = post.post_url;
          dataList.push({
            date: date,
            title: title,
            url: post_url
          });
        });
        renderData();
      }
    }

    function requestData() {
      $this.empty();
      if ($this.attr('id') === 'news-contents') {
        tag = '&tag=お知らせ';
      }
      $.ajax({
        url: 'http://api.tumblr.com/v2/blog/' + url + '/posts?api_key=' + key + '&limit=3' + tag,
        dataType: 'JSONP',
        success: processResponse
      });
    }

    return this.each(function () {
      $this = $(this);
      requestData();
    });
  };
}(jQuery));