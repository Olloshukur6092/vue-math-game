<template>
  <ModalPage v-if="modal" :retry="retry" :close="closeAndResutlView" />
  <start-game :msg="count" v-if="game" />
  <header>
    <nav class="navbar navbar-expand-lg p-4 shadow">
      <div class="navbar-left">
        <h2>MATH GAME</h2>
      </div>
      <div class="navbar-right">
        <button class="button-exit" @click="exit">Exit</button>
      </div>
    </nav>
  </header>
  <div class="my-4 p-4">
    <div class="row">
      <div class="col-md-6 border-right">
        <div class="card card-body shadow border-0 p-3">
          <div class="card-level me-5 my-3 text-center">
            <span>Your Level - </span><strong>{{ level }}</strong>
          </div>
          <button class="btn btn-outline-dark game_start" @click="startGame">
            Start
          </button>
        </div>
        <div v-if="start" class="card mt-4 card-body shadow border-0">
          <h3 class="text-center">Game!</h3>
          <div class="action">
            <h1>{{ questions.question }}</h1>
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

      <div class="col-md-6 result-score">
        <div class="card card-body shadow">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Score</th>
                <th>Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="results">
              <tr v-for="(result, index) in results" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ result.score }}</td>
                <td>{{ result.level }}</td>
                <td>
                  <button class="btn btn-danger" @click="remove(result)">
                    Delete
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
import StartGame from "./startGame.vue";
import { level1 } from "./questions/LevelOne";
import { level2 } from "./questions/LevelTwo";

export default {
  components: {
    ModalPage,
    StartGame,
  },
  props: {
    // hideHomePage: { type: Function },
    // hideGamePage: { type: Function },
  },
  data() {
    return {
      level: null,
      score: 0,
      time: 10,
      results: [],
      questions: {},
      levels: [],
      que: 0,
      start: false,
      modal: false,
      game: false,
      count: 4,
    };
  },
  mounted() {
    this.getLevel();
    this.result();
    console.log(this.questionsAnswers());
  },
  methods: {
    saveLocalStorage(result) {
      localStorage.setItem("result", JSON.stringify(result));
    },
    questionsAnswers() {
      if (this.level === "BEGINNER") {
        this.questions = level1[this.que];
      }

      if (this.level === "JUNIOR") {
        this.questions = level2[this.que];
      }

      return this.questions;
    },
    scoreLevelAdd() {
      if (this.level === "BEGINNER") {
        this.score += 5;
      }
      if (this.level === "JUNIOR") {
        this.score += 10;
      }
    },
    scoreLevelMinus() {
      if (this.level === "BEGINNER") {
        this.score -= 2;
      }
      if (this.level === "JUNIOR") {
        this.score -= 4;
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

    getLevel() {
      this.level = localStorage.getItem("data");
    },

    saveGame() {
      this.modal = !this.modal;
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
          clearInterval(interval);
        }
      }, 1000);
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
    startGame() {
      this.questionsAnswers();
      this.start = true;
      let val = setInterval(() => {
        this.game = true;
        this.count--;
        if (this.count === 0) {
          this.count = "Start Game!";
          clearInterval(val);
          setTimeout(() => {
            this.game = false;
            this.gameEndTime();
          }, 1000);
        }
        console.log(this.count);
      }, 1000);
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
