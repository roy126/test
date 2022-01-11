<template>
  <div class="otchet__order__wrapper">
    <h3>Отчет по заказам питания</h3>
    <form @submit.prevent="func_get_data">
      <div class="form__group">
        <label>Школа</label>
        <v-select label="school" :options="schools" v-model="school_value" />
      </div>
      <div class="form__group">
        <label>Дата</label>
        <input type="date" required v-model="date" />
      </div>
      <button class="send">Сформировать отчет</button>
    </form>
    <div class="table__result" v-if="data.length > 0">
      <table class="order__food_otchet" border="1">
        <thead>
          <tr class="first__row">
            <th rowspan="2">Дата заказа</th>
            <th rowspan="2">Школа</th>
            <th rowspan="2">Класс</th>

            <th colspan="2">Бесплатное питание (1-4 классы)</th>
            <th colspan="3">Платное питание</th>
            <th rowspan="2">Льготное питание</th>
            <th colspan="2">Льготное питание + доплата</th>
          </tr>
          <tr class="last__row">
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
          <tr v-for="item in data" :key="item.id">
            <td>
              {{
                new Date(item.datetime).toLocaleDateString() +
                " " +
                new Date(item.datetime).toLocaleTimeString()
              }}
            </td>
            <td style="color: black">{{ item.school }}</td>
            <td>{{ item.class }}</td>

            <td class="color1">
              <span>{{ item.bp }}</span>
            </td>
            <td class="color1">
              <span>{{ item.bpO }}</span>
            </td>
            <td class="color2">
              <span>{{ item.priznak }}</span>
            </td>
            <td class="color2">
              <span>{{ item.priznakO }}</span>
            </td>
            <td class="color2">
              <span>{{ item.priznakP }}</span>
            </td>
            <td>
              <span>{{ item.lgfood }}</span>
            </td>
            <td class="color3">
              <span>{{ item.lgzav }}</span>
            </td>
            <td class="color3">
              <span>{{ item.lgob }}</span>
            </td>
          </tr>
          <tr>
            <th>Итого:</th>
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
    <div class="table__clear" v-if="data.length === 0 && progress === false">
      Ничего не найдено
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      data: [],
      citys: [],
      schools: [],
      city_value: null,
      school_value: null,
      progress: true,
    };
  },
  methods: {
    func_get_data() {
      if (!this.school_value || !this.date) {
        this.$notify({
          group: "foo",
          title: "Ошибка",
          text: "Заполните поля",
          type: "error",
        });
        return;
      }
      let param = {
        school: this.school_value.school,
        date: this.date,
      };
      window.sendRequestAuth("/get_otchet", param).then((result) => {
        if (!result) return;
        console.log(result);
        this.data = result;
      });
    },
    func_get_options() {
      window.sendRequestAuth("/get_otchet_options", {}).then((result) => {
        if (!result) return;
        this.citys = result.citys;
        this.schools = result.schools;
      });
    },
    func_get_summ(num) {
      let result = 0;
      this.data.forEach(function (item) {
        if (num === 1) result += Number(item.bp || 0);
        if (num === 2) result += Number(item.bpO || 0);
        if (num === 3) result += Number(item.priznak || 0);
        if (num === 4) result += Number(item.priznakO || 0);
        if (num === 5) result += Number(item.priznakP || 0);
        if (num === 6) result += Number(item.lgfood || 0);
        if (num === 7) result += Number(item.lgzav || 0);
        if (num === 8) result += Number(item.lgob || 0);
      });

      return result;
    },
  },
  mounted() {
    this.func_get_options();
  },
};
</script>

<style></style>
