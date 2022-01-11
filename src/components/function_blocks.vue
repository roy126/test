<template>
  <div class="function__wrapper" v-if="filter_list.length > 0">
    <h3>Функции</h3>
    <div class="function__container">
      <div
        class="func__item"
        v-for="item in filter_list"
        :key="item.id"
        @click="func_link(item)"
      >
        <i :class="item.icon"></i>
        <p>{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  watch: {
    USER_STATE(val) {
      this.user_type = Number(val.type);
      this.teacher = val.teacher;
    },
  },
  data() {
    return {
      user_type: 0,
      teacher: false,
      func_list: [
        {
          id: 1,
          value: "Добавить льготника",
          icon: "fa fa-user-circle",
          type: 7,
        },
        {
          id: 2,
          value: "Выгрузить отчет учащихся",
          icon: "fa fa-print",
          type: 7,
        },
        {
          id: 3,
          value: "Контроль заказов питания",
          icon: "fa fa-pie-chart",
          type: 7,
        },
        {
          id: 4,
          value: "Отчет по заказам питания",
          icon: "fa fa-file-text-o",
          type: 4,
        },
        {
          id: 5,
          value: "Заказать питание",
          icon: "fa fa-cutlery",
          teacher: true,
        },
      ],
    };
  },
  methods: {
    func_link(item) {
      if (!item) return;
      this.$router.push("/functions/" + item.id);
    },
  },
  mounted() {
    if (this.USER_STATE) {
      this.user_type = Number(this.USER_STATE.type);
      this.teacher = this.USER_STATE.teacher;
    }
  },
  computed: {
    ...mapGetters(["USER_STATE"]),
    filter_list: {
      get() {
        let type = Number(this.user_type);
        if (type === 7 || type === 4) {
          return this.func_list.filter((x) => x.type === type);
        } else if (type === 5) {
          return this.func_list;
        } else if (this.teacher) {
          return this.func_list.filter((x) => x.teacher === this.teacher);
        } else {
          return [];
        }
      },
    },
  },
};
</script>

<style></style>
