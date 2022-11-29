<template>
  <ModalPage v-if="modal" :retry="retry" :close="closeAndResutlView" />
  <!-- <start-game :msg="count" v-if="game" /> -->
  <header>
    <nav class="navbar navbar-expand-lg p-4 shadow">
      <div class="navbar-left">
        <h2>MATH GAME</h2>
      </div>
      <div class="navbar-right">
        <div class="all-score me-3">
          <h3>
            {{ langs.all }}: <strong>{{ ball }}x</strong>
          </h3>
        </div>
        <select
          name=""
          id=""
          class="form-select w-25"
          v-model="lang_game"
          @change="lang(this.lang_game)"
        >
          <option value="uz">UZ</option>
          <option value="en">EN</option>
        </select>
        <button class="button-exit ms-4" @click="exit">{{ langs.back }}</button>
      </div>
    </nav>
  </header>
  <div class="my-4 p-4">
    <div class="row">
      <div class="col-md-6 border-right">
        <!-- <div class="card card-body shadow border-0 p-3">
          <div class="card-level me-5 my-3 text-center">
            <span>Your Level - </span><strong>{{ level }}</strong>
          </div>
          <button class="btn btn-outline-dark game_start" @click="startGame">
            Start
          </button>
        </div> -->
        <div class="card mt-4 shadow-lg border-0">
          <div class="card-header bg-white p-4 text-center">
            <div class="card-level">
              <span>{{ langs.your_level }} - </span><strong>{{ level }}</strong>
            </div>
            <!-- <button class="btn btn-outline-dark game_start" @click="startGame">
              Start
            </button> -->
          </div>
          <div class="card-body position-relative">
            <div v-if="game" class="game-play">
              <h1 @click="startGame">{{ langs.play }}</h1>
            </div>
            <div class="question text-center">
              <h1>{{ questions.question }} = ?</h1>
            </div>
            <div class="time_and_score my-4 d-flex justify-content-center">
              <div class="score me-5">
                <h2>Score: {{ score }}</h2>
              </div>
              <div class="time">
                <h2>Time: {{ time }} s</h2>
              </div>
            </div>
            <div class="input-form mb-3">
              <form>
                <div class="randomNumber d-flex justify-content-center">
                  <div
                    class="answers"
                    v-for="(answer, i) in this.questions.answer"
                    :key="i"
                  >
                    <input
                      @click="addAnswer(answer)"
                      type="radio"
                      :name="answer"
                      :id="answer"
                    />
                    <label :for="answer">{{ answer }}</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 result-score">
        <div class="card card-body shadow">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>{{ langs.score }}</th>
                <th>{{ langs.level }}</th>
                <th>{{ langs.action }}</th>
              </tr>
            </thead>
            <tbody v-if="results">
              <tr v-for="(result, index) in results" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ result.score }}</td>
                <td>{{ result.level }}</td>
                <td>
                  <button class="btn btn-danger" @click="remove(result)">
                    {{ langs.delete }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalPage from "./ModalPage.vue";
// import StartGame from "./startGame.vue";
import { level1 } from "./questions/LevelOne";
import { level2 } from "./questions/LevelTwo";
import { level3 } from "./questions/LevelThree";

export default {
  components: {
    ModalPage,
    // StartGame,
  },
  props: {
    hideHomePage: { type: Function },
    hideGamePage: { type: Function },
    lang: { type: Function },
    language: { type: String },
    langs: { type: Object },
  },
  data() {
    return {
      level: null,
      score: 0,
      ball: 0,
      time: 60,
      results: [],
      questions: {},
      levels: [],
      que: 0,
      start: true,
      modal: false,
      game: true,
      count: 4,
      lang_game: this.language,
    };
  },
  mounted() {
    this.getLevel();
    this.result();
    this.allBall();
    this.questionsAnswers();
    console.log(this.questions);
    console.log(level1[0])
  },
  methods: {
    saveLocalStorage(result) {
      localStorage.setItem("result", JSON.stringify(result));
    },
    questionsAnswers() {
      switch (this.level) {
        case "BEGINNER":
          return (this.questions = level1[this.que]);
        case "JUNIOR":
          return (this.questions = level2[this.que]);
        case "MIDDLE":
          return (this.questions = level3[this.que]);
      }
    },
    startGame() {
      this.start = true;
      this.game = false;
      this.gameEndTime();
      // let val = setInterval(() => {
      //   this.game = true;
      //   this.count--;
      //   if (this.count === 0) {
      //     this.count = "Start Game!";
      //     clearInterval(val);
      //     setTimeout(() => {
      //       this.game = false;
      //       this.gameEndTime();
      //     }, 1000);
      //   }
      //   console.log(this.count);
      // }, 1000);
    },
    scoreLevelAdd() {
      switch (this.level) {
        case "BEGINNER":
          return (this.score += 5);
        case "JUNIOR":
          return (this.score += 10);
        case "MIDDLE":
          return (this.score += 20);
      }
    },
    scoreLevelMinus() {
      switch (this.level) {
        case "BEGINNER":
          return (this.score -= 2);
        case "JUNIOR":
          return (this.score -= 4);
        case "MIDDLE":
          return (this.score -= 6);
      }
    },
    addAnswer(value) {
      this.que++;
      if (value === this.questions.true_ans) {
        this.scoreLevelAdd();
        if (this.que === level1.length) {
          this.que = 0;
        }
      } else {
        this.scoreLevelMinus();
        if (this.que === level1.length) {
          this.que = 0;
        }
      }
      this.questionsAnswers();
    },
    allBall() {
      for (let i = 0; i < this.results.length; i++) {
        this.ball += this.results[i].score;
      }
      return this.ball;
    },
    getLevel() {
      this.level = localStorage.getItem("data");
    },

    saveGame() {
      // this.modal = !this.modal;
      this.game = true;
      this.results.push({
        score: this.score,
        level: this.level,
      });
      this.saveLocalStorage(this.results);
    },
    result() {
      this.results = JSON.parse(localStorage.getItem("result")) || [];
    },
    gameEndTime() {
      let interval = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          this.saveGame();
          this.ball += this.score;
          clearInterval(interval);
          this.gameEnd();
        }
      }, 1000);
    },
    gameEnd() {
      this.time = 60;
      this.score = 0;
      this.que = 0;
      this.questionsAnswers();
    },
    exit() {
      localStorage.removeItem("data");
      this.hideGamePage();
    },
    retry() {
      this.modal = !this.modal;
      this.score = 0;
      this.time = 10;
      this.gameEndTime();
      this.questionsAnswers();
    },
    closeAndResutlView() {
      this.modal = !this.modal;
      console.log(this.results);
      this.start = false;
    },
    remove(index) {
      this.results = this.results.filter((i) => i !== index);
      this.saveLocalStorage(this.results);
    },
  },
};
</script>

<style scoped>
@import url("./game.css");
.bgModal {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
}
</style>
