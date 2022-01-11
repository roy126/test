<template>
  <div>
    <Header />
    <HeaderInfo />
    <Menu @active_page="func_update_active_page" :active_page="active_page" />
    <div class="function__wrapper">
      <div class="container">
        <AddLgota v-if="Number(id) === 1" />
        <OtchetStudent v-if="Number(id) === 2" />
        <ControlOrderFood v-if="Number(id) === 3" />
        <OtchetOrders v-if="Number(id) === 4" />
        <OrderFood v-if="Number(id) === 5" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeaderInfo from "@/components/Header_info.vue";
import Menu from "@/components/Menu.vue";
import Footer from "@/components/Footer.vue";

import AddLgota from "@/components/Functions/addLgota.vue";
import OtchetStudent from "@/components/Functions/otchetStudent.vue";
import ControlOrderFood from "@/components/Functions/ControlOrderFood.vue";
import OtchetOrders from "@/components/Functions/otchetOrders.vue";
import OrderFood from "@/components/Functions/orderFood.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Header,
    HeaderInfo,
    Menu,
    AddLgota,
    OtchetStudent,
    ControlOrderFood,
    OtchetOrders,
    OrderFood,
    Footer,
  },
  props: {
    id: String,
  },
  data() {
    return {
      active_page: 1,
    };
  },
  watch: {
    USER_STATE() {
      this.func_check_user();
    },
  },
  methods: {
    func_update_active_page(value) {
      if (this.$router.currentRoute.path !== "/") {
        this.$router.push({
          name: "main",
          params: {
            view_id: value,
          },
        });
      }
    },
    func_check_user() {
      if (this.$store.state.user) {
        if (Number(this.$store.state.user.type) === 0) {
          if (this.$store.state.user.teacher) {
            if (Number(this.id) !== 5) {
              this.$router.push("/");
            }
          } else {
            this.$router.push("/");
          }
        }
      }
    },
  },
  computed: {
    ...mapGetters(["USER_STATE"]),
  },
  mounted() {
    this.func_check_user();
    this.active_page = 0;
  },
};
</script>

<style></style>
