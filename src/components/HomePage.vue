<template>
  <div class="container my-4">
    <div class="math-game-title text-center">
      <h1>MATH GAME</h1>
    </div>
    <div class="levelss my-5 text-center">
      <h3>{{ langs.choise_a_level }}</h3>
      <div class="levels d-flex justify-content-center">
        <div class="level-1">
          <input
            type="radio"
            name="level_1"
            id="level_1"
            value="BEGINNER"
            v-model="level_1"
          />
          <label for="level_1">{{ langs.level1 }}</label>
        </div>
        <div class="level-2">
          <input
            type="radio"
            name="level_2"
            id="level_2"
            value="JUNIOR"
            v-model="level_2"
          />
          <label for="level_2">{{ langs.level2 }}</label>
        </div>
        <div class="level-3">
          <input
            type="radio"
            name="level_3"
            id="level_3"
            value="MIDDLE"
            v-model="level_3"
          />
          <label for="level_3">{{ langs.level3 }}</label>
        </div>
      </div>
    </div>
    <div class="btnSave d-flex justify-content-center">
      <button type="button" @click="saveLevel()">{{ langs.save }}</button>
    </div>
  </div>
</template>
<script>

export default {
  props: {
   hideHomePage: { type: Function },
   hideGamePage: { type: Function },
   langs: { type: Object },
  },
  data() {
    return {
      level_1: null,
      level_2: null,
      level_3: null,
    };
  },

  mounted() {
    if (localStorage.getItem("data") !== null) {
      this.hideHomePage();
      // this.$router.push({ name: 'Game' })
    }
  },
  methods: {
    saveLevel() {
      console.log()
      if (this.level_1 === null &&
          this.level_2 === null &&
          this.level_3 === null) {
        return;
      }

      const level = this.level_1 ? this.level_1 : this.level_2 ? this.level_2 : this.level_3 ? this.level_3 : null;
      console.log(level);
      localStorage.setItem("data", level);
      this.hideHomePage();
      // this.$router.push({ name: "Game" })
    },
  },
};
</script>

<style scoped>
.operations label {
  width: 120px;
  height: 120px;
  background: #04d516;
  margin: 10px;
  color: #fff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  cursor: pointer;
}
.operations input {
  display: none;
}

#addition:checked ~ label[for="addition"] {
  background: red;
  color: #fff;
  box-shadow: 1px 1px 11px 11px rgb(0 0 0 / 35%);
}
#subtraction:checked ~ label[for="subtraction"] {
  background: red;
  color: #fff;
  box-shadow: 1px 1px 11px 11px rgb(0 0 0 / 35%);
}
#multiplication:checked ~ label[for="multiplication"] {
  background: red;
  color: #fff;
  box-shadow: 1px 1px 11px 11px rgb(0 0 0 / 35%);
}
#division:checked ~ label[for="division"] {
  background: red;
  color: #fff;
  box-shadow: 1px 1px 11px 11px rgb(0 0 0 / 35%);
}

/* Level design */
.levelss label {
  height: 120px;
  width: 120px;
  background: #04d516;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 30px;
  border-radius: 15px;
  cursor: pointer;
  font-family: "Josefin Sans", sans-serif;
}

.levelss h3,
.math-game-title h2 {
  color: #fff;
  font-size: 37px;
  text-shadow: 2px 2px 10px rgb(0 0 0 / 60%);
  font-family: "Josefin Sans", sans-serif;
}

#level_1:checked ~ label[for="level_1"] {
  background: red;
  color: #fff;
  box-shadow: 1px 1px 12px 12px rgba(0, 0, 0, 0.35);
}
#level_2:checked ~ label[for="level_2"] {
  background: red;
  color: #fff;
  box-shadow: 1px 1px 12px 12px rgba(0, 0, 0, 0.35);
}
#level_3:checked ~ label[for="level_3"] {
  background: red;
  color: #fff;
  box-shadow: 1px 1px 12px 12px rgba(0, 0, 0, 0.35);
}

.levels input {
  display: none;
}

.btnSave button {
  height: 80px;
  width: 40%;
  border: none;
  outline: none;
  background: #04d516;
  color: #fff;
  font-size: 35px;
  border-radius: 10px;
  font-family: "Josefin Sans", sans-serif;
  transition: 0.3s ease;
}
.btnSave button:hover {
  box-shadow: 1px 1px 8px 8px rgba(0, 0, 0, 0.35);
  transition: 0.3s ease;
}

.math-game-title h1 {
  font-size: 80px;
  font-family: "Rubik Distressed", cursive;
  color: #fff;
  text-shadow: 5px 11px 11px rgb(0 0 0 / 60%);
}
</style>
