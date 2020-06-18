import Vue from "vue";
import "bootstrap/dist/css/bootstrap.css";
import App from "./vue/App";
import Mock from "mockjs";

const app = new Vue({
  el: "#app",
  render: (h) => h(App),
});
const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
const dataList = [
  {
    title: "第一關：番茄鐘",
    content: "",
    img_url: "./assets/F2E/item01.jpg",
    code_url: "https://github.com/virtools/POMODORO",
    demo_url: "https://virtools.github.io/POMODORO/",
    tags: "F2E",
  },
  {
    title: "第二關：新接龍",
    content: "",
    img_url: "./assets/F2E/item02.jpg",
    code_url: "https://github.com/virtools/FREECELL",
    demo_url: "https://virtools.github.io/FREECELL/",
    tags: "F2E",
  },
  {
    title: "第三關：MP3撥放器",
    content: "",
    img_url: "./assets/F2E/item03.jpg",
    code_url: "https://github.com/virtools/MP3PLAYER",
    demo_url: "https://virtools.github.io/MP3PLAYER/",
    tags: "F2E",
  },
  {
    title: "第四關：線上支付",
    content: "",
    img_url: "./assets/F2E/item04.jpg",
    code_url: "https://github.com/virtools/PAYMENT",
    demo_url: "https://virtools.github.io/PAYMENT/",
    tags: "F2E",
  },
  {
    title: "第五關：90秒挑戰遊戲",
    content: "",
    img_url: "./assets/F2E/item05.jpg",
    code_url: "https://github.com/virtools/90SGAME_0",
    demo_url: "https://virtools.github.io/90SGAME_0/",
    tags: "F2E",
  },
  {
    title: "第六關：訂房網站",
    content: "",
    img_url: "./assets/F2E/item06.jpg",
    code_url: "https://github.com/virtools/RESERVATION",
    demo_url: "https://virtools.github.io/RESERVATION/",
    tags: "F2E",
  },
  {
    title: "第七關：匿名聊天",
    content: "",
    img_url: "./assets/F2E/item07.jpg",
    code_url: "https://github.com/virtools/CHATROOM0",
    demo_url: "https://virtools.github.io/CHATROOM0/",
    tags: "F2E",
  },
  {
    title: "第八關：雲端硬碟",
    content: "",
    img_url: "./assets/F2E/item08.jpg",
    code_url: "https://github.com/virtools/CLOUD-STORAGE",
    demo_url: "https://virtools.github.io/CLOUD-STORAGE/",
    tags: "F2E",
  },
  {
    title: "第九關：筆記軟體",
    content: "",
    img_url: "./assets/F2E/item09.jpg",
    code_url: "https://github.com/virtools/NOTE",
    demo_url: "https://virtools.github.io/NOTE/",
    tags: "F2E",
  },
  {
    title: "第十關：口罩地圖",
    content: "",
    img_url: "./assets/F2E/item10.jpg",
    code_url: "https://github.com/virtools/MASKMAP",
    demo_url: "https://virtools.github.io/MASKMAP/",
    tags: "F2E",
  },
  {
    title: "電流",
    content: "",
    img_url: "./assets/personal/electricity.jpg",
    code_url: "https://github.com/virtools/electricity",
    demo_url: "https://virtools.github.io/electricity/demo3/",
    tags: "personal",
  },
  {
    title: "代碼瀑布",
    content: "",
    img_url: "./assets/personal/codeFalls.jpg",
    code_url: "https://github.com/virtools/codeFalls",
    demo_url: "https://virtools.github.io/codeFalls/",
    tags: "personal",
  },
  {
    title: "沃羅諾伊圖",
    content: "",
    img_url: "./assets/personal/voronoiDiagram.jpg",
    code_url: "https://github.com/virtools/voronoiDiagram",
    demo_url: "https://virtools.github.io/voronoiDiagram/",
    tags: "personal",
  },
  {
    title: "俄羅斯方塊",
    content: "",
    img_url: "./assets/personal/tetris.jpg",
    code_url: "https://github.com/virtools/tetris",
    demo_url: "https://virtools.github.io/tetris/",
    tags: "personal",
  },
  {
    title: "貪食蛇",
    content: "",
    img_url: "./assets/personal/snake.jpg",
    code_url: "https://github.com/virtools/snake",
    demo_url: "https://virtools.github.io/snake/",
    tags: "personal",
  },
  {
    title: "迷宮建立器",
    content: "",
    img_url: "./assets/personal/maze.jpg",
    code_url: "https://github.com/virtools/maze",
    demo_url: "https://virtools.github.io/maze/",
    tags: "personal",
  },
  {
    title: "簡易計算機",
    content: "",
    img_url: "./assets/personal/calc.jpg",
    code_url: "https://github.com/virtools/calc",
    demo_url: "https://virtools.github.io/calc/",
    tags: "personal",
  },
  {
    title: "翻牌時鐘",
    content: "",
    img_url: "./assets/personal/flipClock.jpg",
    code_url: "https://github.com/virtools/flipClock",
    demo_url: "https://virtools.github.io/flipClock/",
    tags: "personal",
  },
  {
    title: "翻頁效果",
    content: "",
    img_url: "./assets/personal/pageTurning.jpg",
    code_url: "https://github.com/virtools/pageTurning",
    demo_url: "https://virtools.github.io/pageTurning/",
    tags: "personal",
  },
  {
    title: "曲線拉桿",
    content: "",
    img_url: "./assets/personal/pathDrag.jpg",
    code_url: "https://github.com/virtools/pathDrag",
    demo_url: "https://virtools.github.io/pathDrag/",
    tags: "personal",
  },
  {
    title: "粒子碰撞(四元樹演算)",
    content: "",
    img_url: "./assets/personal/particleCollision.jpg",
    code_url: "https://github.com/virtools/particleCollision/",
    demo_url: "https://virtools.github.io/particleCollision/particleCollision-quadTree/",
    tags: "personal",
  },
];

//electricity,codeFalls,voronoiDiagram,tetris,snake,maze,particlesbase,shadowCasting
//calc,flipClock,pageTurning,pathDrag
dataList.forEach((el) => {
  el.id = guid();
});
Mock.setup({
  timeout: "50-150",
});
Mock.mock("dataList", "get", (data) => {
  if (data.body) {
    let list = dataList;
    const params = JSON.parse(data.body);
    if (params.filters) {
      for (let key in params.filters) {
        if (key === "tags") {
          const condition = params.filters[key].split(/\,/g);
          list = list.filter((el) => {
            const tags = el[key].split(/\,/g);
            for (let elem of tags) {
              return condition.indexOf(elem) >= 0;
            }
          });
        } else {
          list = list.filter((el) => {
            return el[key] === params.filters[key];
          });
        }
      }
    }
    return list;
  }

  return dataList;
});
