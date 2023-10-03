<template>
  <div class="card mb-4 shadow-sm">
    <div
      class="img card-img-top"
      :style="{
        backgroundImage: 'url(' + img_url + ')',
        backgroundPosition: img_align,
      }"
    ></div>
    <div class="card-body">
      <h6 class="card-title text-center">{{ title }}</h6>
      <p class="card-text text-center">{{ content }}</p>
      <div class="d-flex justify-content-start">
        <!-- <div class="btn-group" role="group" aria-label="Basic example"> -->
        <a
          v-if="code_url"
          class="flex-fill btn btn-sm btn-secondary mr-2 min-w-50"
          role="button"
          :href="code_url"
          target="_blank"
          rel="nofollow noopener noreferrer"
          >檢視程式碼</a
        >
        <a
          v-if="demo_url"
          class="flex-fill btn btn-sm btn-success min-w-50"
          role="button"
          :href="demo_url"
          target="_blank"
          rel="nofollow noopener noreferrer"
          >觀看</a
        >
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "card",
  props: {
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    img_url: { type: String, default: "" },
    code_url: { type: String, default: "" },
    demo_url: { type: String, default: "" },
    img_align: { type: String, default: "left center" },
  },
};
</script>
<style scoped>
.img {
  display: block;
  padding-bottom: 52%;
  background-color: #ddd;
  background-size: cover;
}
.card-text {
  min-height: 2em;
  font-size: 12px;
  color: #81a5b9;
  margin-bottom: 0.5rem;
}
@media (min-width: 576px) {
}
@media (min-width: 768px) {
  .img {
    padding-bottom: 52%;
  }
}
@media (min-width: 992px) {
  .img {
    padding-bottom: 65%;
  }
}
@media (min-width: 1200px) {
  .img {
    padding-bottom: 70%;
  }
}
</style>
