// ブラウザバック時処理（スマホ対応）
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

$(document).ready(function () {
  // ================================================================

  /**
   * 初期化
   */

  // style削除
  const buttons = document.querySelectorAll(".categoryButton");
  buttons.forEach((element) => {
    element.style = {};
  });

  // ギャラリー非表示
  const containers = document.querySelectorAll(".categoryButton");
  containers.forEach((element) => {
    element.addEventListener("click", () => {
      // 押されたほうを拡大表示
      element.classList.add("select");

      // もう一回押す
      element.addEventListener("click", () => {
        // リンク遷移
        const category = element.getAttribute("data-link");
        open(category, "_self");
      });
    });
  });

  // ================================================================
});
