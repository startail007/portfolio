<template>
  <div class="wrap" v-cloak>
    <div class="content">
      <header class="sticky-top">
        <div class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
          <div class="container d-flex justify-content-between">
            <a href="javascript:void(0);" class="navbar-brand d-flex align-items-center">
              <img :src="img_logo" class="img-thumbnail mr-2" />
              <strong>Portfolio</strong>
            </a>
          </div>
        </div>
      </header>
      <section id="section_introduction" class="position-relative">
        <div class="container position-relative">
          <!-- <div class="title px-1 py-3">
            <h3>簡介</h3>
          </div> -->
          <div class="row px-2 py-5">
            <div class="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center px-2 py-4">
              <div class="myIcon"></div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-9 px-2 py-4">
              <div class="word">
                <h2>
                  <p>Hi,我叫阿偉</p>
                </h2>
                <table>
                  <tbody>
                    <tr>
                      <td class="table-title">職業：</td>
                      <td class="table-content">
                        <div>前端工程師</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="table-title">技能：</td>
                      <td class="table-content">
                        <div class="mt-1">Sass + PostCSS 規劃響應式網頁版型</div>
                        <div class="mt-1">jQuery Plugin 整合第三方插件動畫效果</div>
                        <div class="mt-1">AJAX/JSON 搭配 vue.js 設計 SPA 架構</div>
                        <div class="mt-1">nodejs 後端 api 建置及 CRUD 作業結合 firebase , mysql 資料庫</div>
                        <div class="mt-1">flutter 跨平台 APP 開發</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="table-title">連結：</td>
                      <td class="table-content">
                        <a href="https://github.com/virtools" target="_blank">github</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- <h6>職業：前端工程師</h6>
                <h6 class="mb-2">技能：</h6>
                <div class="detail ml-2">
                  <div>html5互動網頁設計</div>
                  <div class="mt-1">vuejs + vuetify 網頁建置</div>
                  <div class="mt-1">nodejs api建置及CRUD作業</div>
                  <div class="mt-1">flutter APP開發</div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section_personal" class="position-relative">
        <Bg></Bg>
        <div class="position-relative">
          <div class="title-sticky">
            <div class="container">
              <div class="px-1 pt-3 pb-1">
                <h3>個人作品</h3>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="mt-4">
              <div class="row">
                <div class="col-md-6 col-lg-4 col-xl-4" v-for="item in personal_list" :key="item.id">
                  <Card
                    :title="item.title"
                    :content="item.content"
                    :img_url="item.img_url"
                    :code_url="item.code_url"
                    :demo_url="item.demo_url"
                    img_align="center center"
                  ></Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section_F2E" class="position-relative">
        <div id="section_F2E_bg"></div>
        <div class="container position-relative">
          <div class="panel_L">
            <div class="box">
              <div class="title p-3">
                <h2>前端修練精神時光屋-第二屆</h2>
              </div>
              <div class="p-3">
                <h6>
                  由六角學院與Adobe XD Taiwan社群所舉辦的「
                  <a href="https://challenge.thef2e.com/" target="_blank" rel="nofollow noopener noreferrer"
                    >The F2E - 第二屆 前端 & UI 修練精神時光屋</a
                  >」
                </h6>
                <h6>
                  一週挑戰一個修練主題，總計九週 (2019/7/4-2019/9/9)，可挑選「前端工程師」、「UI 設計師」的挑戰方向。<br />(2020年2月添加第十關)
                </h6>
                <h6 class="my-4">
                  <a
                    class="btn btn-sm btn-outline-primary"
                    role="button"
                    href="https://challenge.thef2e.com/user/2241"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    >活動網站的作品</a
                  >
                </h6>
              </div>
            </div>
          </div>
          <div class="panel_R">
            <div class="py-4">
              <div class="row">
                <div class="col-12 col-md-6 col-lg-12" v-for="item in F2E_list" :key="item.id">
                  <Card01
                    :title="item.title"
                    :content="item.content"
                    :img_url="item.img_url"
                    :code_url="item.code_url"
                    :demo_url="item.demo_url"
                  ></Card01>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="position-relative">
        <div class="info d-flex align-items-end">
          <div class="container p-3">
            <div class="text-center d-flex justify-content-center align-items-center">
              <div class="name">
                <i class="material-icons align-middle">person</i>
                <a class="align-middle">阿偉</a>
              </div>
              <div class="email ml-2">
                <i class="material-icons align-middle">email</i>
                <a class="align-middle" href="mailto:flashmx29403229@gmail.com">flashmx29403229@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <!-- <div class="side"></div> -->
    </div>
  </div>
</template>
<script>
import img_logo from "@img/logo.png";

