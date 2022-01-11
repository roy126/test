<template>
  <div class="header__main">
    <div class="header__container">
      <div class="auth_buttons" v-if="AUTH_STATE">
        <button class="auth" @click="func_show_user">
          {{ USER_STATE.login }}
        </button>
        <button class="auth_exit" @click="func_exit_user">Выход</button>
      </div>
      <div class="auth_buttons" v-else>
        <button class="auth" @click="func_show_login">Войти</button>
      </div>

      <div class="search__panel">
        <div class="form__group">
          <transition name="search__anim">
            <input
              type="text"
              v-model="search.input"
              placeholder="Найти..."
              v-show="search.status"
            />
          </transition>
          <button class="search__icon" @click="this.func_search">
            <i class="fa fa-search"></i>
          </button>
        </div>
        <div class="popup__notify__wrapper" ref="popup__notify__wrapper"></div>
        <div class="notify__block">
          <button
            class="notify_icon"
            v-if="AUTH_STATE"
            @click="notify.show = !notify.show"
          >
            <i
              class="fa fa-bell"
              aria-hidden="true"
              v-if="NOTIFY_STATE.length > 0"
            ></i>
            <i
              class="fa fa-bell-o"
              aria-hidden="true"
              v-if="NOTIFY_STATE.length === 0"
            ></i>
            <span v-show="NOTIFY_LENGTH_STATE > 0">{{
              NOTIFY_LENGTH_STATE
            }}</span>
          </button>

          <div
            class="popup__notify"
            v-if="notify.show && NOTIFY_STATE.length > 0"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: {
        input: "",
        status: false,
      },
      notify: {
        show: false,
      },
    };
  },
  methods: {
    func_search() {
      if (this.search.status) {
        this.search.status = false;
      } else {
        this.search.status = true;
      }
    },
    func_exit_user() {
      localStorage.removeItem("api_key");
      this.$store.commit("CHANGE_USER", null);
      this.$store.commit("CHANGE_AUTH", false);
      if (window.location.pathname !== "/") this.$router.push("/");
    },
    func_show_login() {
      this.$store.commit("CHANGE_MODAL");
      this.$store.commit("CHANGE_MODAL_ID", 1);
    },
    func_show_user() {
      if (this.$router.currentRoute.path !== "/user")
        this.$router.push("/user");
    },
  },
  computed: {
    ...mapGetters(["AUTH_STATE"]),
    ...mapGetters(["USER_STATE"]),
    ...mapGetters(["NOTIFY_LENGTH_STATE"]),
    ...mapGetters(["NOTIFY_STATE"]),
  },
};
</script>

<style>
.search__anim-enter {
  opacity: 0;
  transform: translateY(-100%);
}
.search__anim-enter-active {
  transition: all 0.3s ease;
}
.search__anim-enter-to {
  opacity: 1;
  transform: translateY(0%);
}

.search__anim-leave {
  opacity: 1;
  transform: translateY(0%);
}
.search__anim-leave-active {
  transition: all 0.3s ease;
}

.search__anim-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
