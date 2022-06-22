<template>
  <div>
    <title>Inscription - Gorosa mon amour</title>
    <div class="login-form">
      <form @submit.prevent="createUser()">
        <h2 class="text-center">Inscription</h2>
        <div class="form-group">
          <input v-model='name' placeholder="username" class="form-control" required>
        </div>

        <div class="form-group">
          <input type="email" v-model="email" placeholder="email" class="form-control" required>
        </div>

        <div class="form-group">
          <input type="password" v-model="password" placeholder="password" class="form-control" required>
        </div>

         <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Rejoindre le véritable site de l'Agence Spatiale Gorosienne</button>
        </div> 

      </form>
  </div>
</template>

<script>
module.exports = {
  props: {
  },
  data () {
    return {
      email: '',
      password: '',
      name
    }
  },
  async mounted () {
  },
  methods: {
    async createUser() {
      console.log("inside create user")
      await axios.post('/api/register', {
        email: this.email,
        password: this.password,
        name: this.name
      })
      console.log("after inside create user")
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.login-form {
  width: 70%;
  margin: 100px auto;
}
.login-form form {
  margin-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.493);
  padding: 30px;
}
.login-form h2 {
  text-align:center;
  margin: 0 0 15px;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
}

.form-control {
  min-height: 38px;
  border-radius: 3px;
  margin: auto;
  margin-bottom: 4px;
  display: block;
  background-color: rgb(255, 255, 255, 0.850);
}

.btn {        
    font-size: 15px;
    display: block;
    letter-spacing: 2px;
    margin: 30px auto auto;
    min-height: 34px;
    border-radius: 3px;
    transition: all 0.3s ease 0s;
}


form{
  margin-top:auto;
  text-align: center;
}
</style>
