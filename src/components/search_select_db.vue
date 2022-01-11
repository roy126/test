<template>
  <div class="select__student__db">
    <div class="input__div">
      <input type="text" v-model="search_value" :readonly="selected_student" />
      <i
        v-if="selected_student"
        @click="func_clear_input"
        class="fa fa-times"
        aria-hidden="true"
      ></i>
    </div>
    <div class="list_result" v-if="this.search.length > 0 && !selected_student">
      <p v-if="result.length === 0 && this.search.length > 0">
        Ничего не найдено
      </p>
      <div v-if="result.length > 0">
        <div
          class="item__result"
          v-for="item in result"
          :key="item.id"
          @click="func_select(item)"
        >
          {{ item.num_ls + " | " + item.FIO }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      result: [],
      selected_student: null,
    };
  },
  methods: {
    func_search() {
      window
        .sendRequestAuth("/search_student", {
          search: this.search,
        })
        .then((result) => {
          if (!result) return;
          this.result = result;
        });
    },
    func_clear_input() {
      this.selected_student = null;
      this.search = "";
      this.result = [];
      this.$emit("selected_student", null);
    },
    func_select(item) {
      if (!item) return;
      this.selected_student = item;
      this.search =
        this.selected_student.num_ls + " | " + this.selected_student.FIO;
      this.result = [];
      this.$emit("selected_student", item.num_ls);
    },
  },
  computed: {
    search_value: {
      get() {
        return this.search;
      },
      set(val) {
        this.search = val;
        if (val === "") {
          this.result = [];
        } else {
          this.func_search();
        }
      },
    },
  },
};
</script>

<style></style>
