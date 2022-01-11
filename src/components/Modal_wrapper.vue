<template>
  <div class="modal__wrapper" v-if="MODAL_STATE">
    <transition name="show_modal">
      <Auth v-if="MODAL_ID_STATE === 1" />
      <Cash v-if="MODAL_ID_STATE === 2" />
      <ResetPass v-if="MODAL_ID_STATE === 3" />
      <AddChild v-if="MODAL_ID_STATE === 4" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Auth from "@/components/Modals/Auth.vue";
import Cash from "@/components/Modals/Cash.vue";
import ResetPass from "@/components/Modals/ResetPass.vue";
import AddChild from "@/components/Modals/AddChild.vue";
export default {
  components: {
    Auth,
    Cash,
    ResetPass,
    AddChild,
  },
  computed: {
    ...mapGetters(["MODAL_STATE"]),
    ...mapGetters(["MODAL_ID_STATE"]),
  },
};
</script>

<style></style>
