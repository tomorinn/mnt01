//ここにcontroller問わず書けばいいっぽい。

$(function() {
  //墓石のpushedの数カウント、数字起動にも使うよ。デフォは0
  var spellCount = 0;
  //数字操作
  var check = [200,0,300,900];
  var tempcheck = 1000;
  var change_set = 0;



  //ホームページのログインモーダル
  $('#login-show').click(function() {
    $('#login-modal').fadeIn();
  });
  $('#header-login-show').click(function() {
    $('#login-modal').fadeIn();
  });

  $('#close-login').click(function () {
    $('#login-modal').fadeOut();
  });
  $('#guest-signup').click(function () {
    window.location.href = '/prologue/begin';
  });
  $('#signup-btn').click(function() {
    $('#signup-modal').show();
    $('#login-modal').hide();
  });

  $('#close-signup').click(function() {
    $('#signup-modal').fadeOut();
  });

  //町について
  $('#show-town').click(function() {
    $('html, body').animate({scrollTop:700});
  });

  // これはテスト用
  //$(".test").css('color','red');
  // $(".test").text(index);

  //ITが押されたら数字を起動
  $('.spell').click(function() {
    if (spellCount < 100) {
      if ($(this).hasClass('pushed')){
        $(this).css('color','rgb(100,100,100)').removeClass('pushed');
        spellCount -= 1;
      }else{
        $(this).css('color','rgb(50,50,50)').addClass('pushed');
        spellCount += 1;
      }
    }
    if($('#i').hasClass('pushed') && $('#t').hasClass('pushed') && spellCount==2){
      $('.spell').css('color','gray');
      $('#i').css('color','rgb(100,100,100)');
      $('#t').css('color','rgb(100,100,100)');
      //数字を起動、100で数字操作可能
      spellCount = 100;
      $('.arrows').show();
      $('.number').css('border','5px solid gray');
      $('html, body').animate({scrollTop:500}, {duration: 3000});
      $('#flash-message').text("数字を動かせるようになった！数字をクリックしてから操作ボタンを押そう。")
    }
  });

  //数字操作。
  $('.number').click(function() {
      if (spellCount == 100) {
        var index = $('.number').index(this);
        if (change_set == 1) {
          var x = tempcheck
          tempcheck = check[index];
          //100の位
          var x_mil = (x-x%100)/100;
          var temp_mil = (tempcheck-tempcheck%100)/100;
          var x_index = $.inArray(x, check);
          var temp_index = $.inArray(tempcheck, check);
          //画像を交換する
          var x_box = $('.number').eq(x_index);
          var temp_box =$('.number').eq(temp_index);
          x_box.attr('src',`/num_${temp_mil}.png`);
          temp_box.attr('src',`/num_${x_mil}.png`);
          //反転、回転をリセット
          x_box.removeClass('reverse　rotate reverse_rotate');
          temp_box.removeClass('reverse　rotate reverse_rotate');
          x = x_mil*100;
          tempcheck = temp_mil*100;
          //数字を交換する
          check[x_index] = tempcheck;
          check[temp_index] = x;
          //change_setを０にする。
          change_set = 0;
        }
        //クリア条件
        if (check[0]<=100 && check[1]==910 && check[2]==310 && check[3]==201) {
          $('#flash-message').text('解けたぞ！暮石が動き、町への道がひらけた！');
          $('.clear-whiteout').fadeIn(3000);
          setTimeout(function(){
            window.location.href = "/town_a/street";
          },3000);

        }

         tempcheck = check[index];
         //テスト用
         //$(".test").text(check);
         //枠線
        $('.number').removeClass('getBorder');
        $(this).addClass('getBorder');

        $('.number').css('border','5px solid gray');
        $(this).css('border','5px solid black');

      }
  });

  //
  $('#change').click(function() {
    change_set = 1;
  });

  $('#reverse').click(function() {
    change_set = 0;
    var index = $.inArray(tempcheck, check);
    var target_num = $('.number').eq(index);

    if (target_num.hasClass('reverse')) {
      target_num.removeClass('reverse');
      tempcheck -= 10;
    }else if (target_num.hasClass('reverse_rotate')) {
      target_num.removeClass('reverse_rotate');
      target_num.addClass('rotate');
      tempcheck -= 10;
    }else if (target_num.hasClass('rotate')) {
      target_num.removeClass('rotate');
      target_num.addClass('reverse_rotate');
      tempcheck += 10;
    }else{
      target_num.addClass('reverse');
      tempcheck += 10;
    }
    check[index] = tempcheck;
    //クリア条件
    if (check[0]<=100 && check[1]==910 && check[2]==310 && check[3]==201) {
      $('#flash-message').text('解けたぞ！暮石が動き、町への道がひらけた！');
      $('.clear-whiteout').fadeIn(3000);
      setTimeout(function(){
        window.location.href = "/town_a/street";
      },3000);
    }
    //テスト用
    //$(".test").text(check);
  });
  $('#rotate').click(function() {
    change_set = 0;
    var index = $.inArray(tempcheck, check);
    var target_num = $('.number').eq(index);

    if (target_num.hasClass('rotate')) {
      target_num.removeClass('rotate');
      tempcheck -= 1;
    }else if (target_num.hasClass('reverse_rotate')) {
      target_num.removeClass('reverse_rotate').addClass('reverse');
      tempcheck -= 1;
    }else if (target_num.hasClass('reverse')) {
      target_num.removeClass('reverse').addClass('reverse_rotate');
      tempcheck += 1;
    }else{
      target_num.addClass('rotate');
      tempcheck += 1;

    }
    check[index] = tempcheck;
    //クリア条件
    if (check[0]<=100 && check[1]==910 && check[2]==310 && check[3]==201) {
      $('#flash-message').text('解けたぞ！暮石が動き、町への道がひらけた！');
      $('.clear-whiteout').fadeIn(3000);
      setTimeout(function(){
        window.location.href = "/town_a/street";
      },3000);
    }
    //テスト用
    //$(".test").text(check);
  });


});
