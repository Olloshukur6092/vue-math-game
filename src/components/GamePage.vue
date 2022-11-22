<template>
  <ModalPage v-if="modal" :retry="retry" :close="closeAndResutlView" />
  <start-game :msg="count" v-if="game" />
  <header>
    <nav class="navbar navbar-expand-lg p-4 shadow">
      <div class="navbar-left">
        <h2><span>MATH GAME</span> - VUE</h2>
      </div>
      <div class="navbar-right">
        <button class="button-exit" @click="exit">EXIT</button>
      </div>
    </nav>
  </header>
  <div class="my-4 p-4">
    <div class="row">
      <div class="col-md-6 border-right">
        <div class="card card-body shadow border-0 p-3">
          <div class="d-flex mt-2 mb-4 card-in">
            <div class="card-level me-5">
              <span>Your Level - </span><strong>{{ level }}</strong>
            </div>
            <div class="card-operation">
              <span>Your Operation - </span><strong> {{ operation }} </strong>
            </div>
          </div>
          <button class="btn btn-outline-dark game_start" @click="startGame">Start</button>
        </div>
        <div v-if="start" class="card mt-4 card-body shadow border-0">
          <h3 class="text-center">Game!</h3>
          <div class="action">
            <div class="number-1">{{ randomNumberOne }}</div>

            <div class="operation">
              {{
                operation === "ADDITION"
                  ? "+"
                  : operation === "SUBTRACTION"
                  ? "-"
                  : operation === "MULTIPLICATION"
                  ? "*"
                  : operation === "DIVISION"
                  ? "/"
                  : ""
              }}
            </div>

            <div class="number-2">{{ randomNumberTwo }}</div>
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
                <input
                  @click="addAnswer(this.randOne)"
                  type="radio"
                  name="answer_1"
                  id="answer_1"
                />
                <label for="answer_1">{{ randOne }}</label>

                <input
                  type="radio"
                  name="answer_2"
                  id="answer_2"
                  @click="addAnswer(this.randTwo)"
                />
                <label for="answer_2">{{ randTwo }}</label>

                <input
                  type="radio"
                  name="answer_3"
                  id="answer_3"
                  @click="addAnswer(this.answer)"
                />
                <label for="answer_3">{{ answer }}</label>

                <input
                  type="radio"
                  name="answer_4"
                  id="answer_4"
                  @click="addAnswer(this.randThree)"
                />
                <label for="answer_4">{{ randThree }}</label>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card card-body shadow">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Score</th>
                <th>Level</th>
                <th>Operations</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="results">
              <tr v-for="(result, index) in results" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ result.score }}</td>
                <td>{{ result.level }}</td>
                <td>{{ result.operation }}</td>
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
import { randomAnswerOne } from "./random/random";
import {
  randomOneBeginner,
  randomTwoBeginner,
  randomOneJunior,
  randomTwoJunior,
  randomOneMiddle,
  randomTwoMiddle,
} from "./random/randomLevel";
export default {
  components: {
    ModalPage,
    StartGame,
  },
  props: {
    hideHomePage: { type: Function },
    hideGamePage: { type: Function },
  },
  data() {
    return {
      level: "",
      operation: "",
      randomNumberOne: null,
      randomNumberTwo: null,
      randOne: null,
      randTwo: null,
      randThree: null,
      answer: null,
      score: 0,
      time: 10,
      results: [],
      start: false,
      modal: false,
      game: false,
      count: 4,
    };
  },
  mounted() {
    this.getDegresAndOperator();
    this.randomNumber();
    this.result();
    this.addRandomAnswer();
  },
  methods: {
    saveLocalStorage(result) {
      localStorage.setItem("result", JSON.stringify(result));
    },
    answering() {
      if (this.operation === "ADDITION") {
        this.answer = this.randomNumberOne + this.randomNumberTwo;
      } else if (this.operation === "SUBTRACTION") {
        this.answer = this.randomNumberOne - this.randomNumberTwo;
      } else if (this.operation === "MULTIPLICATION") {
        this.answer = this.randomNumberOne * this.randomNumberTwo;
      } else {
        this.answer = this.randomNumberOne / this.randomNumberTwo;
      }
      return this.answer;
    },
    addRandomAnswer() {
      let ans = this.answering();
      console.log(ans);
      this.randOne = ans + randomAnswerOne();
      this.randTwo = ans - randomAnswerOne();
      this.randThree = ans + 1;
    },
    getDegresAndOperator() {
      const lStorage = JSON.parse(localStorage.getItem("data"));
      this.level = lStorage.level;
      this.operation = lStorage.operation;
    },
    randomNumber() {
      const local = JSON.parse(localStorage.getItem("data"));

      if (local.level === "BEGINNER") {
        this.randomNumberOne = randomOneBeginner();
        this.randomNumberTwo = randomTwoBeginner();
      }

      if (local.level === "JUNIOR") {
        this.randomNumberOne = randomOneJunior();
        this.randomNumberTwo = randomTwoJunior();
      }

      if (local.level === "MIDDLE") {
        this.randomNumberOne = randomOneMiddle();
        this.randomNumberTwo = randomTwoMiddle();
      }
    },
    addAnswer(value) {
      let ans = this.answering();

      if (value === ans) {
        console.log("Tog'ri javob!");
        this.randomNumber();
        this.addRandomAnswer();
        this.score++;
      } else {
        this.score -= 2;
        this.randomNumber();
        this.addRandomAnswer();
      }
    },
    saveGame() {
      this.modal = !this.modal;
      this.results.push({
        score: this.score,
        level: this.level,
        operation: this.operation,
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
      this.randomNumber();
      this.gameEndTime();
    },
    closeAndResutlView() {
      this.modal = !this.modal;
      console.log(this.results);
      this.start = false;
    },
    startGame() {
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
