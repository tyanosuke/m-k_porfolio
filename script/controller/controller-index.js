// ブラウザバック時処理（スマホ対応）
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

$(document).ready(function () {
  const menuItems = document.querySelectorAll(".menuList > .item");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imagePrefix = "./image/art/";
      let images = [];
      let color;
      let string = "image/string/";
      switch (item.getAttribute("id")) {
        case "menu_WORKS":
          images.push(imagePrefix + "Work_kaeru_1-32.png");
          images.push(imagePrefix + "Work_kaeru_1-33.png");
          color = "#e7fe7c";
          string += "green";
          break;
        default:
          return;
        // case "menu_ART":
        //   images.push(imagePrefix + "Work_001-31.png");
        //   color = "#f19236";
        //   string += "black";
        //   break;
      }

      // 画像の変更
      const exhibit = document.querySelector(".mainArea .images");
      while (exhibit.firstChild) {
        exhibit.removeChild(exhibit.firstChild);
      }
      images.forEach((image) => {
        const exhibitItem = document.createElement("img");
        exhibitItem.src = image;

        exhibit.appendChild(exhibitItem);
      });

      // 文字のカラー変更
      const colorChangeTargets = document.querySelectorAll(".colorChange img");
      colorChangeTargets.forEach((target) => {
        const slashIndex = target.src.lastIndexOf("/");
        target.src = string + target.src.slice(slashIndex);
      });

      // メニューリストのカラー変更
      const menu = document.querySelector(".menuList");
      console.dir(menu);
      menu.style.backgroundColor = color;
    });
  });
});
