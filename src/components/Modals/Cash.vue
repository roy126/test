<template>
  <div class="modal__cash">
    <div class="title">Перевод средств</div>
    <div class="close" @click="func_close_modal">
      <i class="fa fa-window-close" aria-hidden="true"></i>
    </div>
    <div class="cash__wrapper">
      <div class="form__group">
        <label>Счет списания</label>
        <v-select label="value" :options="students" v-model="student_from" />
      </div>
      <div class="form__group">
        <label>Счет зачисления</label>
        <v-select label="value" :options="students" v-model="student_to" />
      </div>
      <div class="form__group">
        <label>Сумма перевода</label>
        <input type="number" v-model="summ" class="summ_cash" />
      </div>
      <button class="transfer" @click="func_transfer">Перевести</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
      students: [],
      student_from: null,
      student_to: null,
      summ: 1,
    };
  },
  methods: {
    func_close_modal() {
      this.$store.commit("CHANGE_MODAL");
      this.$store.commit("CHANGE_MODAL_ID", 0);
    },
    func_get_data() {
      window.sendRequestAuth("/get_students_pay", {}).then((result) => {
        if (!result) return;
        this.students = result;
      });
    },
    func_transfer() {
      if (this.func_valid_summ() && this.func_valid_ls()) {
        window
          .sendRequestAuth("/transfer_cash", {
            summ: this.summ,
            from: this.student_from.id,
            to: this.student_to.id,
          })
          .then((result) => {
            if (result) {
              if (result.success) {
                this.$notify({
                  group: "foo",
                  title: "Информация",
                  text: result.msg,
                  type: "info",
                });
                this.student_from = null;
                this.student_to = null;
                this.summ = 1;
                this.$store.commit("CHANGE_UPDATE_LK", true);
                setTimeout(() => {
                  this.$store.commit("CHANGE_UPDATE_LK", false);
                }, 1000);
              } else {
                this.$notify({
                  group: "foo",
                  title: "Ошибка",
                  text: result.msg,
                  type: "error",
                });
              }
            }
          });
      }
    },
    func_valid_ls() {
      if (this.student_from && this.student_to) {
        if (this.student_from === this.student_to) {
          this.$notify({
            group: "foo",
            title: "Ошибка",
            text: "Выберите разные счета",
            type: "error",
          });
          return false;
        } else {
          let balance = Number(this.student_from.balance);
          if (balance <= 0) {
            this.$notify({
              group: "foo",
              title: "Ошибка",
              text: "Баланс счета списания не может быть меньше 0",
              type: "error",
            });
            return false;
          }

          if (balance < Number(this.summ)) {
            this.$notify({
              group: "foo",
              title: "Ошибка",
              text: "Баланс счета списания меньше чем сумма перевода",
              type: "error",
            });
            return false;
          }
          return true;
        }
      } else {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Заполните поля для перевода",
          type: "error",
        });
        return false;
      }
    },
    func_valid_summ() {
      let summ = this.summ;
      if (!summ) {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Заполните сумму",
          type: "error",
        });
        return false;
      }
      if (isNaN(Number(summ))) {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Некорректная сумма",
          type: "error",
        });
        return false;
      }
      if (Number(summ) <= 0 || Number(summ) > 5000) {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Сумма перевода должна быть больше 0 и меньше 5000",
          type: "error",
        });
        return false;
      }
      return true;
    },
  },
  mounted() {
    this.func_get_data();
  },
};
</script>

<style></style>