import Axios from "axios";
import Bg from "@vue/components/Bg";
import Card from "@vue/components/Card";
import Card01 from "@vue/components/Card01";
export default {
  name: "theme02",
  components: { Card, Bg, Card01 },
  data() {
    return {
      F2E_list: [],
      personal_list: [],
      img_logo: img_logo,
    };
  },
  mounted() {
    Axios.get("dataList", { data: { filters: { tags: "F2E" } } }).then((response) => {
      this.F2E_list = response.data;
    });
    Axios.get("dataList", { data: { filters: { tags: "personal" } } }).then((response) => {
      this.personal_list = response.data;
    });
    /*.catch((error) => {
        throw new Error(error);
      });*/
  },
};
</script>
<!--<style scoped></style>-->
<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap");
* {
  font-family: "Noto Sans TC", var(--font-family-sans-serif);
}
body {
  /*overflow-x: hidden;*/
}
[v-cloak] {
  display: none;
}
.wrap {
  position: relative;
  /*background: url(https://cdn.jsdelivr.net/gh/frontendsophie/hexo-theme-autumn@1.0.0/source/img/button-bg.png)
    #f3f3f3;*/
}
.content {
  /* display: none; */
}
/*section {
  position: relative;
}*/

.side {
  position: absolute;
  display: block;
  width: 100px;
  height: 100%;
  background-color: #eee;
  right: 0px;
  top: 0px;
}

.navbar {
  background-image: url(~@img/navbar_bg.png);
  background-size: 300px;
  background-position: center top;
  /* backdrop-filter: saturate(180%) blur(5px); */
}
.info {
  min-height: 80px;
  /*background-color: #e0e5eb;
  border-top: 1px solid #cdd3da;*/
  background-color: rgba(255, 255, 255, 0.75);
  border-top: 1px solid #e3e8ec;
  color: #505050;
  font-size: 0.9rem;
}
.info i {
  font-size: 0.95rem;
}
.info a {
  color: #505050;
  text-decoration: none;
}
.info a[href]:hover {
  color: #2373a1;
  text-decoration: underline;
}
.title {
  text-shadow: 1px 3px 5px #00000033;
}
.title-sticky {
  position: sticky;
  top: 56px;
  z-index: 1;
  /* background-color: rgba(255, 255, 255, 0.2); */
  /* text-shadow: 0px 0px 5px #fff; */
  font-weight: bold;
  letter-spacing: 0.1em;
  background-image: linear-gradient(180deg, #fffffff7 0%, #ffffff99 50%, #ffffff00 100%);
  padding-bottom: 30px;
  border-top: 1px solid #bfcde7;
  backdrop-filter: blur(1px);
  text-shadow: 1px 3px 5px #00000033;
}
.table-title {
  white-space: nowrap;
  /* padding-right: 1em; */
  text-align: right;
}
.table-content {
  /* color: #81a5b9; */
  font-size: 14px;
}
.word {
  letter-spacing: 0.1em;
}
.myIcon {
  background-image: url("~@img/myIcon.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #000;
  width: 200px;
  height: 200px;
  border-radius: 200px;
  border: 1px solid #ccc;
}
table td {
  text-align: left;
  vertical-align: initial;
}
/* #section_personal .title-sticky {
  color: #760c9b;
} */
#section_F2E {
  /*background-color: #dee3e8;*/
  /* background-image: linear-gradient(
    145deg,
    #e2d04f,
    #e8c229,
    #ea9945
  ); */
  /*background-image: linear-gradient(180deg, #c8c8c8 15%, #f7c129 85%);*/
  /* background-image: linear-gradient(
    165deg,
    hsl(283, 80%, 51%),
    hsl(24, 80%, 52%),
    hsl(98, 87%, 58%)
  ); */
  /*background-image: linear-gradient(
    165deg,
    #ff4284,
    #fed430,
    #8c9a65,
    #eed38a,
    #5e99dd
  );*/
}
#section_F2E_bg {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  /*background-color: rgba(243, 108, 54, 0.5);*/
}
#section_F2E_bg::before {
  content: "";
  position: sticky;
  width: 100%;
  height: 100vh;
  top: 56px;
  display: block;
  background-image: url(~@img/sky.jpeg);
  background-size: cover;
  background-position: center;
}
@media (min-width: 576px) {
}
@media (min-width: 768px) {
}
@media (min-width: 992px) {
  .panel_L {
    position: sticky;
    top: 56px;
    height: 100vh;
    width: 50%;
  }
  .panel_R {
    width: 50%;
    margin-top: -100vh;
    margin-left: 50%;
  }
  .box {
    position: absolute;
    display: block;
    top: 50%;
    transform: translateY(-50%);
    padding-right: 60px;
  }
}
@media (min-width: 1200px) {
  .panel_L {
    width: 60%;
  }
  .panel_R {
    width: 40%;
    margin-left: 60%;
  }
  .box {
    padding-right: 160px;
  }
}
</style>
