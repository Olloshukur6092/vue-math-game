<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 border-right">
        <h2>Add Todo</h2>
        <div class="card card-body shadow border-0 mb-4">
          <form @submit.prevent="saveHamyon">
            <div class="mb-3">
              <label for="money">Hamyondagi umumiy pul (so'm):</label>
              <input
                id="money"
                type="number"
                class="form-control my-2"
                placeholder="Umumiy summani kiriting(so'mda hisoblanadi) "
                v-model="money"
              />
              <input type="submit" value="Saqlash" class="btn btn-success" />
            </div>
          </form>
        </div>
        <h2>Sotish va Sotib olish qismi</h2>

        <div class="card card-body shadow" v-if="vcard1">
          <h2><span>Umumiy Summa: </span> {{ umumiy }} so'm</h2>
          <form @submit.prevent="saveSotibOlishYokiSotish">
            <div class="mb-3">
              <label for="productName"
                >Sotgan yoki sotib olgan mahsuloti:</label
              >
              <input
                id="productName"
                type="text"
                placeholder="Mahsulot nomi"
                class="form-control my-2"
                v-model="product_name"
              />
            </div>
            <div class="mb-3">
              <label for="productPrice"
                >Sotgan yoki sotib olgan mahsulotning narxi (so'm):</label
              >
              <input
                id="productPrice"
                type="number"
                placeholder="Mahsulot narxi"
                class="form-control my-2"
                v-model="product_price"
              />
            </div>
            <label>
              <input
                type="radio"
                value="sotdim"
                class="me-2"
                name="oldim"
                id="oldim"
                v-model="sotdim"
              />
              <span>Sotdim</span>
            </label>
            <label>
              <input
                type="radio"
                name="oldim"
                id="oldim"
                value="oldim"
                class="me-2 ms-5"
                v-model="oldim"
              />
              <span>Oldim</span>
            </label>
            <div class="mb-3 mt-2">
              <input type="submit" value="Saqlash" class="btn btn-success" />
            </div>
          </form>
        </div>
      </div>

      <div class="col-md-6">
        <h2>Show Todo</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: { type: Function },
  },
  data: () => {
    return {
      vcard1: false,
      money: "",
      product_name: "",
      product_price: "",
      sotdim: null,
      oldim: null,
      paying: [],
      umumiy: null,
    };
  },
  mounted() {
    this.showPayed();
  },
  methods: {
    saveHamyon() {
      if (this.money === "") {
        return;
      }

      localStorage.setItem("money", this.money);
      this.money = "";
      this.showPayed();
    },

    showPayed() {
      this.umumiy = localStorage.getItem("money");
      if (this.umumiy === null) return;

      this.vcard1 = !this.vcard1;
    },

    saveSotibOlishYokiSotish() {
      if (this.product_name === "" || this.product_price === "") {
        return;
      }
      this.paying.push({
        productName: this.product_name,
        productPrice: this.product_price,
        sotOl: this.sotdim ? this.sotdim : this.oldim,
        status: this.sotdim ? "1" : "0",
      });
      localStorage.setItem("paying", JSON.stringify(this.paying));
      this.product_name = "";
      this.product_price = "";
      this.sotdim = null;
      this.oldim = null;
      //   if (this.oldim) {
      //     this.umumiy = this.umumiy - this.product_price;
      //   }
      //   console.log(this.paying);
    },  
  },
};
</script>

<style scoped>
.border-right {
  border-right: 2px solid #aaa;
}
</style>
