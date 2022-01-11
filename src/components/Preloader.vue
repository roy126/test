<template>
  <div>
    <transition name="slip_preloader">
      <div class="preloader" v-show="PRELOADER_STATE">
        <img src="../assets/img/logo_png_160px.png" alt />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["PRELOADER_STATE"]),
  },
  methods: {
    func_hide_preloader() {
      setTimeout(() => {
        this.$store.commit("CHANGE_PRELOADER", false);
      }, 2000);
    },
  },
  mounted() {
    this.func_hide_preloader();
  },
};
</script>

<style></style>
