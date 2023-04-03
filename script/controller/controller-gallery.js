$(document).ready(function () {
  // ================================================================

  // 背景色を設定
  const body = document.querySelector("body");
  body.style.backgroundColor = "#" + sessionStorage.getItem("color");

  // イラストのファイルネームを取得
  const imageFileName = sessionStorage.getItem("image");

  // キャプションを表示
  const caption = document.getElementById("caption");
  const dotIndex = imageFileName.lastIndexOf(".");
  caption.src =
    imageFileName.slice(0, dotIndex) + "_c" + imageFileName.slice(dotIndex);

  // イラストを表示
  const displayItem = document.getElementById("displayItem");
  displayItem.src = imageFileName;

  // ================================================================
});
