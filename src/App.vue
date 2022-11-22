<template>
  <div class="bgSelect">
    <HomePage v-if="home" :hideHomePage="hideHomePage" :hideGamePage="hideGamePage" />
    <GamePage v-if="game_station" :hideGamePage="hideGamePage" :hideHomePage="hideHomePage" />
    <!-- <button class="btn btn-success" @click="click" >Click {{data}}</button> -->
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import GamePage from "./components/GamePage.vue";

export default {
  components: {
    HomePage,
    GamePage,
  },
  mounted() {
    // console.log(this.data)
  },
  data() {
    return {
      home: true,
      game_station: false,
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
    }
  },
};
</script>
