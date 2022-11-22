<template>
  <div class="container my-3">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card shadow">
          <div class="card-header border-0">
            <h2 class="text-center">User Register</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your name"
                  v-model="name"
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your email"
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your phone"
                  v-model="phone"
                />
              </div>
              <div class="mb-3">
                <input
                  type="submit"
                  class="btn btn-outline-success w-100"
                  value="Register"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const phone = ref("");
    const user = ref({});


    watch(user, (newUser) => {
        localStorage.setItem("user", JSON.stringify(newUser));
    })

    const register = () => {
        console.log("registered");
        if (name.value === "" || email.value === "" || phone.value === "") {
            return;
        }

        user.value = {
            name: name.value,
            email: email.value,
            phone: phone.value,
        };
        name.value = "";
        email.value = "";
        phone.value = "";
    }

    return {
      name,
      email,
      phone,
      register,
      user
    };
  },
};
</script>

<style scoped>
input {
  font-size: 18px;
}
</style>
