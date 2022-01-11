<template>
  <div class="modal__resetpass">
    <div class="title">Изменить пароль</div>
    <div class="close" @click="func_close_modal">
      <i class="fa fa-window-close" aria-hidden="true"></i>
    </div>
    <div class="resetpass__wrapper">
      <form @submit.prevent="func_reset_pass">
        <div class="form__group">
          <label>Введите текущий пароль</label>
          <input type="password" required v-model="password_old" />
        </div>
        <div class="form__group">
          <label>Введите новый пароль</label>
          <input type="password" required v-model="password_new" />
        </div>
        <div class="form__group">
          <label>Введите новый пароль еще раз</label>
          <input type="password" required v-model="password_new2" />
        </div>
        <button>Изменить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password_old: "",
      password_new: "",
      password_new2: "",
    };
  },
  methods: {
    func_close_modal() {
      this.$store.commit("CHANGE_MODAL");
      this.$store.commit("CHANGE_MODAL_ID", 0);
    },
    func_reset_pass() {
      if (this.password_old && this.password_new && this.password_new2) {
        if (this.password_new === this.password_new2) {
          window
            .sendRequestAuth("/reset_pass", {
              password_new: this.password_new,
              password_old: this.password_old,
            })
            .then((result) => {
              if (result.success) {
                this.$notify({
                  group: "foo",
                  title: "Информация",
                  text: result.msg,
                  type: "info",
                });
                this.func_close_modal();
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
            text: "Пароли не совпадают",
            type: "error",
          });
        }
      } else {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Заполните все поля",
          type: "error",
        });
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
