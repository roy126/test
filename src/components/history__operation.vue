<template>
  <div class="history__wrap">
    <Progress v-show="progress" />
    <table>
      <thead>
        <tr>
          <th>Лиц. счет</th>
          <th>Операция</th>
          <th>Сумма</th>
          <th>Баланс</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in operations" :key="item.id">
          <td>{{ item.num_ls }}</td>
          <td>{{ item.type_movement }}</td>
          <td>
            {{ item.amount.replace(/\r\n/g, "") ? item.amount + " руб" : "" }}
          </td>
          <td v-html="func_get_color(item.pay_old)"></td>
        </tr>
      </tbody>
    </table>
    <button
      class="btn__more"
      @click="func_more"
      v-show="limit + limit * offset < count_all"
    >
      <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
import Progress from "@/components/Progress";
export default {
  components: {
    Progress,
  },
  props: {
    child: Object,
  },
  data() {
    return {
      offset: 0,
      limit: 10,
      operations: [],
      progress: true,
      count_all: 0,
    };
  },
  watch: {
    child() {
      this.offset = 0;
      this.limit = 10;
      this.operations = [];
      this.func_get_data();
    },
  },
  methods: {
    func_get_data() {
      this.progress = true;
      window
        .sendRequestAuth("/get_finance", {
          num_ls: this.child.num_ls,
          limit: this.limit,
          offset: this.offset,
        })
        .then((result) => {
          this.count_all = result.count_all;
          if (result.data) {
            result.data.forEach((element) => {
              this.operations.push(element);
            });
          }
          this.progress = false;
        });
    },
    func_get_color(value) {
      let result = "";
      let color = "";
      value = Number(value.replace(/\r\n/g, ""));

      if (isNaN(value)) {
        return "";
      }

      if (value <= 0) {
        color = "red";
      } else if (value > 0 && value < 200) {
        color = "orange";
      } else {
        color = "green";
      }
      result = value + " руб";

      return '<span style="color:' + color + '">' + result + "</span>";
    },
    func_more() {
      this.offset++;
      this.func_get_data();
    },
  },
  mounted() {
    if (this.child) this.func_get_data();
  },
};
</script>

<style>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
