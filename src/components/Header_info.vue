<template>
  <div class="header__info__wrapper">
    <div class="header__info__container">
      <div class="logo" @click="func_link_main">
        <img :src="require('@/assets/img/logo_png_160px.png')" alt="" />
      </div>
      <div class="contacts">
        <h4>Большая перемена</h4>
        <ul>
          <li>г. Балаково ул. Московская д. 79</li>
          <li>Приемная тел: 8(8453)23-23-12</li>
          <li>E-mail: bpkshp@mail.ru</li>
          <li>Тех. поддержка: +7 (929) 777-88-11</li>
          <li>E-mail: bptex@mail.ru</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    func_link_main(){
        if (this.$router.currentRoute.path !== "/") 
        this.$router.push('/');
      }
  }
};
</script>

<style></style>
