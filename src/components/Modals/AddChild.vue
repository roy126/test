<template>
  <div class="add__child__wrapper">
    <div class="title">Добавить ребенка</div>
    <div class="close" @click="func_close_modal">
      <i class="fa fa-window-close" aria-hidden="true"></i>
    </div>
    <div class="add__child__content">
      <form @submit.prevent="func_save_child">
        <div class="form__group">
          <label>ФИО ребенка</label>
          <input type="text" required v-model="new_child.fio" />
        </div>
        <div class="form__group">
          <label>Номер лицевого счета</label>
          <input type="text" required v-model="new_child.num_ls" />
        </div>
        <button>Добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      new_child: {
        fio: "",
        num_ls: "",
      },
    };
  },
  methods: {
    func_close_modal() {
      this.$store.commit("CHANGE_MODAL");
      this.$store.commit("CHANGE_MODAL_ID", 0);
    },
    func_save_child() {
      let child = this.new_child;
      if (child.fio && child.num_ls) {
        window
          .sendRequestAuth("/add_child", {
            fio: child.fio,
            num_ls: child.num_ls,
          })
          .then((result) => {
            if (!result) return;
            if (result.success) {
              this.$notify({
                group: "foo",
                title: "Информация",
                text: result.msg,
                type: "info",
              });
              this.new_child.fio = this.new_child.num_ls = "";
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
          });
      } else {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Заполните поля",
          type: "error",
        });
      }
    },
  },
};
</script>

<style></style>
