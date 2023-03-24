$(document).ready(function () {
  // ================================================================

  /**
   * 初期化
   */

  // 要素を追加する箇所を指定
  const imageContainer = document.querySelector(".container");
  const id = imageContainer.getAttribute("id");

  // ギャラリー作成
  const folderPath = "./image/" + id;
  fetch(folderPath + "/index.json")
    .then((response) => response.json())
    .then((data) => {
      // フォルダ内の画像データを読み込み
      data.forEach((imageData) => {
        const primary = document.createElement("div");
        primary.classList.add("item");

        const secondary = document.createElement("div");
        secondary.classList.add("exhibit");
        secondary.style.transform = "scale(0)";
        secondary.dataset.isExpanded = false;
        secondary.dataset.isMoving = false;

        const image = document.createElement("img");
        image.setAttribute("data-src", folderPath + "/" + imageData.name);
        image.alt = imageData.caption;

        secondary.appendChild(image);
        primary.appendChild(secondary);
        imageContainer.appendChild(primary);
      });
    })

    // エラー時
    .catch((error) => console.error(error))

    // 処理終了後
    .finally(() => {
      const img_elements = document.querySelectorAll(".item img");
      for (let i = 0; i < img_elements.length; i++) {
        // 遅延読み込み
        img_elements[i].src = img_elements[i].getAttribute("data-src");
        img_elements[i].removeAttribute("data-src");

        // 画像読み込み完了したときの処理
        img_elements[i].addEventListener("load", () => {
          // 最後の１つの場合
          if (img_elements.length - 1 === i) {
            // 表示アニメーション
            const elements = document.querySelectorAll(".exhibit");
            elements.forEach((element) => {
              // 要素のサイズ・座標を保持
              getElementData(element);
              // アイテムを拡大表示
              element.style = {};
              // イベント付加
              element.addEventListener("click", () => {
                toggleElementSize(element);
              });
            });

            // スピナー非表示
            const spinner = document.querySelector(".spinner");
            spinner.classList.add("hide");
          }
        });
      }
    });

  // ================================================================

  /**
   * リサイズ時に各要素の座標を再取得
   */
  function resizeElements() {
    const elements = document.querySelectorAll(".exhibit");
    elements.forEach((element) => {
      // 要素のサイズ・座標の再取得
      getElementData(element);
    });
  }
  window.addEventListener("resize", resizeElements);

  // ================================================================

  /**
   * ギャラリーオブジェクトの取得
   */
  function getGalleryObject(element = null) {
    const crntElm = element
      ? element
      : document.querySelector(".exhibit[data-is-expanded=true]");
    const prevElm = crntElm.parentElement.previousElementSibling;
    const nextElm = crntElm.parentElement.nextElementSibling;

    let result = [];
    if (prevElm) {
      result[0] = prevElm.querySelector(".exhibit");
    }
    result[1] = crntElm;
    if (nextElm) {
      result[2] = nextElm.querySelector(".exhibit");
    }
    return result;
  }

  // ================================================================

  /**
   * PREVボタン
   */
  const elementPrevButton = document.querySelector(".prevButton");
  function pushPrevButton() {
    // 前のアイテムが無い場合、処理を行わない
    if (elementPrevButton.classList.contains("invalid")) {
      return;
    }

    // クリックイベントを発火
    const exhibitList = getGalleryObject();
    toggleElementSize(exhibitList[1], 1);
    toggleElementSize(exhibitList[0], 1);
  }
  elementPrevButton.addEventListener("click", pushPrevButton);

  // ================================================================

  /**
   * NEXTボタン
   */
  const elementNextButton = document.querySelector(".nextButton");
  function pushNextButton() {
    // 次のアイテムが無い場合、処理を行わない
    if (elementNextButton.classList.contains("invalid")) {
      return;
    }

    // クリックイベントを発火
    const exhibitList = getGalleryObject();
    toggleElementSize(exhibitList[1], 2);
    toggleElementSize(exhibitList[2], 2);
  }
  elementNextButton.addEventListener("click", pushNextButton);

  // ================================================================

  /**
   * スクロール禁止
   */
  function noscroll(e) {
    e.preventDefault();
  }

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

  // 画像ズームイン・アウト
  function toggleElementSize(element, shiftMode = 0) {
    // 座標の再取得
    getElementData(element);

    // 定数
    const initialWidth = parseInt(element.dataset.initialWidth);
    const initialHeight = parseInt(element.dataset.initialHeight);
    const initialLeft = parseInt(element.dataset.initialLeft);
    const initialTop = parseInt(element.dataset.initialTop);
    const isExpanded = element.dataset.isExpanded === "true";
    const maxW = "100%";
    const maxH = "100%";
    const maxZ = 2000;
    const pad = "20px";
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const posExpanded = "fixed";
    const captionElement = document.querySelector(".caption");

    // ズームイン・アウト処理
    element.dataset.isMoving = true;
    const duration = 250;
    let animation;
    if (!isExpanded) {
      // ● 拡大時

      // 背景表示
      document.querySelector(".galleryBackground").classList.remove("hide");

      // キャプション・ボタン非表示
      document.querySelector(".caption").classList.remove("hide");
      captionElement.textContent = element.querySelector("img").alt;
      document.querySelector(".galleryButtonArea").classList.remove("hide");

      // PREV/NEXTボタン設定
      const exhibits = getGalleryObject(element);
      const prevClass = document.querySelector(".prevButton").classList;
      const nextClass = document.querySelector(".nextButton").classList;
      if (!exhibits[0]) {
        prevClass.add("invalid");
      } else {
        prevClass.remove("invalid");
      }
      if (!exhibits[2]) {
        nextClass.add("invalid");
      } else {
        nextClass.remove("invalid");
      }

      // アニメーション
      animation = element.animate(
        [
          {
            width: initialWidth + "px",
            height: initialHeight + "px",
            left: element.getBoundingClientRect().left + "px",
            top: element.getBoundingClientRect().top + "px",
            position: posExpanded,
          },
          {
            width: maxW,
            height: maxH,
            left: "0px",
            top: "0px",
            zIndex: maxZ,
            padding: pad,
            position: posExpanded,
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

      // 背景表示
      if (shiftMode === 0) {
        document.querySelector(".galleryBackground").classList.add("hide");
      }

      // キャプション・ボタン非表示
      document.querySelector(".caption").classList.add("hide");
      document.querySelector(".galleryButtonArea").classList.add("hide");

      // アニメーション
      animation = element.animate(
        [
          {
            left: scrollX + "px",
            top: scrollY + "px",
            zIndex: maxZ,
            padding: pad,
          },
          {
            width: initialWidth + "px",
            height: initialHeight + "px",
            left: initialLeft + scrollX + "px",
            top: initialTop + scrollY + "px",
            zIndex: "0",
          },
        ],
        {
          duration: duration,
          easing: "ease-out",
          fill: "none",
        }
      );
    }

    // アニメーション終了後
    animation.onfinish = () => {
      if (element.dataset.isExpanded === "false") {
        // ● 拡大時

        // スタイル・フラグ操作
        element.style.width = maxW;
        element.style.height = maxH;
        element.style.left = "0px";
        element.style.top = "0px";
        element.style.zIndex = maxZ;
        element.style.padding = pad;
        element.style.position = posExpanded;
        element.dataset.isExpanded = true;

        // スクロール禁止：ＯＮ
        document.addEventListener("touchmove", noscroll, { passive: false });
        document.addEventListener("wheel", noscroll, { passive: false });
      } else {
        // ● 縮小時

        // スタイル・フラグ操作
        element.style = {};
        element.dataset.isExpanded = false;

        // スクロール禁止：ＯＦＦ
        document.removeEventListener("touchmove", noscroll);
        document.removeEventListener("wheel", noscroll);
      }

      element.dataset.isMoving = false;
    };
  }

  // ================================================================
});
