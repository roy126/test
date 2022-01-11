<template>
  <div class="order__food__wrapper">
    <h3>Заказать питание</h3>
    <form @submit.prevent="func_get_data" v-if="order_food.length === 0">
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
        <v-select
          label="class"
          :options="class_list"
          v-model="class_value"
          @option:selecting="order_food = []"
        />
      </div>
      <div class="form__group">
        <label>Дата</label>
        <input type="date" required v-model="date" />
      </div>
      <button class="send">Заказать питание</button>
    </form>
    <div class="table__result" v-if="order_food.length > 0">
      <div class="table__header">
        <div class="left">
          <h4>{{ new_order ? "Создание заказа" : "Редактирование заказа" }}</h4>
          <p>Школа: {{ this.school_value.school }}</p>
          <p>Класс: {{ this.class_value.class }}</p>
          <p>Дата: {{ new Date(this.date).toLocaleDateString() }}</p>
        </div>
        <div class="right">
          <button @click="func_clear_order()">Сбросить заказ</button>
        </div>
      </div>

      <table class="order__food">
        <thead>
          <tr class="first__row">
            <th rowspan="3">№ПП</th>
            <th rowspan="3">ФИО учащегося/преподавателя</th>
            <th rowspan="3">Льгота</th>
            <th colspan="2">Бесплатное питание (1-4 классы)</th>
            <th colspan="3">Платное питание</th>
            <th rowspan="2">Льготное питание</th>
            <th colspan="2">Льготное питание + доплата</th>
          </tr>
          <tr>
            <th class="color1">Завтрак</th>
            <th class="color1">Обед</th>
            <th class="color2">Завтрак</th>
            <th class="color2">Обед</th>
            <th class="color2">Полдник</th>
            <th class="color3">Завтрак</th>
            <th class="color3">Обед</th>
          </tr>
          <tr class="last__row">
            <th class="color1">
              <input
                type="checkbox"
                :disabled="
                  !dostup ||
                  Number(class_value.class.toString().replace(/[^0-9]/g, '')) >
                    4
                "
                v-model="select_all_bp"
              />
            </th>
            <th class="color1">
              <input
                type="checkbox"
                :disabled="
                  !dostup ||
                  Number(class_value.class.toString().replace(/[^0-9]/g, '')) >
                    4
                "
                v-model="select_all_bpO"
              />
            </th>
            <th class="color2">
              <input
                type="checkbox"
                v-model="select_all_priznak"
                :disabled="!dostup"
              />
            </th>
            <th class="color2">
              <input
                type="checkbox"
                v-model="select_all_priznakO"
                :disabled="!dostup"
              />
            </th>
            <th class="color2">
              <input
                type="checkbox"
                v-model="select_all_priznakP"
                :disabled="!dostup"
              />
            </th>
            <th class="">
              <input
                type="checkbox"
                v-model="select_all_lg_food"
                :disabled="!dostup"
              />
            </th>
            <th class="color3">
              <input
                type="checkbox"
                v-model="select_all_lg_zav"
                :disabled="!dostup"
              />
            </th>
            <th class="color3">
              <input
                type="checkbox"
                v-model="select_all_lg_ob"
                :disabled="!dostup"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order_food" :key="item.id">
            <td :style="{ background: func_get_color(item) }">
              {{ index + 1 }}
            </td>
            <td>{{ item.FIO }}</td>
            <td>{{ item.LGOTA === "1" ? "Л" : "" }}</td>
            <td class="color1">
              <input
                type="checkbox"
                v-model="item.bp"
                :disabled="
                  !dostup || Number(item.class.replace(/[^0-9]/g, '')) > 4
                "
              />
            </td>
            <td class="color1">
              <input
                type="checkbox"
                v-model="item.bpO"
                :disabled="
                  !dostup || Number(item.class.replace(/[^0-9]/g, '')) > 4
                "
              />
            </td>
            <td class="color2">
              <input
                type="checkbox"
                v-model="item.priznak"
                :disabled="!dostup || Number(item.balance) < 60"
              />
            </td>
            <td class="color2">
              <input
                type="checkbox"
                v-model="item.priznakO"
                :disabled="!dostup || Number(item.balance) < 60"
              />
            </td>
            <td class="color2">
              <input
                type="checkbox"
                v-model="item.priznakP"
                :disabled="!dostup || Number(item.balance) < 60"
              />
            </td>
            <td>
              <input
                type="checkbox"
                v-model="item.lgfood"
                :disabled="!dostup || item.LGOTA !== '1'"
              />
            </td>
            <td class="color3">
              <input
                type="checkbox"
                v-model="item.lgzav"
                :disabled="!dostup || item.LGOTA !== '1'"
              />
            </td>
            <td class="color3">
              <input
                type="checkbox"
                v-model="item.lgob"
                :disabled="!dostup || item.LGOTA !== '1'"
              />
            </td>
          </tr>
          <tr>
            <th></th>
            <th>Итого:</th>
            <th></th>
            <th>{{ func_get_summ(1) }}</th>
            <th>{{ func_get_summ(2) }}</th>
            <th>{{ func_get_summ(3) }}</th>
            <th>{{ func_get_summ(4) }}</th>
            <th>{{ func_get_summ(5) }}</th>
            <th>{{ func_get_summ(6) }}</th>
            <th>{{ func_get_summ(7) }}</th>
            <th>{{ func_get_summ(8) }}</th>
          </tr>
        </tbody>
      </table>
      <button class="order__food_btn" @click="func_save_order">
        {{ new_order ? "Сохранить" : "Изменить" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      school_list: [],
      class_list: [],
      school_value: null,
      class_value: null,
      date: "",
      order_food: [],
      progress: true,
      new_order: true,
      time: "",
      dostup: false,
      selected: {
        bp: false,
        bpO: false,
        priznak: false,
        priznakO: false,
        priznakP: false,
        lg_food: false,
        lg_zav: false,
        lg_ob: false,
      },
    };
  },
  methods: {
    func_clear_order() {
      this.order_food = [];
      this.selected = {
        bp: false,
        bpO: false,
        priznak: false,
        priznakO: false,
        priznakP: false,
        lg_food: false,
        lg_zav: false,
        lg_ob: false,
      };
    },
    func_save_order() {
      if (this.order_food.length === 0) {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Нет данных",
          type: "error",
        });
        return;
      }
      if (!this.dostup) {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Нет доступа",
          type: "error",
        });
        return;
      }
      console.log(this.order_food);
      window
        .sendRequestAuth("/save_order_food", {
          data: JSON.stringify(this.order_food),
          new_order: this.new_order,
          date: this.date,
        })
        .then(() => {
          this.$notify({
            group: "foo",
            title: "Ифнормация",
            text: "Выполнено успешно",
            type: "info",
          });
          this.func_clear_order();
        });
    },
    func_get_school_list() {
      window.sendRequestAuth("/get_school_list_order", {}).then((result) => {
        if (!result) return;
        this.school_list = result;
      });
    },
    func_get_class_list(item) {
      this.school_value = item;
      window
        .sendRequestAuth("/get_class_list_order", {
          school: this.school_value.school,
        })
        .then((result) => {
          if (!result) return;
          this.class_list = result;
        });
    },
    func_get_data() {
      if (this.school_value && this.class_value && this.date) {
        window
          .sendRequestAuth("/get_order_food", {
            school: this.school_value.school,
            class: this.class_value.class,
            date: this.date,
          })
          .then((result) => {
            if (!result) return;
            result.data.forEach(function (item) {
              item.bp = item.bp === "true" ? true : false;
              item.bpO = item.bpO === "true" ? true : false;
              item.priznak = item.priznak === "true" ? true : false;
              item.priznakO = item.priznakO === "true" ? true : false;
              item.priznakP = item.priznakP === "true" ? true : false;
              item.lgfood = item.lgfood === "true" ? true : false;
              item.lgzav = item.lgzav === "true" ? true : false;
              item.lgob = item.lgob === "true" ? true : false;
            });
            this.order_food = result.data;
            this.new_order = result.new;
            this.time = result.time;
            this.func_dostup();
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
    func_get_color(obj) {
      if (!obj) return;
      let balance = Number(obj.balance);
      let color = "";
      if (balance >= 200) {
        color = "green";
      } else if (balance < 200 && balance >= 60) {
        color = "orange";
      } else {
        color = "red";
      }
      return color;
    },
    func_dostup() {
      let time_now = new Date();
      let time_teacher = new Date();
      let str_time = this.time.split(":");
      time_teacher = new Date(time_teacher.setHours(str_time[0]));
      time_teacher.setMinutes(str_time[1]);
      time_teacher.setSeconds(str_time[2]);

      let count_day = this.func_get_count_day_date(time_now, this.date);

      if (count_day < 0) {
        this.dostup = false;
      } else if (count_day === 0) {
        if (new Date(time_teacher) < time_now) {
          this.dostup = false;
        } else {
          this.dostup = true;
        }
      } else {
        this.dostup = true;
      }
    },

    func_get_count_day_date(start, end) {
      let date1 = new Date(start);
      let date2 = new Date(end);
      let oneDay = 1000 * 60 * 60 * 24;
      let diffInTime = date2.getTime() - date1.getTime();
      let diffInDays = Math.round(diffInTime / oneDay);
      return diffInDays;
    },
    func_get_summ(num) {
      let result = 0;

      this.order_food.forEach(function (item) {
        if (num === 1 && item.bp) result++;
        if (num === 2 && item.bpO) result++;
        if (num === 3 && item.priznak) result++;
        if (num === 4 && item.priznakO) result++;
        if (num === 5 && item.priznakP) result++;
        if (num === 6 && item.lgfood) result++;
        if (num === 7 && item.lgzav) result++;
        if (num === 8 && item.lgob) result++;
      });
      return result;
    },
  },
  mounted() {
    this.func_get_school_list();
  },
  computed: {
    select_all_bp: {
      get() {
        return this.selected.bp;
      },
      set(value) {
        this.selected.bp = value;
        this.order_food.forEach(function (item) {
          if (Number(item.class.replace(/[^0-9]/g, "")) <= 4) {
            item.bp = value;
          }
        });
      },
    },
    select_all_bpO: {
      get() {
        return this.selected.bpO;
      },
      set(value) {
        this.selected.bpO = value;
        this.order_food.forEach(function (item) {
          if (Number(item.class.replace(/[^0-9]/g, "")) <= 4) {
            item.bpO = value;
          }
        });
      },
    },
    select_all_priznak: {
      get() {
        return this.selected.priznak;
      },
      set(value) {
        this.selected.priznak = value;
        this.order_food.forEach(function (item) {
          if (item.balance < 60) {
            item.priznak = false;
          } else {
            item.priznak = value;
          }
        });
      },
    },
    select_all_priznakO: {
      get() {
        return this.selected.priznakO;
      },
      set(value) {
        this.selected.priznakO = value;
        this.order_food.forEach(function (item) {
          if (item.balance < 60) {
            item.priznakO = false;
          } else {
            item.priznakO = value;
          }
        });
      },
    },
    select_all_priznakP: {
      get() {
        return this.selected.priznakP;
      },
      set(value) {
        this.selected.priznakP = value;
        this.order_food.forEach(function (item) {
          if (item.balance < 60) {
            item.priznakP = false;
          } else {
            item.priznakP = value;
          }
        });
      },
    },
    select_all_lg_food: {
      get() {
        return this.selected.lg_food;
      },
      set(value) {
        this.selected.lgfood = value;
        this.order_food.forEach(function (item) {
          if (!!Number(item.LGOTA) === false) {
            item.lgfood = false;
          } else {
            item.lgfood = value;
          }
        });
      },
    },
    select_all_lg_zav: {
      get() {
        return this.selected.lg_zav;
      },
      set(value) {
        this.selected.lgzav = value;
        this.order_food.forEach(function (item) {
          if (!!Number(item.LGOTA) === false) {
            item.lgzav = false;
          } else {
            item.lgzav = value;
          }
        });
      },
    },
    select_all_lg_ob: {
      get() {
        return this.selected.lg_ob;
      },
      set(value) {
        this.selected.lg_ob = value;
        this.order_food.forEach(function (item) {
          if (!!Number(item.LGOTA) === false) {
            item.lgob = false;
          } else {
            item.lgob = value;
          }
        });
      },
    },
  },
};
</script>

<style></style>
