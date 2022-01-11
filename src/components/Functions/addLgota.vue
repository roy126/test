<template>
  <div class="add__lgota__wrapper">
    <h3>
      {{ selected_lgota ? "Редактировать льготника" : "Добавить льготника" }}
      <i
        v-if="selected_lgota"
        @click="selected_lgota = null"
        class="fa fa-times"
        aria-hidden="true"
      ></i>
    </h3>

    <form @submit.prevent="func_add_lgota" v-if="!selected_lgota">
      <div class="form__group">
        <label>Номер лицевого счета</label>
        <SearchSelectDb @selected_student="func_selected_student" />
      </div>
      <div class="form__group">
        <label>Дата начала</label>
        <input type="date" required v-model="new_lgota.date_begin" />
      </div>
      <div class="form__group">
        <label>Дата завершения</label>
        <input type="date" required v-model="new_lgota.date_end" />
      </div>
      <button>Добавить</button>
    </form>

    <form @submit.prevent="func_add_lgota" v-else>
      <div class="form__group">
        <label>Номер лицевого счета</label>
        <input
          type="text"
          class="num_ls"
          readonly
          :value="selected_lgota.num_ls"
        />
      </div>
      <div class="form__group">
        <label>Дата начала</label>
        <input type="date" required v-model="selected_lgota.date_begin" />
      </div>
      <div class="form__group">
        <label>Дата завершения</label>
        <input type="date" required v-model="selected_lgota.date_end" />
      </div>
      <button>Обновить</button>
    </form>

    <div class="lgota__list">
      <h3>Список льготников</h3>
      <div class="search__block">
        <input type="text" v-model="search_computed" placeholder="Найти" />
        <i class="fa fa-search" aria-hidden="true" @click="func_get_list"></i>
      </div>
      <table>
        <thead>
          <tr>
            <th>№ лицевого счета</th>
            <th>Дата начала</th>
            <th>Дата завершения</th>
            <th>Пользователь</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lgota_list" :key="item.id">
            <td>{{ item.num_ls }}</td>
            <td>{{ new Date(item.date_begin).toLocaleDateString() }}</td>
            <td>{{ new Date(item.date_end).toLocaleDateString() }}</td>
            <td>{{ item.login }}</td>
            <td>
              <button @click="selected_lgota = item">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
            </td>
            <td>
              <button class="trash" @click="remove_lgota(item)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SearchSelectDb from "@/components/search_select_db.vue";
export default {
  components: {
    SearchSelectDb,
  },
  data() {
    return {
      new_lgota: {
        num_ls: null,
        date_begin: "",
        date_end: "",
      },
      search: "",
      lgota_list: [],
      selected_lgota: null,
    };
  },
  methods: {
    func_selected_student(item) {
      this.new_lgota.num_ls = item;
    },
    func_get_list() {
      window
        .sendRequestAuth("/get_lgota_list", {
          search: this.search,
        })
        .then((result) => {
          if (!result) return;
          this.lgota_list = result;
        });
    },
    func_add_lgota() {
      let param = null;
      if (this.selected_lgota) {
        param = this.selected_lgota;
      } else {
        param = this.new_lgota;
      }
      window.sendRequestAuth("/add_lgota", param).then((result) => {
        if (!result) return;
        if (result.success) {
          if (this.search.length === 0) {
            this.lgota_list.unshift(result.data);
          }
          this.$notify({
            group: "foo",
            title: "Информация",
            text: result.msg,
            type: "info",
          });
        } else {
          this.$notify({
            group: "foo",
            title: "Ошибка",
            text: result.msg,
            type: "error",
          });
        }
      });
    },
    remove_lgota(item) {
      if (!item) return;
      window
        .sendRequestAuth("/remove_lgota", {
          id: item.id,
        })
        .then(() => {
          this.lgota_list.splice(
            this.lgota_list.findIndex((x) => x.id === item.id),
            1
          );
          this.$notify({
            group: "foo",
            title: "Информация",
            text: "Запись удалена",
            type: "info",
          });
        });
    },
  },
  mounted() {
    this.func_get_list();
  },
  computed: {
    search_computed: {
      get() {
        return this.search;
      },
      set(val) {
        this.search = val;
        this.func_get_list();
      },
    },
  },
};
</script>

<style></style>
