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
  const captionPrefix = "./image/caption/";
  const warksPrefix = "./image/warks/";
  let images = [];
  let links = [];
  let addClass;
  let caption = "caption_WORKS.png";
  let menuBarColor = "rgb(255, 170, 0)";
  let backgroundColor = "rgb(185, 190, 185)";
  let stringColor = "yellow";
  let menuButtonColer = "rgb(255, 250, 50)";
  switch (mode) {
    // メニュー
    // ● WORKS
    case "menu_WORKS":
      images.push([
        warksPrefix + "thumbnail_kaeru2.png",
        warksPrefix + "thumbnail_kaeru1.png",
      ]);
      images.push([warksPrefix + "thumbnail_color_shape1.png"]);
      images.push([warksPrefix + "thumbnail_artsite1.png"]);
      images.push([warksPrefix + "thumbnail_2022newyearcard1.png"]);
      images.push([warksPrefix + "thumbnail_2021christmascard1.png"]);
      images.push([warksPrefix + "thumbnail_ugoqmainvisual1.png"]);
      images.push([warksPrefix + "thumbnail_500.png"]);
      images.push([warksPrefix + "thumbnail_flower.png"]);
      images.push([warksPrefix + "thumbnail_usagi.png"]);
      images.push([warksPrefix + "thumbnail_UGOQBC.png"]);
      images.push([warksPrefix + "thumbnail_UJHP.png"]);
      images.push([warksPrefix + "thumbnail_nomad.png"]);
      images.push([warksPrefix + "thumbnail_UGOQARAI.png"]);
      images.push([warksPrefix + "thumbnail_breaktime.png"]);
      links.push(
        {
          url: "work_kaeru",
          target: "main",
        },
        {
          url: "work_colorAndShape",
          target: "main",
        },
        {
          url: "menu_ART",
          target: "main",
        },
        {
          url: "work_newyearcard",
          target: "main",
        },
        {
          url: "work_christmascard",
          target: "main",
        },
        {
          url: "work_ugoq",
          target: "main",
        },
        {
          url: "work_500",
          target: "main",
        },
        {
          url: "work_flower",
          target: "main",
        },
        {
          url: "work_usagi",
          target: "main",
        },
        {
          url: "work_ugoqbc",
          target: "main",
        },
        {
          url: "work_ujhp",
          target: "main",
        },
        {
          url: "work_nomad",
          target: "main",
        },
        {
          url: "work_ugoqarai",
          target: "main",
        },
        {
          url: "work_breaktime",
          target: "main",
        }
      );
      addClass = "list";
      break;
    // ● ABOUT
    case "menu_ABOUT":
      works = false;
      break;
    // ● ART
    case "menu_ART":
      images.push(warksPrefix + "thumbnail_artsite1.png");
      links.push({
        url: "./gallery/index.html",
        target: "_blank",
      });
      addClass = "link";
      works = false;
      break;
    // ● INSTAGRAM
    case "menu_INSTAGRAM":
      images.push(imagePrefix + "other/INSTAGRAM_icon.png");
      links.push({
        url: "https://www.instagram.com/mar__graphics/?igshid=Mzc1MmZhNjY%3D",
        target: "_blank",
      });
      addClass = "link";
      menuBarColor = "rgb(244, 193, 250)";
      backgroundColor = "rgb(70, 0, 170)";
      stringColor = ["purple", "orange"];
      menuButtonColer = "rgb(25, 30, 95)";
      works = false;
      break;

    // ギャラリー
    // ● カエル
    case "work_kaeru":
      images.push(imagePrefix + "kaeru/Work_kaeru_1.png");
      images.push(imagePrefix + "kaeru/Work_kaeru_2.png");
      images.push(imagePrefix + "kaeru/Work_kaeru_3.png");
      images.push(imagePrefix + "kaeru/Work_kaeru_4.png");
      images.push(imagePrefix + "kaeru/Work_kaeru_5.png");
      addClass = "single";
      caption = "caption_kaeru.png";
      menuBarColor = "rgb(225, 255, 100)";
      menuButtonColer = "rgb(0, 95, 50)";
      stringColor = "green";
      break;
    // ● 色と形
    case "work_colorAndShape":
      images.push(imagePrefix + "colorAndShape/" + "Work_color_shape_1.png");
      images.push(imagePrefix + "colorAndShape/" + "Work_color_shape_2.png");
      images.push(imagePrefix + "colorAndShape/" + "Work_color_shape_3.png");
      addClass = "single";
      menuBarColor = "rgb(0, 0, 198)";
      menuButtonColer = "rgb(255, 210, 0)";
      stringColor = "colorAndShape";
      break;
    // ● newyearcard
    case "work_newyearcard":
      images.push(imagePrefix + "newyearcard/" + "Work_newyear2022_1.png");
      images.push(imagePrefix + "newyearcard/" + "Work_newyear2022_2.png");
      images.push(imagePrefix + "newyearcard/" + "Work_newyear2022_3.png");
      images.push(imagePrefix + "newyearcard/" + "Work_newyear2022_4.png");
      images.push(imagePrefix + "newyearcard/" + "Work_newyear2022_5.png");
      images.push(imagePrefix + "newyearcard/" + "Work_newyear2022_6.png");
      images.push(imagePrefix + "newyearcard/" + "Work_newyear2022_7.png");
      addClass = "single";
      menuBarColor = "rgb(0, 0, 0)";
      menuButtonColer = "rgb(100, 255, 100)";
      stringColor = "newyearcard";
      break;
    // ● christmascard
    case "work_christmascard":
      images.push(imagePrefix + "christmascard/" + "Work_christmas_1.png");
      images.push(imagePrefix + "christmascard/" + "Work_christmas_2.png");
      addClass = "single";
      menuBarColor = "rgb(210, 0, 20)";
      menuButtonColer = "rgb(255, 255, 185)";
      stringColor = "christmascard";
      break;
    // ● ugoq
    case "work_ugoq":
      images.push(imagePrefix + "ugoq/" + "Work_ugoqmainvisual_1.png");
      images.push(imagePrefix + "ugoq/" + "Work_ugoqmainvisual_2.png");
      addClass = "single";
      menuBarColor = "rgb(0, 0, 0)";
      menuButtonColer = "rgb(255, 255, 255)";
      stringColor = ["ugoq_1", "ugoq_2"];
      break;
    // ● 500folowers
    case "work_500":
      images.push(imagePrefix + "500folowers/" + "Work_500_1.png");
      images.push(imagePrefix + "500folowers/" + "Work_500_2.png");
      images.push(imagePrefix + "500folowers/" + "Work_500_3.png");
      images.push(imagePrefix + "500folowers/" + "Work_500_4.png");
      addClass = "single";
      menuBarColor = "rgb(60, 0, 156)";
      menuButtonColer = "rgb(255, 255, 255)";
      stringColor = "500folowers";
      break;
    // ● flower
    case "work_flower":
      images.push(imagePrefix + "flower/" + "Work_flower_1.png");
      images.push(imagePrefix + "flower/" + "Work_flower_2.png");
      images.push(imagePrefix + "flower/" + "Work_flower_3.png");
      images.push(imagePrefix + "flower/" + "Work_flower_4.png");
      addClass = "single";
      menuBarColor = "rgb(245, 90, 30)";
      menuButtonColer = "rgb(255, 255, 0)";
      stringColor = "flower";
      break;
    // ● usagi
    case "work_usagi":
      images.push(imagePrefix + "usagi/" + "Work_usagi_1.png");
      images.push(imagePrefix + "usagi/" + "Work_usagi_2.png");
      addClass = "single";
      menuBarColor = "rgb(0, 75, 60)";
      menuButtonColer = "rgb(255, 245, 195)";
      stringColor = "usagi";
      break;

    // ● ugoqbc
    case "work_ugoqbc":
      images.push(imagePrefix + "ugoqbc/" + "Work_UGOQBC_1.png");
      images.push(imagePrefix + "ugoqbc/" + "Work_UGOQBC_2.png");
      addClass = "single";
      menuBarColor = "rgb(0, 0, 0)";
      menuButtonColer = "rgb(255, 255, 255)";
      stringColor = ["ugoqbc_1", "ugoqbc_2"];
      break;
    // ● UJHP
    case "work_ujhp":
      images.push(imagePrefix + "ujhp/" + "Work_UJHP_1.png");
      images.push(imagePrefix + "ujhp/" + "Work_UJHP_2.png");
      images.push(imagePrefix + "ujhp/" + "Work_UJHP_3.png");
      images.push(imagePrefix + "ujhp/" + "Work_UJHP_4.png");
      images.push(imagePrefix + "ujhp/" + "Work_UJHP_5.png");
      images.push(imagePrefix + "ujhp/" + "Work_UJHP_6.png");
      images.push(imagePrefix + "ujhp/" + "Work_UJHP_7.png");
      images.push(imagePrefix + "ujhp/" + "Work_UJHP_8.png");
      images.push(imagePrefix + "ujhp/" + "Work_UJHP_9.png");
      addClass = "single";
      menuBarColor = "rgb(244, 246, 246)";
      menuButtonColer = "rgb(0, 0, 0)";
      stringColor = ["ujhp_1", "ujhp_2"];
      break;
    // ● nomad
    case "work_nomad":
      images.push(imagePrefix + "nomad/" + "Work_nomad_1.png");
      images.push(imagePrefix + "nomad/" + "Work_nomad_2.png");
      images.push(imagePrefix + "nomad/" + "Work_nomad_3.png");
      addClass = "single";
      menuBarColor = "rgb(0, 0, 0)";
      menuButtonColer = "rgb(255, 110, 0)";
      stringColor = ["nomad_1", "nomad_2"];
      break;
    // ● ugoqarai
    case "work_ugoqarai":
      images.push(imagePrefix + "ugoqarai/" + "Work_UGOQARAI_1.png");
      images.push(imagePrefix + "ugoqarai/" + "Work_UGOQARAI_2.png");
      images.push(imagePrefix + "ugoqarai/" + "Work_UGOQARAI_3.png");
      images.push(imagePrefix + "ugoqarai/" + "Work_UGOQARAI_4.png");
      images.push(imagePrefix + "ugoqarai/" + "Work_UGOQARAI_5.png");
      images.push(imagePrefix + "ugoqarai/" + "Work_UGOQARAI_6.png");
      images.push(imagePrefix + "ugoqarai/" + "Work_UGOQARAI_7.png");
      images.push(imagePrefix + "ugoqarai/" + "Work_UGOQARAI_8.png");
      addClass = "single";
      menuBarColor = "rgb(0, 0, 0)";
      menuButtonColer = "rgb(225, 195, 115)";
      stringColor = "ugoqarai";
      break;
    // ● breaktime
    case "work_breaktime":
      images.push(imagePrefix + "breaktime/" + "Work_breaktime_1.png");
      images.push(imagePrefix + "breaktime/" + "Work_breaktime_2.png");
      images.push(imagePrefix + "breaktime/" + "Work_breaktime_3.png");
      images.push(imagePrefix + "breaktime/" + "Work_breaktime_4.png");
      images.push(imagePrefix + "breaktime/" + "Work_breaktime_5.png");
      addClass = "single";
      menuBarColor = "rgb(0, 70, 60)";
      menuButtonColer = "rgb(255, 245, 195)";
      stringColor = ["breaktime_1", "breaktime_2"];
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

    // リンク設定
    const link = links[i];
    if (link && link.url) {
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

  // キャプション表示
  const captionTarget = document.querySelector(".caption > img");
  captionTarget.src = captionPrefix + caption;

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
