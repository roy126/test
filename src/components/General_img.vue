<template>
  <div class="general__img__wrapper">
    <img :src="image_src" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: false,
      image_src: "",
    };
  },
  methods: {
    get_image() {
      window.sendRequest("/get_general_img", {}).then((result) => {
        if (result) {
          this.progress = false;
          this.image_src = "/img/general_img/" + result;
        }
      });
    },
  },
  mounted() {
    this.get_image();
  },
};
</script>

<style></style>
