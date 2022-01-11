<template>
  <div class="div">
    <Header />
    <HeaderInfo />
    <Menu @active_page="func_update_active_page" :active_page="active_page" />
    <GeneralImg />
    <div class="main__body">
      <News v-if="active_page === 1" />
      <Project v-if="active_page === 2" />
      <MenuFood v-if="active_page === 3" />
      <Instruction v-if="active_page === 4" />
      <Contact v-if="active_page === 5" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeaderInfo from "@/components/Header_info.vue";
import Menu from "@/components/Menu.vue";
import GeneralImg from "@/components/General_img.vue";
import Footer from "@/components/Footer.vue";

import News from "@/components/Main/News.vue";
import Project from "@/components/Main/Project.vue";
import MenuFood from "@/components/Main/MenuFood.vue";
import Instruction from "@/components/Main/Instruction.vue";
import Contact from "@/components/Main/Contacts.vue";

export default {
  components: {
    Header,
    HeaderInfo,
    Menu,
    GeneralImg,
    Footer,
    News,
    Project,
    MenuFood,
    Instruction,
    Contact,
  },
  data() {
    return {
      active_page: 1,
    };
  },
  methods: {
    func_update_active_page(value) {
      this.active_page = value;
      window.scrollTo(0, 800);
    },
  },
  mounted() {
    if (Object.keys(this.$route.params).length !== 0)
      this.func_update_active_page(this.$route.params.view_id);
  },
};
</script>

<style></style>
