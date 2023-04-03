$(document).ready(function () {
  // ================================================================

  // 背景色を設定
  const body = document.querySelector("body");
  body.style.backgroundColor = "#" + sessionStorage.getItem("color");

  // イラストを表示
  const item = document.getElementById("displayItem");
  item.src = sessionStorage.getItem("image");

  // ================================================================
});
