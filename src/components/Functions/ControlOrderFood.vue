<template>
  <div class="control__order__food__wrapper">
    <h3>Контроль заказов питания</h3>
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
      <button class="send">Сформировать отчет</button>
    </form>
    <div class="table__result" v-if="order_food.length > 0">
      <table class="order__food" border="1">
        <thead>
          <tr>
            <th rowspan="2">№ПП</th>
            <th rowspan="2">Логин</th>
            <th rowspan="2">Дата заказа</th>
            <th rowspan="2">Город</th>
            <th rowspan="2">Школа</th>
            <th rowspan="2">Класс</th>

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
        </thead>
        <tbody>
          <tr v-for="(item, index) in order_food" :key="item.id">
            <td :style="{ background: func_get_color(item) }">
              {{ index + 1 }}
            </td>
            <td>{{ item.login }}</td>
            <td>
              {{
                new Date(item.datetime).toLocaleDateString() +
                " " +
                new Date(item.datetime).toLocaleTimeString()
              }}
            </td>
            <td>{{ item.city }}</td>
            <td>{{ item.school }}</td>
            <td>{{ item.class }}</td>

            <td class="color1">
              <input
                type="checkbox"
                v-model="item.bp"
                disabled
                v-if="class_value"
              />
              <span v-else>{{ item.bp }}</span>
            </td>
            <td class="color1">
              <input
                type="checkbox"
                v-model="item.bpO"
                disabled
                v-if="class_value"
              />
              <span v-else>{{ item.bpO }}</span>
            </td>
            <td class="color2">
              <input
                type="checkbox"
                v-model="item.priznak"
                disabled
                v-if="class_value"
              />
              <span v-else>{{ item.priznak }}</span>
            </td>
            <td class="color2">
              <input
                type="checkbox"
                v-model="item.priznakO"
                disabled
                v-if="class_value"
              />
              <span v-else>{{ item.priznakO }}</span>
            </td>
            <td class="color2">
              <input
                type="checkbox"
                v-model="item.priznakP"
                disabled
                v-if="class_value"
              />
              <span v-else>{{ item.priznakP }}</span>
            </td>
            <td>
              <input
                type="checkbox"
                v-model="item.lgfood"
                disabled
                v-if="class_value"
              />
              <span v-else>{{ item.lgfood }}</span>
            </td>
            <td class="color3">
              <input
                type="checkbox"
                v-model="item.lgzav"
                disabled
                v-if="class_value"
              />
              <span v-else>{{ item.lgzav }}</span>
            </td>
            <td class="color3">
              <input
                type="checkbox"
                v-model="item.lgob"
                disabled
                v-if="class_value"
              />
              <span v-else>{{ item.lgob }}</span>
            </td>
          </tr>
          <tr>
            <th></th>
            <th>Итого:</th>
            <th></th>
            <th></th>
            <th></th>
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
    </div>
    <div
      class="table__clear"
      v-if="order_food.length === 0 && progress === false"
    >
      Ничего не найдено
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
    };
  },
  methods: {
    func_get_school_list() {
      window.sendRequestAuth("/get_school_list", {}).then((result) => {
        if (!result) return;
        this.school_list = result;
      });
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
    func_get_data() {
      if (!this.school_value) {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Выберите школу",
          type: "error",
        });
        return;
      }
      this.progress = true;
      window
        .sendRequestAuth("/get_control_order_food", {
          school: this.school_value.school,
          class: this.class_value ? this.class_value.class : "",
          date: this.date,
        })
        .then((result) => {
          if (!result) return;
          if (this.class_value) {
            result.forEach(function (item) {
              item.bp = item.bp === "true" ? true : false;
              item.bpO = item.bpO === "true" ? true : false;
              item.priznak = item.priznak === "true" ? true : false;
              item.priznakO = item.priznakO === "true" ? true : false;
              item.priznakP = item.priznakP === "true" ? true : false;
              item.lgfood = item.lgfood === "true" ? true : false;
              item.lgzav = item.lgzav === "true" ? true : false;
              item.lgob = item.lgob === "true" ? true : false;
            });
            this.order_food = result;
          } else {
            this.order_food = result;
          }

          this.progress = false;
        });
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
    func_get_summ(num) {
      let result = 0;
      if (this.class_value) {
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
      } else {
        this.order_food.forEach(function (item) {
          if (num === 1) result += Number(item.bp || 0);
          if (num === 2) result += Number(item.bpO || 0);
          if (num === 3) result += Number(item.priznak || 0);
          if (num === 4) result += Number(item.priznakO || 0);
          if (num === 5) result += Number(item.priznakP || 0);
          if (num === 6) result += Number(item.lgfood || 0);
          if (num === 7) result += Number(item.lgzav || 0);
          if (num === 8) result += Number(item.lgob || 0);
        });
      }
      return result;
    },
  },
  mounted() {
    this.func_get_school_list();
  },
};
</script>

<style></style>
