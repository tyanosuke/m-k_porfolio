$(document).ready(function () {
  // ================================================================

  /**
   * 要素のサイズ・座標を取得
   */
  function getElementData(element) {
    // サイズを取得する
    if (element.dataset.isExpanded === "false") {
      element.dataset.initialWidth = element.offsetWidth;
      element.dataset.initialHeight = element.offsetHeight;
    }

    // 親要素の座標を取得する
    const parent = element.parentElement;
    element.dataset.initialLeft = parent.getBoundingClientRect().left;
    element.dataset.initialTop = parent.getBoundingClientRect().top;
  }

  // ================================================================

  // 初期表示処理
  const containers = document.querySelectorAll(".container");
  containers.forEach((element) => {
    element.classList.add("hide");
  });
  const objects = document.querySelectorAll(".testObject");
  objects.forEach((element) => {
    element.style.transform = "scale(0)";
  });

  // ================================================================

  /**
   * タイトルの消去
   */
  const pageButtons = document.querySelectorAll(".pageButton");
  pageButtons.forEach((element) => {
    element.addEventListener("click", () => {
      // 選択処理
      pageButtons.forEach((element) => {
        element.classList.remove("selected");
      });
      element.classList.add("selected");

      // アニメーション
      const duration = 500;
      const titleCover = document.querySelector(".titleCover");
      const anime1 = titleCover.animate(
        [
          {
            clipPath: "inset(0 0 0 0)",
          },
          {
            clipPath: "inset(0 0 0 100%)",
          },
        ],
        {
          duration: duration,
          easing: "ease-out",
          fill: "forwards",
        }
      );
      anime1.onfinish = () => {
        // タイトルを消去
        titleCover.remove();

        // 要素を表示
        const containers = document.querySelector(".container");
        containers.classList.remove("hide");

        // 表示アニメーション
        const elements = document.querySelectorAll(".testObject");
        elements.forEach((element) => {
          // フラグ
          element.dataset.isExpanded = false;
          element.dataset.isMoving = false;

          // 要素のサイズ・座標を保持
          getElementData(element);

          // クラス情報取得用
          const computedStyle = window.getComputedStyle(element);

          // 初期position属性
          const position = computedStyle.getPropertyValue("position");
          element.dataset.initialPosition = position;

          // 初期背景色
          const bgColor = computedStyle.getPropertyValue("background-color");
          element.dataset.initialBgColor = bgColor;

          // アイテムを拡大表示
          element.style = {};

          // イベント付加
          element.addEventListener("click", () => {
            toggleElementSize(element);
          });
        });
      };
    });
  });

  // ================================================================

  /**
   * 画像ズームイン・アウト
   */
  function toggleElementSize(element) {
    const initialWidth = element.dataset.initialWidth;
    const initialHeight = element.dataset.initialHeight;
    const initialLeft = element.dataset.initialLeft;
    const initialTop = element.dataset.initialTop;
    const initialPosition = element.dataset.initialPosition;
    const initialBgColor = element.dataset.initialBgColor;
    const isExpanded = element.dataset.isExpanded === "true";
    const maxZ = 1000;
    const bgColorSelected = "rgba(255, 255, 255, 1)";
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    element.dataset.isMoving = true;
    const duration = 250;
    let animation;
    if (!isExpanded) {
      // ● 拡大時

      // アニメーション
      animation = element.animate(
        [
          {
            width: initialWidth + "px",
            height: initialHeight + "px",
            left: element.getBoundingClientRect().left + "px",
            top: element.getBoundingClientRect().top + "px",
            backgroundColor: initialBgColor,
            position: "fixed",
          },
          {
            width: "100vw",
            height: "100vh",
            left: "0px",
            top: "0px",
            zIndex: maxZ,
            backgroundColor: bgColorSelected,
          },
        ],
        {
          duration: duration,
          easing: "ease-out",
          fill: "none",
        }
      );
    } else {
      // ● 縮小時

      // アニメーション
      animation = element.animate(
        [
          {
            width: "100vw",
            height: "100vh",
            left: scrollX + "0px",
            top: scrollY + "px",
            zIndex: maxZ,
            backgroundColor: bgColorSelected,
          },
          {
            width: initialWidth + "px",
            height: initialHeight + "px",
            left: initialLeft + "px",
            top: initialTop + "px",
            zIndex: "0",
            backgroundColor: initialBgColor,
          },
        ],
        {
          duration: duration,
          easing: "ease-out",
          fill: "none",
        }
      );

      element.style = {};
    }

    // アニメーション完了後の処理
    animation.onfinish = () => {
      if (element.dataset.isExpanded === "false") {
        // ● 拡大時
        element.style.width = "100vw";
        element.style.height = "100vh";
        element.style.left = "0";
        element.style.top = "0";
        element.style.zIndex = maxZ;
        element.style.backgroundColor = bgColorSelected;
        element.dataset.isExpanded = true;
      } else {
        // ● 縮小時
        element.style = {};
        element.dataset.isExpanded = false;
      }

      element.dataset.isMoving = false;
    };
  }

  // ================================================================

  /**
   * リサイズ時に各要素の座標を再取得
   */
  function resizeElements() {
    const elements = document.querySelectorAll(".testObject");
    elements.forEach((element) => {
      // 要素のサイズ・座標の再取得
      getElementData(element);
    });
  }
  window.addEventListener("resize", resizeElements);

  // ================================================================
});
