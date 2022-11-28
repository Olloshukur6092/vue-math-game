<template>
  <div class="bgSelect">
    <HomePage
      v-if="home"
      :hideHomePage="hideHomePage"
      :hideGamePage="hideGamePage"
      :langs="langs"
    />
    <GamePage
      v-if="game_station"
      :hideGamePage="hideGamePage"
      :hideHomePage="hideHomePage"
      :lang="choiseLang"
      :language="language"
      :langs="langs"
    />
    <!-- <button class="btn btn-success" @click="click" >Click {{data}}</button> -->
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import GamePage from "./components/GamePage.vue";
import { langEn, langUzb } from "./lang/langs";

export default {
  components: {
    HomePage,
    GamePage,
  },
  mounted() {
   this.getLang();
  },
  data() {
    return {
      home: true,
      game_station: false,
      language: "uz",
      langs: {},
    };
  },
  methods: {
    hideHomePage() {
      this.home = !this.home;
      this.game_station = !this.game_station;
    },
    hideGamePage() {
      this.home = !this.home;
      this.game_station = !this.game_station;
    },
    choiseLang(lang) {
      localStorage.setItem("lang", lang);
      this.getLang();
    },
    getLang() {
      this.language = localStorage.getItem("lang") || "uz";
      if (this.language === "en") {
        this.langs = langEn;
      }

      if (this.language === "uz") {
        this.langs = langUzb;
      }
    },
  },
};
</script>
