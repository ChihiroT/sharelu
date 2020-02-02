$(document).ready(function () {

  var input = document.getElementById('file');
  var dst = document.getElementById('dst');

  input.onchange = function() {
    // 選択中のファイルの一つ目
    var file = this.files[0];
    // ファイルを選択しなかった場合
    if(!file) return;
    // ファイル形式
    console.log(file.type);
    // ファイル形式の中にimageが含まれない場合
    if(!/image/.test(file.type)) {
      alert('画像を選択してください。');
      return;
    }

    // 読み込み用の関数で読み込み完了時に、HTMLにcanvas追加
    load(file, function(canvas) {
      var reset = '<a href="#" class="img_del">画像を選び直す</a>';
      dst.appendChild(canvas);
    });
  };

  function load(file, callback) {
    // canvas: true にすると canvas に画像を描画する(回転させる場合は必須オプション)
    var options = {canvas: true};

    loadImage.parseMetaData(file, function (data) {
      if (data.exif) {
        console.log("exifに格納されている情報:\n", data.exif.getAll());

        // options の orientation は小文字。 exif.getの 'Orientation' は先頭大文字
        // ここでcanvasの回転を指定している
        options.orientation = data.exif.get('Orientation');
        console.log('Orientation: ' + options.orientation);
      }
      // 画像の読み込み。完了時に callback が呼び出される
      loadImage(file, callback, options);
    });
  }

});


// var view_box = $('.view_box');
  
  // $(".file").change(function(){
  //   var fileprop = $(this).prop('files')[0],
  //       find_img = $(this).next('img'),
  //       fileRdr = new FileReader();
    
  //   if(find_img.length){
  //       find_img.nextAll().remove();
  //       find_img.remove();
  //   }
    
  //   var img = '<img width="200" alt="" class="img_view"><a href="#" class="img_del">画像を選び直す</a>';

  //   view_box.append(img);
    
  //   fileRdr.onload = function() {

  //     view_box.find('img').attr('src', fileRdr.result);
  //     img_del(view_box);
  //     $(".file").hide();
  //   }
  //   fileRdr.readAsDataURL(fileprop);
  // });

  // function img_del(target){
  //   target.find("a.img_del").on('click',function(){
  //     if(window.confirm('画像を削除します。\nよろしいですか？')){
  //       $("#post_image").val('');
  //       $("#post_image").show();
  //       $(this).parent().find('.img_view, br').remove();
  //       $(this).remove();
  //     }
  //     return false;
  //   });
  // }