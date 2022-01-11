<template>
  <div class="news__wrapper" ref="slaid-1">
    <h4 class="title">Новости</h4>
    <div class="news__list" v-if="selected_new == null">
      <transition-group name="news__content" class="news__content" tag="div">
        <div class="new__item" v-for="item in news_list" :key="item.id">
          <div class="more" @click="func_show_new(item)">Подробнее</div>
          <div class="img">
            <img :src="'/img/news/' + item.img" alt="" />
            <span class="datetime">{{
              new Date(item.datetime).toLocaleDateString() +
              " " +
              new Date(item.datetime).toLocaleTimeString()
            }}</span>
          </div>
          <div class="content">
            <h4>{{ item.title }}</h4>
            {{ item.text.replace(regex, "").slice(0, 350) + "..." }}
          </div>
        </div>
      </transition-group>
      <div class="add__more" v-if="offset * limit + limit < count_rows">
        <button @click="func_add_more()">Показать еще</button>
      </div>
    </div>
    <div class="new__one" v-if="selected_new">
      <div class="new__title">
        <div class="close__new" @click="func_close_new">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        {{ selected_new.title }}
      </div>
      <div class="new__content" v-html="selected_new.text"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      news_list: [],
      progress: true,
      limit: 3,
      offset: 0,
      count_rows: 0,
      regex: /(<([^>]+)>)/gi,
      selected_new: null,
    };
  },
  watch: {
    selected_new(val) {
      console.log(val);
    },
  },
  methods: {
    func_close_new() {
      console.log(1);
      this.selected_new = null;
    },
    func_get_data() {
      this.progress = true;
      window
        .sendRequest("/get_news", { limit: this.limit, offset: this.offset })
        .then((result) => {
          if (!result.data) return;
          this.progress = false;
          this.count_rows = result.count_row;
          result.data.forEach((item) => {
            this.news_list.push(item);
          });
        });
    },
    func_add_more() {
      this.offset++;
      this.func_get_data();
    },
    func_show_new(item) {
      if (!item) return;
      this.selected_new = item;
    },
  },
  mounted() {
    this.func_get_data();
  },
};
</script>

<style>
.news__content-item {
  display: inline-block;
  margin-right: 10px;
}
.news__content-enter-active,
.news__content-leave-active {
  transition: all 1s;
}
.news__content-enter, .news__content-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
