<template>
  <div class="container">
    <h2 class="text-center my-3">Choise an Operation</h2>
    <div class="operations d-flex w-100 justify-content-center">
      <input
        type="radio"
        name="addition"
        id="addition"
        value="ADDITION"
        v-model="addition"
      />
      <label for="addition">
        <div>+</div>
      </label>

      <input
        type="radio"
        name="subtraction"
        id="subtraction"
        value="SUBTRACTION"
        v-model="subtraction"
      />
      <label for="subtraction">
        <div>-</div>
      </label>

      <input
        type="radio"
        name="multiplication"
        id="multiplication"
        value="MULTIPLICATION"
        v-model="multiplication"
      />
      <label for="multiplication">
        <div>*</div>
      </label>

      <input
        type="radio"
        name="division"
        id="division"
        value="DIVISION"
        v-model="division"
      />
      <label for="division">
        <div>/</div>
      </label>
    </div>
    <div class="levelss my-5 text-center">
      <h3>Select a Level</h3>
      <div class="levels d-flex justify-content-center">
        <div class="level-1">
          <input
            type="radio"
            name="level_1"
            id="level_1"
            value="BEGINNER"
            v-model="level_1"
          />
          <label for="level_1">Level 1</label>
        </div>
        <div class="level-2">
          <input
            type="radio"
            name="level_2"
            id="level_2"
            value="JUNIOR"
            v-model="level_2"
          />
          <label for="level_2">Level 2</label>
        </div>
        <div class="level-3">
          <input
            type="radio"
            name="level_3"
            id="level_3"
            value="MIDDLE"
            v-model="level_3"
          />
          <label for="level_3">Level 3</label>
        </div>
      </div>
    </div>
    <div class="btnSave d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-success w-50"
        @click="saveLevelAndOperation"
      >
        Save
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hideHomePage: { type: Function },
    hideGamePage: { type: Function },
  },
  data() {
    return {
      addition: null,
      subtraction: null,
      multiplication: null,
      division: null,
      level_1: null,
      level_2: null,
      level_3: null,
    };
  },

  mounted() {
    if (JSON.parse(localStorage.getItem("data")) !== null) {
      this.hideHomePage();
    }
  },
  methods: {
    saveLevelAndOperation() {
      if (
        (this.addition === null &&
          this.subtraction === null &&
          this.multiplication === null &&
          this.division === null) ||
        (this.level_1 === null &&
          this.level_2 === null &&
          this.level_3 === null)
      ) {
        return;
      }

      this.operationAndLevel = {
        operation: this.addition
          ? this.addition
          : this.subtraction
          ? this.subtraction
          : this.multiplication
          ? this.multiplication
          : this.division
          ? this.division
          : null,
        level: this.level_1
          ? this.level_1
          : this.level_2
          ? this.level_2
          : this.level_3
          ? this.level_3
          : null,
      };
      console.log(this.operationAndLevel);
      localStorage.setItem("data", JSON.stringify(this.operationAndLevel));
      this.hideHomePage();
    },
  },
};
</script>

<style scoped>
.operations label {
  width: 200px;
  height: 200px;
  background: rgb(17, 177, 245);
  margin-right: 20px;
  padding-top: 10px;
  text-align: center;
  color: white;
  border-radius: 15px;
  box-shadow: 1px 1px 3px 4px rgb(0 0 0 / 26%);
}
.operations input {
  display: none;
}

#addition:checked ~ label[for="addition"] {
  background: rgb(4, 1, 55);
}
#subtraction:checked ~ label[for="subtraction"] {
  background: rgb(4, 1, 55);
}
#multiplication:checked ~ label[for="multiplication"] {
  background: rgb(4, 1, 55);
}
#division:checked ~ label[for="division"] {
  background: rgb(4, 1, 55);
}

label div {
  text-align: center;
  font-size: 100px;
}

/* Level design */
.levelss label {
  height: 200px;
  width: 200px;
  background: rgb(4, 1, 55);
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 45px;
  border-radius: 15px;
}

#level_1:checked ~ label[for="level_1"] {
  background: rgb(17, 177, 245);
}
#level_2:checked ~ label[for="level_2"] {
  background: rgb(17, 177, 245);
}
#level_3:checked ~ label[for=level_3] {
  background: rgb(17, 177, 245);
}

.levels input {
  display: none;
}

button {
  font-size: 25px;
  margin: 0 auto;
}
</style>
