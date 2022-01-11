<template>
  <div class="otchet__student__wrapper">
    <h3>Отчет учащихся</h3>
    <form @submit.prevent="func_get_data">
      <div class="form__group">
        <label>Школа</label>
        <v-select
          label="school"
          :options="school_list"
          v-model="school_value"
          @option:selecting="func_get_class_list"
        />
      </div>
      <div class="form__group">
        <label>Класс</label>
        <v-select label="class" :options="class_list" v-model="class_value" />
      </div>
      <button class="send__btn">Сформировать отчет</button>
    </form>
    <table v-if="otchet_list.length > 0">
      <thead>
        <tr>
          <th>№ПП</th>
          <th>Лиц счет</th>
          <th>Признак льготы</th>
          <th>Город</th>
          <th>Школа</th>
          <th>Класс</th>
          <th>ФИО ученика</th>
          <th>Активен</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in otchet_list" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.num_ls }}</td>
          <td>
            {{ item.LGOTA ? (Number(item.LGOTA) === 1 ? "Льгота" : "") : "" }}
          </td>
          <td>{{ item.city }}</td>
          <td>{{ item.num_school }}</td>
          <td>{{ item.num_class }}</td>
          <td>{{ item.FIO }}</td>
          <td>
            {{
              item.active ? (Number(item.active) === 1 ? "Активен" : "") : ""
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      school_value: "",
      class_value: "",
      school_list: [],
      class_list: [],
      otchet_list: [],
    };
  },
  methods: {
    func_get_school_list() {
      window.sendRequestAuth("/get_school_list", {}).then((result) => {
        if (!result) return;
        this.school_list = result;
      });
    },
    func_get_data() {
      if (this.school_value) {
        window
          .sendRequestAuth("/get_otchet_student", {
            school: this.school_value.school,
            class: this.class_value ? this.class_value.class : "",
          })
          .then((result) => {
            if (!result) return;
            this.otchet_list = result;
          });
      } else {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Заполните поле 'Школа'",
          type: "error",
        });
      }
    },
    func_get_class_list(item) {
      this.school_value = item;
      window
        .sendRequestAuth("/get_class_list", {
          school: this.school_value.school,
        })
        .then((result) => {
          if (!result) return;
          this.class_list = result;
        });
    },
  },
  mounted() {
    this.func_get_school_list();
  },
};
</script>

<style></style>
