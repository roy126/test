<template>
  <div class="instruct__wrapper">
    <h4 class="title">Инструкции</h4>
    <div class="instruction__images">
      <img
        :src="
          require('@/assets/img/instructions/изображение_viber_2021-12-22_10-42-58-596.jpg')
        "
        alt=""
      />
      <img
        :src="
          require('@/assets/img/instructions/изображение_viber_2021-12-22_10-42-57-967.jpg')
        "
        alt=""
      />
      <img
        :src="
          require('@/assets/img/instructions/изображение_viber_2021-12-22_10-42-56-290.jpg')
        "
        alt=""
      />
      <img
        :src="
          require('@/assets/img/instructions/изображение_viber_2021-12-22_10-42-57-248.jpg')
        "
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        require("@/assets/img/instructions/изображение_viber_2021-12-22_10-42-58-596.jpg"),
        require("@/assets/img/instructions/изображение_viber_2021-12-22_10-42-57-967.jpg"),
        require("@/assets/img/instructions/изображение_viber_2021-12-22_10-42-56-290.jpg"),
        require("@/assets/img/instructions/изображение_viber_2021-12-22_10-42-57-248.jpg"),
      ],
    };
  },
};
</script>

<style></style>
