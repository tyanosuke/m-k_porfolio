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
        const image = document.createElement("img");
        image.classList.add("item");
        image.classList.add("clickable");
        image.setAttribute("data-src", folderPath + "/" + data.name);
        image.setAttribute("data-cap", folderPath + "/" + data.name + "_c");
        image.setAttribute("data-col", data.color);
        imageContainer.appendChild(image);

        // ランダム移動
        moveElement(image, true);
      });
    })

    // エラー時
    .catch((error) => console.error(error))

    // 処理終了
    .finally(() => {
      const img_elements = document.querySelectorAll("img.item");
      for (let i = 0; i < img_elements.length; i++) {
        const item = img_elements[i];
        // 遅延読み込み
        item.src = item.getAttribute("data-src");
        item.removeAttribute("data-src");

        // 画像読み込み完了したときの処理
        item.addEventListener("load", () => {
          // 次の移動をスケジュールする
          moveElement(item);
          item.addEventListener("transitionend", () => {
            moveElement(item);
          });

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

// 移動速度
const moveSpeed = 150;

/**
 * ランダム移動設定
 */
function moveElement(element, pre = false) {
  // 現在座標を取得
  const { left: startX, top: startY } = element.getBoundingClientRect();

  // Ｘ座標
  let randomLeft = Math.random() * window.innerWidth;

  // Ｙ座標
  let randomTop = Math.random() * window.innerHeight;

  // 大きさ

  // 角度
  let angle = getRotationAngle(element);
  angle += Math.floor(Math.random() * 90);
  angle -= Math.floor(Math.random() * 90);

  if (pre) {
    // 大きさ
    const max = 2.0;
    const min = 0.25;
    const scale = Math.random() * (max - min) + min;
    element.style.width = "calc(20vw * " + scale + ")";
  } else {
    // トランジション
    const dist = Math.sqrt(
      Math.pow(startX - randomLeft, 2) + Math.pow(startY - randomTop, 2)
    );
    const time = dist / moveSpeed;
    element.style.transition = "all " + time + "s linear";
  }

  // 移動の反映
  element.style.left = randomLeft + "px";
  element.style.top = randomTop + "px";
  element.style.transform = "rotate(" + angle + "deg)";
}

/**
 * 要素の角度を取得
 */
function getRotationAngle(element) {
  const style = window.getComputedStyle(element, null);
  const transform = style.getPropertyValue("transform");
  const matrix = transform.match(/^matrix\((.+)\)$/);

  if (matrix) {
    const values = matrix[1].split(",");
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);
    const angleRad = Math.atan2(b, a);
    const angleDeg = angleRad * (180 / Math.PI);

    return angleDeg;
  }

  return 0;
}
