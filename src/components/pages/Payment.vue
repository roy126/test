<template>
  <div>
    <Header />
    <HeaderInfo />
    <Menu @active_page="func_update_active_page" :active_page="active_page" />
    <div class="container">
      <div class="payment__wrapper">
        <div class="payment__block">
          <h4>{{ user ? "Пополнить счет" : "Быстрая оплата" }}</h4>
          <form @submit.prevent="func_pay">
            <div class="form__group" v-if="!user">
              <label>Лицевой счет</label>
              <input type="number" class="num_ls" required v-model="num_ls" />
            </div>
            <div class="form__group" v-else>
              <label>Выберите счет</label>
              <v-select :options="students" label="value" v-model="student" />
            </div>

            <div class="form__group">
              <label>Сумма пополнения</label>
              <input type="number" required v-model="summ" class="summ" />
            </div>
            <button class="send">Пополнить</button>
          </form>
        </div>
        <div class="payment__info">
          <p>Вы можете пополнить свой счет при помощи банковских карт:</p>
          <img :src="require('@/assets/img/vse-karty.e9af6efd.png')" alt="" />
          <p>
            При нажатии на кнопку Пополнить, введите данные Вашей банковской
            карты и укажите сумму, после оплаты, денежные средства сразу
            попадают на Ваш лицевой счет карты питания. ВНИМАНИЕ, наш сайт не
            хранит номера и сведения о банковских картах клиентов, процесс
            авторизации платежа происходит на шлюзе СБЕРБАНКА.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeaderInfo from "@/components/Header_info.vue";
import Menu from "@/components/Menu.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    HeaderInfo,
    Menu,
    Footer,
  },
  data() {
    return {
      active_page: 1,
      num_ls: "",
      summ: "",
      student: null,
      students: [],
      balance: null,
      user: false,
    };
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
    func_get_auth() {
      if (localStorage.getItem("api_key")) {
        this.user = true;
        window.sendRequestAuth("/get_students_pay", {}).then((result) => {
          if (!result) return;
          this.students = result;
        });
      } else {
        this.user = false;
      }
    },

    func_pay() {
      if (this.user) {
        if (this.student && this.summ) {
          if (this.valid_summ()) {
            window.ipay = new window.IPAY({
              api_token: "vvgaud0vue4k19jbort4vke338",
            });
            window.ipayCheckout(
              {
                currency: "RUB",
                description:
                  "ЛС №" +
                  this.students.find((item) => item.id === this.student.id)
                    .num_ls,
                amount: this.summ,
              },
              (order) => this.showSuccessfulPurchase(order),
              (order) => this.showFailurefulPurchase(order)
            );
          } else {
            this.$notify({
              group: "foo",
              title: "Ошибка",
              text: "Не корректная сумма",
              type: "error",
            });
          }
        } else {
          this.$notify({
            group: "foo",
            title: "Ошибка",
            text: "Заполните все поля",
            type: "error",
          });
        }
      } else {
        if (this.num_ls && this.summ) {
          if (this.valid_summ()) {
            window
              .sendRequest("/check_ls", { num_ls: this.num_ls })
              .then((result) => {
                if (!result) return;
                if (result.success) {
                  window.ipay = new window.IPAY({
                    api_token: "vvgaud0vue4k19jbort4vke338",
                  });
                  window.ipayCheckout(
                    {
                      currency: "RUB",
                      description: "ЛС №" + this.num_ls,
                      amount: this.summ,
                    },
                    (order) => this.showSuccessfulPurchase(order),
                    (order) => this.showFailurefulPurchase(order)
                  );
                } else {
                  this.$notify({
                    group: "foo",
                    title: "Ошибка",
                    text: result.msg,
                    type: "error",
                  });
                }
              });
          } else {
            this.$notify({
              group: "foo",
              title: "Ошибка",
              text: "Не корректная сумма",
              type: "error",
            });
          }
        } else {
          this.$notify({
            group: "foo",
            title: "Ошибка",
            text: "Заполните все поля",
            type: "error",
          });
        }
      }
    },
    valid_summ() {
      let summ = this.summ;
      if (!summ) return false;
      if (isNaN(Number(summ))) return false;
      if (Number(summ) <= 0 || Number(summ) > 5000) return false;
      return true;
    },
    showSuccessfulPurchase(order) {
      if (!order) return;
      window
        .sendRequestAuth("/pay", {
          num_ls: this.num_ls ? this.num_ls : this.student.num_ls,
          summ: this.summ,
        })
        .then((result) => {
          console.log(result);
        });
    },
    showFailurefulPurchase() {
      this.$notify({
        group: "foo",
        title: "Ошибка",
        text: "Произошла ошибка оплаты",
        type: "error",
      });
    },
  },
  mounted() {
    this.active_page = 0;
    this.func_get_auth();
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://securepayments.sberbank.ru/payment/docsite/assets/js/ipay.js"
    );
    document.head.appendChild(recaptchaScript);
  },
};
</script>

<style></style>
