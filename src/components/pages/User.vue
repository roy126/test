<template>
  <div>
    <Header />
    <HeaderInfo />
    <Menu @active_page="func_update_active_page" :active_page="active_page" />
    <div class="container">
      <div class="users__wrapper">
        <div class="users__card">
          <div class="user__left">
            <div class="img__user" v-if="user">
              <img
                :src="'img/users/' + (user.img ? user.img : 'nophoto.png')"
                alt=""
              />
            </div>
            <button class="add_img" @click="func_update_photo">
              <i class="fa fa-camera" aria-hidden="true"></i>Загрузить фото
            </button>
            <input
              type="file"
              id="file"
              ref="file"
              v-on:change="func_file_upload()"
              style="display: none"
              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            />
            <button class="update_password" @click="func_show_reset_pass">
              Изменить пароль
            </button>
          </div>
          <div class="user__info" v-if="user">
            <div class="form__group">
              <label>Логин</label>
              <input type="text" readonly v-model="user.login" />
            </div>
            <div class="form__group">
              <label>Фамилия</label>
              <input type="text" readonly v-model="user.surname" />
            </div>
            <div class="form__group">
              <label>Имя</label>
              <input type="text" readonly v-model="user.name" />
            </div>
            <div class="form__group">
              <label>E-mail</label>
              <input type="email" readonly v-model="user.email" />
            </div>
          </div>
        </div>
        <div class="user__balance" v-if="user_balance">
          <div class="balance__wrap">
            <div class="balance__main">
              <h4>{{ user_balance.num_ls }}</h4>
              <span>{{ Number(user_balance.balance).toFixed(2) }} руб</span>
            </div>
            <div class="balance__all">
              <h4>На всех счетах</h4>
              <span>{{ Number(user_balance.summ_all).toFixed(2) }} руб</span>
            </div>
          </div>
          <div class="buttons">
            <button @click="$router.push('/payment')">Пополнить счет</button>
            <button v-if="child.length > 1" @click="func_show_cash">
              Перевод средств между счетами
            </button>
          </div>
        </div>
      </div>
      <FuncBlock />
      <div class="child__wrapper">
        <h3>Дети</h3>
        <div class="child__container" v-if="child.length > 0">
          <div
            class="child__item"
            v-for="item in child"
            :key="item.stuident_id"
            @click="selected_child = item"
            :class="{
              selected_child:
                selected_child && selected_child.student_id == item.student_id,
            }"
          >
            <div class="form__group">
              <label>Номер лицевого счета</label>
              <input type="text" readonly v-model="item.num_ls" />
            </div>
            <div class="form__group">
              <label>Баланс</label>
              <input type="text" readonly v-model="item.balance" />
            </div>
            <div class="form__group">
              <label>ФИО</label>
              <input type="text" readonly v-model="item.FIO" />
            </div>
            <div class="form__group" v-if="item.city">
              <label>Город</label>
              <input type="text" readonly v-model="item.city" />
            </div>
            <div class="form__group" v-if="item.num_school">
              <label>Школа</label>
              <input type="text" readonly v-model="item.num_school" />
            </div>
            <div class="form__group" v-if="item.num_class">
              <label>Класс</label>
              <input type="text" readonly v-model="item.num_class" />
            </div>
            <div class="bufet">
              <label>Разрешить пользоваться буфетом</label>
              <div class="bufet__container" @click="func_update_bufet(item)">
                <input type="checkbox" v-model="item.bufet" class="demo" />
                <label data-on-label="Да" data-off-label="Нет"></label>
              </div>
            </div>
          </div>
          <div class="child__item add_child" @click="func_show_add_child">
            <i class="fa fa-user-plus" aria-hidden="true"></i>
            Добавить ребенка
          </div>
        </div>
      </div>
      <div class="history__operation">
        <h3>История операций</h3>
        <History :child="selected_child" v-if="selected_child" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeaderInfo from "@/components/Header_info.vue";
import Menu from "@/components/Menu.vue";
import History from "@/components/history__operation.vue";
import FuncBlock from "@/components/function_blocks.vue";
import Footer from "@/components/Footer.vue";

import { mapGetters } from "vuex";
export default {
  components: {
    Header,
    HeaderInfo,
    Menu,
    History,
    FuncBlock,
    Footer,
  },
  data() {
    return {
      active_page: 1,
      user: null,
      user_balance: null,
      child: [],
      selected_child: null,
      file: "",
    };
  },
  watch: {
    UPDATE_LK_STATE(val) {
      if (val) {
        this.func_get_user();
      }
    },
  },
  methods: {
    func_update_active_page(value) {
      if (this.$router.currentRoute.path !== "/") {
        this.$router.push({
          name: "main",
          params: {
            view_id: value,
          },
        });
      }
    },
    func_get_user() {
      window.sendRequestAuth("/get_user_lk", {}).then((result) => {
        if (!result) {
          this.$router.push("/");
          return;
        }
        this.user = result.user_info;
        this.user_balance = result.user_balance;
        if (result.child) {
          result.child.forEach((element) => {
            element.bufet = !!Number(element.bufet);
          });
          this.selected_child = result.child[0];
        }

        this.child = result.child;
      });
    },
    func_update_bufet(item) {
      item.bufet = !item.bufet;
      let param = { ...item };
      param.bufet = param.bufet ? "1" : "0";
      window.sendRequestAuth("/update_bufet", param);
    },
    func_show_cash() {
      this.$store.commit("CHANGE_MODAL");
      this.$store.commit("CHANGE_MODAL_ID", 2);
    },
    func_show_reset_pass() {
      this.$store.commit("CHANGE_MODAL");
      this.$store.commit("CHANGE_MODAL_ID", 3);
    },
    func_show_add_child() {
      this.$store.commit("CHANGE_MODAL");
      this.$store.commit("CHANGE_MODAL_ID", 4);
    },
    func_update_photo() {
      document.querySelector("#file").click();
    },
    func_file_upload() {
      this.file = this.$refs.file.files[0];
      window
        .sendRequestAuth("/update_photo", { img: this.file, path: "users" })
        .then((result) => {
          if (result) {
            if (result.success) {
              this.$notify({
                group: "foo",
                title: "Информация",
                text: result.msg,
                type: "info",
              });
              this.func_get_user();
            } else {
              this.$notify({
                group: "foo",
                title: "Ошибка",
                text: result.msg,
                type: "error",
              });
            }
          }
        });
    },
  },
  mounted() {
    this.active_page = 0;
    this.func_get_user();
  },
  computed: {
    ...mapGetters(["UPDATE_LK_STATE"]),
  },
};
</script>

<style></style>
