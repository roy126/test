<template>
  <div class="modal__auth">
    <div class="title">{{ func_get_title() }}</div>
    <div class="close" @click="func_close_modal">
      <i class="fa fa-window-close" aria-hidden="true"></i>
    </div>
    <form @submit.prevent="func_auth" v-if="show_num === 1">
      <div class="form__group">
        <label>Логин</label>
        <input type="text" required v-model="login" />
      </div>
      <div class="form__group">
        <label>Пароль</label>
        <input type="password" required v-model="password" />
      </div>
      <button>Войти</button>
    </form>

    <form @submit.prevent="func_register" v-if="show_num === 2">
      <div class="form__group">
        <label>Логин</label>
        <input type="text" required v-model="register.login" />
      </div>
      <div class="form__group">
        <label>Пароль</label>
        <input type="password" required v-model="register.password" />
      </div>
      <div class="form__group">
        <label>Имя</label>
        <input type="text" required v-model="register.name" />
      </div>
      <div class="form__group">
        <label>Фамилия</label>
        <input type="text" required v-model="register.surname" />
      </div>
      <div class="form__group">
        <label>E-mail</label>
        <input type="email" required v-model="register.email" />
      </div>
      <div class="form__group">
        <label>ФИО ребенка с заглавных букв через пробелы</label>
        <input type="text" required v-model="register.fio" />
      </div>
      <div class="form__group">
        <label>Лицевой счет ребенка...код карты без пробелов</label>
        <input type="text" required v-model="register.num_ls" />
      </div>
      <button>Регистрация</button>
    </form>
    <form @submit.prevent="func_resetpass" v-if="show_num === 3">
      <div class="form__group" v-if="resetpass_num === 1">
        <label>E-mail</label>
        <input type="email" required v-model="resetpass.email" />
      </div>
      <div class="form__group" v-if="resetpass_num === 2">
        <label>Код</label>
        <input type="text" required v-model="resetpass.code" />
      </div>
      <div class="form__group" v-if="resetpass_num === 3">
        <label>Новый пароль</label>
        <input type="password" required v-model="resetpass.password" />
      </div>
      <button>{{ func_get_name_btn_resetpass() }}</button>
    </form>

    <div class="links">
      <a class="btn_auth_dop" @click="show_num = 1" v-show="show_num !== 1"
        >Войти</a
      >
      <a class="btn_auth_dop" @click="show_num = 2" v-show="show_num !== 2"
        >Зарегистрироваться</a
      >
      <a class="btn_auth_dop" @click="show_num = 3" v-show="show_num !== 3"
        >Забыли пароль</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
      show_num: 1,
      register: {
        login: "",
        password: "",
        name: "",
        surname: "",
        email: "",
        fio: "",
        num_ls: "",
      },
      resetpass_num: 1,
      resetpass: {
        email: "",
        code: "",
        password: "",
      },
    };
  },
  methods: {
    func_auth() {
      if (this.login && this.password) {
        window
          .sendRequest("/auth", { login: this.login, password: this.password })
          .then((result) => {
            if (!result) return;

            this.$notify({
              group: "foo",
              title: result.success ? "Информация" : "Ошибка",
              text: result.msg,
              type: result.success ? "info" : "error",
            });
            if (result.success) {
              localStorage.setItem("api_key", result.data.api_key);
              this.$store.commit("CHANGE_USER", result.data);
              this.$store.commit("CHANGE_AUTH", true);
              this.login = this.password = "";
              this.func_close_modal();
              this.$router.push("/user");
            }
          });
      } else {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Заполните все поля",
          type: "error",
        });
      }
    },
    func_register() {
      if (
        this.register.login &&
        this.register.password &&
        this.register.email &&
        this.register.name &&
        this.register.surname &&
        this.register.fio &&
        this.register.num_ls
      ) {
        window.sendRequest("/register", this.register).then((result) => {
          if (!result) return;
          if (result.success) {
            this.$notify({
              group: "foo",
              title: "Информация",
              text: result.msg,
              type: "info",
            });
          } else {
            this.$notify({
              group: "foo",
              title: "Ошибка",
              text: result.msg,
              type: "error",
            });
          }
        });
      } else {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Заполните все поля",
          type: "error",
        });
      }
    },
    func_close_modal() {
      this.$store.commit("CHANGE_MODAL");
      this.$store.commit("CHANGE_MODAL_ID", 0);
    },
    func_get_title() {
      if (this.show_num === 1) {
        return "Авторизация";
      } else if (this.show_num === 2) {
        return "Регистрация";
      } else {
        return "Восстановление пароля";
      }
    },
    func_get_name_btn_resetpass() {
      if (this.resetpass_num === 1) {
        return "Получить код";
      } else if (this.show_num === 2) {
        return "Отправить";
      } else {
        return "Изменить";
      }
    },
    func_resetpass() {
      let param = { ...this.resetpass };
      param.type = this.resetpass_num;
      window.sendRequest("/reset_pass", param).then((result) => {
        if (result.success) {
          if (result.end) {
            this.$notify({
              group: "foo",
              title: "Информация",
              text: "Пароль успешно изменен",
              type: "info",
            });
            this.show_num = 1;
            return;
          }
          this.resetpass_num++;
        } else {
          this.$notify({
            group: "foo",
            title: "Ошибка",
            text: result.msg,
            type: "error",
          });
        }
      });
    },
  },
};
</script>

<style></style>
