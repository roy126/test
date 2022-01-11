<template>
  <div class="menu__food__wrapper">
    <h4 class="title">Меню</h4>
    <form class="form__menu" @submit.prevent="func_show_menu">
      <div class="form-group">
        <label>Тип питания</label>
        <v-select label="type_menu" :options="types" v-model="type_menu" />
      </div>
      <div class="form-group">
        <label>Школа</label>
        <v-select label="school" :options="schools" v-model="school" />
      </div>
      <div class="but">
        <button>Показать</button>
      </div>
    </form>
    <div class="table" v-if="show_table">
      <div class="block_table">
        <div class="day_week_table" @click="showing.Monday = !showing.Monday">
          Понедельник
          <i
            class="fa fa-chevron-down"
            aria-hidden="true"
            v-if="!showing.Monday"
          ></i>
          <i class="fa fa-chevron-up" aria-hidden="true" v-else></i>
        </div>
        <div class="table__content" v-show="showing.Monday">
          <div class="food_name">Завтрак</div>
          <table>
            <tr>
              <th>Выход (г)</th>
              <th>Наименование блюда</th>
              <th>
                эн. цен. (ккал), белки (г),углеводы (г), витамины (мг),
                микроэлементы (мг)
              </th>
            </tr>
            <tr
              v-for="(zav, index) in menu_list_filter.Monday.zav"
              :key="'M1' + index"
            >
              <td>{{ zav.exit }}</td>
              <td>{{ zav.food }}</td>
              <td>{{ zav.food_value }}</td>
            </tr>
          </table>

          <div class="food_name">Обед</div>
          <table>
            <tr>
              <th>Выход (г)</th>
              <th>Наименование блюда</th>
              <th>
                эн. цен. (ккал), белки (г),углеводы (г), витамины (мг),
                микроэлементы (мг)
              </th>
            </tr>
            <tr
              v-for="(ob, index) in menu_list_filter.Monday.ob"
              :key="'M2' + index"
            >
              <td>{{ ob.exit }}</td>
              <td>{{ ob.food }}</td>
              <td>{{ ob.food_value }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="block_table">
        <div class="day_week_table" @click="showing.Tuesday = !showing.Tuesday">
          Вторник
          <i
            class="fa fa-chevron-down"
            aria-hidden="true"
            v-if="!showing.Tuesday"
          ></i>
          <i class="fa fa-chevron-up" aria-hidden="true" v-else></i>
        </div>
        <div class="table__content" v-show="showing.Tuesday">
          <div class="food_name">Завтрак</div>
          <table>
            <tr>
              <th>Выход (г)</th>
              <th>Наименование блюда</th>
              <th>
                эн. цен. (ккал), белки (г),углеводы (г), витамины (мг),
                микроэлементы (мг)
              </th>
            </tr>

            <tr
              v-for="(zav, index) in menu_list_filter.Tuesday.zav"
              :key="'T1' + index"
            >
              <td>{{ zav.exit }}</td>
              <td>{{ zav.food }}</td>
              <td>{{ zav.food_value }}</td>
            </tr>
          </table>

          <div class="food_name">Обед</div>
          <table>
            <tr>
              <th>Выход (г)</th>
              <th>Наименование блюда</th>
              <th>
                эн. цен. (ккал), белки (г),углеводы (г), витамины (мг),
                микроэлементы (мг)
              </th>
            </tr>
            <tr
              v-for="(ob, index) in menu_list_filter.Tuesday.ob"
              :key="'T2' + index"
            >
              <td>{{ ob.exit }}</td>
              <td>{{ ob.food }}</td>
              <td>{{ ob.food_value }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="block_table">
        <div
          class="day_week_table"
          @click="showing.Wednesday = !showing.Wednesday"
        >
          Среда
          <i
            class="fa fa-chevron-down"
            aria-hidden="true"
            v-if="!showing.Wednesday"
          ></i>
          <i class="fa fa-chevron-up" aria-hidden="true" v-else></i>
        </div>
        <div class="table__content" v-show="showing.Wednesday">
          <div class="food_name">Завтрак</div>
          <table>
            <tr>
              <th>Выход (г)</th>
              <th>Наименование блюда</th>
              <th>
                эн. цен. (ккал), белки (г),углеводы (г), витамины (мг),
                микроэлементы (мг)
              </th>
            </tr>

            <tr
              v-for="(zav, index) in menu_list_filter.Wednesday.zav"
              :key="'W1' + index"
            >
              <td>{{ zav.exit }}</td>
              <td>{{ zav.food }}</td>
              <td>{{ zav.food_value }}</td>
            </tr>
          </table>

          <div class="food_name">Обед</div>
          <table>
            <tr>
              <th>Выход (г)</th>
              <th>Наименование блюда</th>
              <th>
                эн. цен. (ккал), белки (г),углеводы (г), витамины (мг),
                микроэлементы (мг)
              </th>
            </tr>
            <tr
              v-for="(ob, index) in menu_list_filter.Wednesday.ob"
              :key="'W2' + index"
            >
              <td>{{ ob.exit }}</td>
              <td>{{ ob.food }}</td>
              <td>{{ ob.food_value }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="block_table">
        <div
          class="day_week_table"
          @click="showing.tdursday = !showing.tdursday"
        >
          Четверг
          <i
            class="fa fa-chevron-down"
            aria-hidden="true"
            v-if="!showing.tdursday"
          ></i>
          <i class="fa fa-chevron-up" aria-hidden="true" v-else></i>
        </div>
        <div class="table__content" v-show="showing.tdursday">
          <div class="food_name">Завтрак</div>
          <table>
            <tr>
              <th>Выход (г)</th>
              <th>Наименование блюда</th>
              <th>
                эн. цен. (ккал), белки (г),углеводы (г), витамины (мг),
                микроэлементы (мг)
              </th>
            </tr>

            <tr
              v-for="(zav, index) in menu_list_filter.tdursday.zav"
              :key="'T11' + index"
            >
              <td>{{ zav.exit }}</td>
              <td>{{ zav.food }}</td>
              <td>{{ zav.food_value }}</td>
            </tr>
          </table>

          <div class="food_name">Обед</div>
          <table>
            <tr>
              <th>Выход (г)</th>
              <th>Наименование блюда</th>
              <th>
                эн. цен. (ккал), белки (г),углеводы (г), витамины (мг),
                микроэлементы (мг)
              </th>
            </tr>
            <tr
              v-for="(ob, index) in menu_list_filter.tdursday.ob"
              :key="'T12' + index"
            >
              <td>{{ ob.exit }}</td>
              <td>{{ ob.food }}</td>
              <td>{{ ob.food_value }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="block_table">
        <div class="day_week_table" @click="showing.Friday = !showing.Friday">
          Пятница
          <i
            class="fa fa-chevron-down"
            aria-hidden="true"
            v-if="!showing.Friday"
          ></i>
          <i class="fa fa-chevron-up" aria-hidden="true" v-else></i>
        </div>
        <div class="table__content" v-show="showing.Friday">
          <div class="food_name">Завтрак</div>
          <table>
            <tr>
              <th>Выход (г)</th>
              <th>Наименование блюда</th>
              <th>
                эн. цен. (ккал), белки (г),углеводы (г), витамины (мг),
                микроэлементы (мг)
              </th>
            </tr>

            <tr
              v-for="(zav, index) in menu_list_filter.Friday.zav"
              :key="'F1' + index"
            >
              <td>{{ zav.exit }}</td>
              <td>{{ zav.food }}</td>
              <td>{{ zav.food_value }}</td>
            </tr>
          </table>

          <div class="food_name">Обед</div>
          <table>
            <tr>
              <th>Выход (г)</th>
              <th>Наименование блюда</th>
              <th>
                эн. цен. (ккал), белки (г),углеводы (г), витамины (мг),
                микроэлементы (мг)
              </th>
            </tr>
            <tr
              v-for="(ob, index) in menu_list_filter.Friday.ob"
              :key="'F2' + index"
            >
              <td>{{ ob.exit }}</td>
              <td>{{ ob.food }}</td>
              <td>{{ ob.food_value }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu_list: [],
      schools: [],
      types: [],
      type_menu: null,
      school: null,
      menu_list_filter: [],

      show_table: false,
      showing: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        tdursday: false,
        Friday: false,
      },
    };
  },
  methods: {
    func_get_menu() {
      window.sendRequest("/get_menu_title", {}).then((result) => {
        if (result) {
          if (result.schools_list) this.schools = result.schools_list;
          if (result.menu_type) this.types = result.menu_type;
        }
      });
    },
    func_show_menu() {
      if (this.type_menu.type_menu && this.school.school) {
        window
          .sendRequest("/get_menu_list", {
            type_menu: this.type_menu.type_menu,
            school: this.school.school,
          })
          .then((result) => {
            if (result) {
              this.menu_list = result;
              this.menu_list_filter = this.func_filter_menu();
              this.show_table = true;
            }
          });
      } else {
        this.$notify({
          group: "foo",
          title: "Предупрждение",
          text: "Заполните поля ввода",
          type: "warn",
        });
      }
    },
    func_filter_menu() {
      let array = [];
      array.Monday = { zav: null, ob: null };
      array.Tuesday = { zav: null, ob: null };
      array.Wednesday = { zav: null, ob: null };
      array.tdursday = { zav: null, ob: null };
      array.Friday = { zav: null, ob: null };

      array.Monday.zav = this.menu_list.filter(
        (item) =>
          item.type_menu === this.type_menu.type_menu &&
          item.school === this.school.school &&
          item.day_week === "Понедельник" &&
          item.type_food === "Завтрак"
      );
      array.Monday.ob = this.menu_list.filter(
        (item) =>
          item.type_menu === this.type_menu.type_menu &&
          item.school === this.school.school &&
          item.day_week === "Понедельник" &&
          item.type_food === "Обед"
      );

      array.Tuesday.zav = this.menu_list.filter(
        (item) =>
          item.type_menu === this.type_menu.type_menu &&
          item.school === this.school.school &&
          item.day_week === "Вторник" &&
          item.type_food === "Завтрак"
      );
      array.Tuesday.ob = this.menu_list.filter(
        (item) =>
          item.type_menu === this.type_menu.type_menu &&
          item.school === this.school.school &&
          item.day_week === "Вторник" &&
          item.type_food === "Обед"
      );

      array.Wednesday.zav = this.menu_list.filter(
        (item) =>
          item.type_menu === this.type_menu.type_menu &&
          item.school === this.school.school &&
          item.day_week === "Среда" &&
          item.type_food === "Завтрак"
      );
      array.Wednesday.ob = this.menu_list.filter(
        (item) =>
          item.type_menu === this.type_menu.type_menu &&
          item.school === this.school.school &&
          item.day_week === "Среда" &&
          item.type_food === "Обед"
      );

      array.tdursday.zav = this.menu_list.filter(
        (item) =>
          item.type_menu === this.type_menu.type_menu &&
          item.school === this.school.school &&
          item.day_week === "Четверг" &&
          item.type_food === "Завтрак"
      );
      array.tdursday.ob = this.menu_list.filter(
        (item) =>
          item.type_menu === this.type_menu.type_menu &&
          item.school === this.school.school &&
          item.day_week === "Четверг" &&
          item.type_food === "Обед"
      );

      array.Friday.zav = this.menu_list.filter(
        (item) =>
          item.type_menu === this.type_menu.type_menu &&
          item.school === this.school.school &&
          item.day_week === "Пятница" &&
          item.type_food === "Завтрак"
      );
      array.Friday.ob = this.menu_list.filter(
        (item) =>
          item.type_menu === this.type_menu.type_menu &&
          item.school === this.school.school &&
          item.day_week === "Пятница" &&
          item.type_food === "Обед"
      );
      return array;
    },
  },
  mounted() {
    this.func_get_menu();
  },
};
</script>

<style></style>
