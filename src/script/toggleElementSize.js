$(document).ready(function () {
  /**
   * 画像ズームイン・アウト
   */
  function toggleElementSize(element) {
    const initialWidth = element.dataset.initialWidth;
    const initialHeight = element.dataset.initialHeight;
    const initialLeft = element.dataset.initialLeft;
    const initialTop = element.dataset.initialTop;
    const initialPosition = element.dataset.initialPosition;
    const isExpanded = element.dataset.isExpanded === "true";
    const maxZ = 99999;

    element.dataset.isMoving = true;

    const duration = 250;
    let animation;
    if (!isExpanded) {
      // ● 拡大時
      animation = element.animate(
        [
          {
            width: initialWidth + "px",
            height: initialHeight + "px",
            left: element.getBoundingClientRect().left + "px",
            top: element.getBoundingClientRect().top + "px",
          },
          {
            width: "100vw",
            height: "100vh",
            left: "0px",
            top: "0px",
            zIndex: maxZ,
          },
        ],
        {
          duration: duration,
          easing: "ease-out",
          fill: "none",
        }
      );

      element.style.position = "fixed";
    } else {
      // ● 縮小時
      animation = element.animate(
        [
          {
            width: "100vw",
            height: "100vh",
            left: "0px",
            top: "0px",
            position: initialPosition,
          },
          {
            width: initialWidth + "px",
            height: initialHeight + "px",
            left: initialLeft + "px",
            top: initialTop + "px",
            position: initialPosition,
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
        element.dataset.isExpanded = true;
      } else {
        // ● 縮小時
        element.style = {};
        element.dataset.isExpanded = false;
      }

      element.dataset.isMoving = false;
    };
  }

  // イベントをバインド
  const elements = document.querySelectorAll(".testObject");
  elements.forEach((element) => {
    // フラグ
    element.dataset.isExpanded = false;
    element.dataset.isMoving = false;

    // 要素のサイズ・座標を保持
    element.addEventListener("animationend", () => {
      getElementData(element);
    });

    // 初期position属性
    const computedStyle = window.getComputedStyle(element);
    const position = computedStyle.getPropertyValue("position");
    element.dataset.initialPosition = position;

    // イベント付加
    element.addEventListener("click", () => {
      toggleElementSize(element);
    });
  });

  /**
   * 要素のサイズ・座標を取得
   */
  function getElementData(element) {
    element.dataset.initialWidth = element.offsetWidth;
    element.dataset.initialHeight = element.offsetHeight;
    element.dataset.initialLeft = element.getBoundingClientRect().left;
    element.dataset.initialTop = element.getBoundingClientRect().top;
  }

  /**
   * リサイズ時に各要素の座標を再取得
   */
  function resizeElements() {
    const elements = document.querySelectorAll(".testObject");
    elements.forEach((element) => {
      if (element.dataset.isExpanded === "false") {
        // 要素のサイズ・座標の再取得
        getElementData(element);
      }
    });
  }

  window.addEventListener("resize", resizeElements);
});
