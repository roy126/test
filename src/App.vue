<template>
  <div id="app">
    <Preloader />
    <transition name="show_modal" mode="out-in">
      <Modal />
    </transition>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <notifications group="foo" position="top right" />
  </div>
</template>

<script>
import Preloader from "./components/Preloader.vue";
import Modal from "./components/Modal_wrapper.vue";
export default {
  name: "App",
  components: {
    Preloader,
    Modal,
  },
  mounted() {
    let api_key = localStorage.getItem("api_key");

    if (api_key) {
      window.sendRequestAuth("/get_user_info", {}).then((result) => {
        if (!result) return;
        this.$store.commit("CHANGE_USER", result);
        this.$store.commit("CHANGE_AUTH", true);
      });
    }
  },
};
</script>

<style>
@import "css/style.css";
@import "css/media.css";

.show_modal-enter {
  opacity: 0;
}
.show_modal-enter-active {
  transition: 0.3s;
}
.show_modal-enter-to {
  opacity: 1;
}

.show_modal-leave {
  opacity: 1;
}
.show_modal-leave-active {
  opacity: 1;
  transition: all 0.8s ease;
}

.show_modal-leave-to {
  opacity: 0;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.5s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
