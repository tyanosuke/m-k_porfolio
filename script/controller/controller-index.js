// ブラウザバック時処理（スマホ対応）
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

// 画像切り替え用
let imageChangeCount = 0;

// 切り替えタイミング（ms）
const imageChangeDuration = 2000;

/**
 * 初期化
 */
$(document).ready(function () {
  // 画像切り替え用
  imageChangeCount = 0;

  //  画像の表示
  setImages("menu_WORKS");

  // メニューの設定
  const menuItems = document.querySelectorAll(".menuList > .item");
  menuItems.forEach((item) => {
    // メニュー項目をクリックした場合
    item.addEventListener("click", () => {
      // 画像の表示
      setImages(item.getAttribute("id"));
    });
  });

  // 画像切り替え
  setInterval(() => {
    imageAnimation();
  }, imageChangeDuration);

  // ハンバーガーボタン
  const hamburgerButton = document.querySelector(".hamburgerButton");
  hamburgerButton.addEventListener("click", () => {
    // 開閉
    pushHamburgerButton();
  });
});

/**
 * 画像の表示
 */
function setImages(mode, works = false) {
  // トップへスクロール
  window.scroll(0, 0);

  // メニューを閉じる
  pushHamburgerButton(2);

  // 画像表示用クラス
  const exhibitClassList = ["list", "single", "link"];

  // 表示内容の判定
  const imagePrefix = "./image/art/";
  const warksPrefix = "./image/warks/";
  let images = [];
  let bigImageIndex = [];
  let links = [];
  let addClass;
  let menuBarColor = "rgb(255, 170, 0)";
  let backgroundColor = "rgb(185, 190, 185)";
  let stringColor = "yellow";
  let menuButtonColer = "rgb(255, 250, 50)";
  switch (mode) {
    // メニュー
    case "menu_WORKS":
      images.push([
        warksPrefix + "thumbnail_kaeru2.png",
        warksPrefix + "thumbnail_kaeru1.png",
      ]);
      images.push([
        warksPrefix + "thumbnail_color_shape1.png",
        warksPrefix + "thumbnail_kaeru2.png",
      ]);
      images.push([
        warksPrefix + "thumbnail_artsite1.png",
        warksPrefix + "thumbnail_kaeru2.png",
      ]);
      images.push([
        warksPrefix + "thumbnail_2022newyearcard1.png",
        warksPrefix + "thumbnail_kaeru2.png",
      ]);
      images.push([
        warksPrefix + "thumbnail_2021christmascard1.png",
        warksPrefix + "thumbnail_kaeru2.png",
      ]);
      images.push([
        warksPrefix + "thumbnail_ugoqmainvisual1.png",
        warksPrefix + "thumbnail_kaeru2.png",
      ]);
      links.push({
        url: "work_kaeru",
        target: "main",
      });
      addClass = "list";
      break;
    case "menu_ABOUT":
      break;
    case "menu_ART":
      images.push(warksPrefix + "thumbnail_artsite1.png");
      links.push({
        url: "./gallery/index.html",
        target: "_blank",
      });
      addClass = "link";
      break;
    case "menu_INSTAGRAM":
      images.push(imagePrefix + "INSTAGRAM_icon.png");
      links.push({
        url: "https://www.instagram.com/mar__graphics/?igshid=Mzc1MmZhNjY%3D",
        target: "_blank",
      });
      addClass = "link";
      menuBarColor = "rgb(244, 193, 250)";
      backgroundColor = "rgb(70, 0, 170)";
      stringColor = ["purple", "orange"];
      menuButtonColer = "rgb(25, 30, 95)";
      break;
    // ギャラリー
    case "work_lineAndShape":
      images.push(imagePrefix + "Work_color_shape_2.png");
      images.push(imagePrefix + "Work_color_shape_3.png");
      images.push(imagePrefix + "Work_color_shape_4.png");
      images.push(imagePrefix + "Work_color_shape_5.png");
      images.push(imagePrefix + "Work_color_shape_2.png");
      images.push(imagePrefix + "Work_color_shape_3.png");
      images.push(imagePrefix + "Work_color_shape_4.png");
      images.push(imagePrefix + "Work_color_shape_5.png");
      images.push(imagePrefix + "Work_color_shape_2.png");
      images.push(imagePrefix + "Work_color_shape_3.png");
      images.push(imagePrefix + "Work_color_shape_4.png");
      images.push(imagePrefix + "Work_color_shape_5.png");
      addClass = "list";
      break;
    case "work_kaeru":
      images.push(imagePrefix + "Work_kaeru_1-32.png");
      images.push(imagePrefix + "Work_kaeru_1-33.png");
      addClass = "single";
      menuBarColor = "rgb(225, 255, 100)";
      stringColor = "green";
      menuButtonColer = "rgb(0, 95, 50)";
      break;
    // 例外
    default:
      return;
  }

  // 画像表示用の要素を取得
  const exhibit = document.querySelector(".mainArea .images");

  // クラス付与
  exhibitClassList.forEach((item) => {
    exhibit.classList.remove(item);
  });
  exhibit.classList.add(addClass);

  // 画像の表示
  while (exhibit.firstChild) {
    exhibit.removeChild(exhibit.firstChild);
  }
  let i = 0;
  images.forEach((image) => {
    // 要素の生成
    const exhibitItem = document.createElement("img");

    // 画像の設定
    if (!Array.isArray(image)) {
      // ● １枚
      exhibitItem.src = image;
    } else {
      // ● 複数枚
      exhibitItem.src = image[0];
      for (let j = 0; j < image.length; j++) {
        exhibitItem.setAttribute("data-image" + (j + 1), image[j]);
      }
    }

    // 大きい画像
    if (bigImageIndex.includes(i)) {
      exhibitItem.classList.add("big");
    }

    // リンク設定
    const link = links[i];
    if (link) {
      exhibitItem.classList.add("clickable");
      exhibitItem.addEventListener("click", () => {
        if (link.target === "main") {
          setImages(link.url, true);
        } else {
          open(link.url, link.target);
        }
      });
    }

    // 要素を挿入
    exhibit.appendChild(exhibitItem);

    i++;
  });

  // 文字のカラー変更
  const colorChangeTargets = document.querySelectorAll(".colorChange img");
  colorChangeTargets.forEach((target) => {
    let color = "image/string/";
    if (Array.isArray(stringColor)) {
      color +=
        stringColor[
          target.parentElement.classList.contains("mainAreaItem") ? 1 : 0
        ];
    } else {
      color += stringColor;
    }

    if (target.parentElement.classList.contains("pageName")) {
      target.src = color + "/" + (works ? "menu_WORKS" : mode) + ".png";
    } else {
      const slashIndex = target.src.lastIndexOf("/");
      target.src = color + target.src.slice(slashIndex);
    }
  });

  // 背景のカラー変更
  const background = document.querySelector("body");
  background.style.backgroundColor = backgroundColor;

  // メニューリストのカラー変更
  const menu = document.querySelector(".menuList");
  menu.style.backgroundColor = menuBarColor;

  // スマホ用メニューボタンのカラー変更
  document.documentElement.style.setProperty(
    "--defaulr-string-colr",
    menuButtonColer
  );
}

/**
 * ギャラリー画像の切り替え
 */
function imageAnimation() {
  const animationTargets = document.querySelectorAll(".images img");
  const item = animationTargets[imageChangeCount];
  if (
    item &&
    item.getAttribute("data-image1") &&
    item.getAttribute("data-image2")
  ) {
    item.src = item.getAttribute("data-image2");

    setTimeout(() => {
      item.src = item.getAttribute("data-image1");
    }, imageChangeDuration);
  }

  imageChangeCount++;
  if (imageChangeCount >= animationTargets.length) {
    imageChangeCount = 0;
  }
}

/**
 * ハンバーガーボタン
 */
function pushHamburgerButton(mode = 0) {
  const button = document.querySelector(".hamburgerButton");
  const menu = document.querySelector(".menuList");
  switch (mode) {
    case 1:
      button.classList.add("open");
      menu.classList.add("open");
      break;

    case 2:
      button.classList.remove("open");
      menu.classList.remove("open");
      break;

    default:
      button.classList.toggle("open");
      menu.classList.toggle("open");
  }
}
