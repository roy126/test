<template>
  <div class="menu__wrapper">
    <div class="menu__container">
      <div class="nav__button">
        <button @click="mobile_menu = !mobile_menu">
          <i class="fa fa-times" aria-hidden="true" v-if="mobile_menu"></i>
          <i class="fa fa-bars" aria-hidden="true" v-else></i>
        </button>
      </div>
      <ul class="nav" v-show="width_screen > 845 ? true : mobile_menu">
        <li
          v-for="item in nav_list"
          :key="item.id"
          :class="{ active: item.active }"
          @click="func_active_item(item)"
        >
          {{ item.title }}
        </li>
        <button @click="func_show_page_payment()">Пополнить счет</button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active_page: Number,
  },
  data() {
    return {
      mobile_menu: false,
      width_screen: 0,
      nav_list: [
        { id: 1, title: "Новости", active: true },
        { id: 2, title: "О проекте", active: false },
        { id: 3, title: "Меню", active: false },
        { id: 4, title: "Инструкции", active: false },
        { id: 5, title: "Контакты", active: false },
      ],
    };
  },
  watch: {
    active_page(value) {
      this.nav_list.forEach(function (item) {
        if (item.id !== value) {
          item.active = false;
        } else {
          item.active = true;
        }
      });
    },
  },
  methods: {
    func_active_item(obj) {
      this.nav_list.forEach(function (item) {
        if (item.id !== obj.id) {
          item.active = false;
        } else {
          item.active = true;
        }
      });
      this.$emit("active_page", obj.id);
    },
    func_show_page_payment() {
      if (window.location.pathname !== "/payment")
        this.$router.push("/payment");
    },
    func_get_width_screen() {
      this.width_screen = window.screen.width;
    },
    addEvent() {
      window.addEventListener("resize", () => this.func_get_width_screen());
    },
  },
  mounted() {
    this.func_get_width_screen();
    this.addEvent();
  },
};
</script>

<style></style>
