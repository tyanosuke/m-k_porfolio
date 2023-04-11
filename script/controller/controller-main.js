// ブラウザバック時処理（スマホ対応）
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

// 表示する画像の数
const numImagesToShow = 15;

$(document).ready(function () {
  /**
   * 初期化
   */

  // 要素を追加する箇所を指定
  const imageContainer = document.querySelector(".container");
  const id = imageContainer.getAttribute("id");

  // 1. JSONファイルを取得する。
  const folderPath = "./image/" + id;
  fetch(folderPath + "/index.json")
    .then((response) => response.json())
    .then((data) => {
      // 3. リストからランダムにいくつかのファイル名を抜き出す。
      const randomFilenames = [];
      while (randomFilenames.length < numImagesToShow) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomFilename = data[randomIndex];
        if (!randomFilenames.includes(randomFilename)) {
          randomFilenames.push(randomFilename);
        }
      }

      // 4. 抜き出したファイル名を使用して、画像を表示する。
      randomFilenames.forEach((data) => {
        // 要素作成
        const item = document.createElement("div");
        item.classList.add("item");
        const image = document.createElement("img");
        image.classList.add("clickable");
        image.setAttribute("data-src", folderPath + "/" + data.name);
        image.setAttribute("data-cap", folderPath + "/" + data.name + "_c");
        image.setAttribute("data-col", data.color);
        item.appendChild(image);
        imageContainer.appendChild(item);

        // ランダム移動
        moveElement(item);
        // 次の移動をスケジュールする
        item.addEventListener("transitionend", () => {
          moveElement(item);
        });
      });
    })

    // エラー時
    .catch((error) => console.error(error))

    // 処理終了
    .finally(() => {
      const img_elements = document.querySelectorAll(".item img");
      for (let i = 0; i < img_elements.length; i++) {
        const item = img_elements[i];
        // 遅延読み込み
        item.src = item.getAttribute("data-src");
        item.removeAttribute("data-src");

        // 画像読み込み完了したときの処理
        item.addEventListener("load", () => {
          // イベント付加
          item.addEventListener("click", () => {
            // セッションストレージに表示画像データをセット
            sessionStorage.setItem("image", item.src);
            sessionStorage.setItem("color", item.getAttribute("data-col"));

            // ページ遷移
            open("gallery.html", "_self");
          });
        });
      }
    });
});
// ================================================================

const maxDuration = 5000;
const moveSpeed = 300;
const moveMax = (maxDuration / 1000) * moveSpeed;

// 動き設定
function moveElement(element) {
  // ランダム移動
  setMove(element);
}

// 設定
function setMove(element) {
  // 現在座標を取得
  const rect = element.getBoundingClientRect();
  const screen = document.querySelector(".container").getBoundingClientRect();
  const screenWidth = screen.width;
  const screenHeight = screen.height;

  let max;
  let min;

  // Ｘ座標
  max = screenWidth;
  min = 10;
  const randomLeft = Math.floor(Math.random() * (max - min) + min);
  element.style.left = randomLeft + "px";

  // Ｙ座標
  max = screenHeight;
  min = 10;
  const randomTop = Math.floor(Math.random() * (max - min) + min);
  element.style.top = randomTop + "px";

  // 大きさ
  if (!element.style.width) {
    max = 2.0;
    min = 0.25;
    const scale = Math.random() * (max - min) + min;
    element.style.width = "calc(20vw * " + scale + ")";
  }

  // 角度
  const angle = Math.floor(Math.random() * 360);
  element.style.transform = "rotate(" + angle + "deg)";

  // トランジション
  const dist =
    Math.abs(randomLeft - rect.left) + Math.abs(randomTop - rect.top);
  const time = dist / moveSpeed;
  element.style.transition = "all " + time + "s linear";
}
