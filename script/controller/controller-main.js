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
      const numImagesToShow = 15; // 表示する画像の数
      while (randomFilenames.length < numImagesToShow) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomFilename = data[randomIndex];
        if (!randomFilenames.includes(randomFilename)) {
          randomFilenames.push(randomFilename);
        }
      }

      // 4. 抜き出したファイル名を使用して、画像を表示する。
      randomFilenames.forEach((data) => {
        const item = document.createElement("div");
        item.classList.add("item");

        // ランダム配置
        let x = Math.floor(Math.random() * 100);
        x -= 10;
        x += Math.floor(Math.random() * 20);
        let y = Math.floor(Math.random() * 100);
        y -= 10;
        y += Math.floor(Math.random() * 20);
        const angle = Math.floor(Math.random() * 360);
        const scale = Math.random() * 1.5 + 0.25;
        item.style.left = x + "%";
        item.style.top = y + "%";
        item.style.width = "calc(20% * " + scale + ")";
        item.style.transform = "rotate(" + angle + "deg)";

        const image = document.createElement("img");
        image.classList.add("clickable");
        image.setAttribute("data-src", folderPath + "/" + data.name);
        image.setAttribute("data-cap", folderPath + "/" + data.name + "_c");
        image.setAttribute("data-col", data.color);

        item.appendChild(image);
        imageContainer.appendChild(item);
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

  // ================================================================
});
