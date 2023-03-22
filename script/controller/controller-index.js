$(document).ready(function () {
  // ================================================================

  /**
   * 初期化
   */

  // 初期化
  const unselected = document.querySelectorAll(".categoryButton");
  unselected.forEach((element) => {
    element.style = {};
  });

  // ギャラリー非表示
  const containers = document.querySelectorAll(".categoryButton");
  containers.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.dataset.pushed === "true") {
        return;
      }
      element.dataset.pushed = "true";

      // カテゴリーを取得
      const id = element.getAttribute("id");

      // リンク先を取得
      const category = element.getAttribute("data-link");

      // アニメーション
      unselected.forEach((element) => {
        element.animate(
          [
            {
              flex: "1",
            },
            {
              flex: "0",
            },
          ],
          {
            duration: 250,
            easing: "ease-out",
            fill: "forwards",
          }
        );
      });
      const anime = element.animate(
        [
          {
            opacity: "1",
          },
          {
            opacity: "0",
          },
        ],
        {
          delay: 250,
          duration: 500,
          easing: "ease-in",
          fill: "forwards",
        }
      );

      // アニメーション終了後
      anime.onfinish = () => {
        // リンク遷移
        open(category, "_self");
      };
    });
  });

  // ================================================================
});
