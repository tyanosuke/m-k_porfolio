$(document).ready(function () {
  // ================================================================

  /**
   * 要素のサイズ・座標を取得
   */
  function getElementData(element) {
    if (element.dataset.isExpanded === "false") {
      element.dataset.initialWidth = element.offsetWidth;
      element.dataset.initialHeight = element.offsetHeight;
    }

    const parent = element.parentElement;
    const parentStyle = window.getComputedStyle(parent);
    element.dataset.initialLeft = parent.getBoundingClientRect().left;
    element.dataset.initialTop = parent.getBoundingClientRect().top;
  }

  // ================================================================

  /**
   * タイトルの消去
   */
  const element = document.querySelector(".titleCover");
  element.addEventListener("click", () => {
    const duration = 500;
    const anime1 = element.animate(
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
      element.remove();

      // 表示アニメーション
      const elements = document.querySelectorAll(".testObject");
      elements.forEach((element) => {
        const duration = 250;
        const anime2 = element.animate(
          [
            {
              transform: "scale(0, 0)",
            },
            {
              transform: "scale(1, 1)",
            },
          ],
          {
            duration: duration,
            easing: "ease-out",
            fill: "forwards",
          }
        );

        anime2.onfinish = () => {
          // フラグ
          element.dataset.isExpanded = false;
          element.dataset.isMoving = false;

          // 要素のサイズ・座標を保持
          getElementData(element);

          // 初期position属性
          const computedStyle = window.getComputedStyle(element);
          const position = computedStyle.getPropertyValue("position");
          element.dataset.initialPosition = position;

          // イベント付加
          element.addEventListener("click", () => {
            toggleElementSize(element);
          });
        };
      });
    };
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
