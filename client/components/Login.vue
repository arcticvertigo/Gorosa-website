<template>
  <div>
    <title>Connexion - Gorosa mon amour</title>
    <div class="login-form">
      
      <form @submit.prevent="loginUser()">
        <h2 class="text-center">Connexion</h2>
        <div class="form-group">
            <input v-model="email" placeholder="email" class="form-control" required>
        </div>
        <div class="form-group">
            <input type="password" v-model="password" placeholder="password" class="form-control" required>
        </div> 
        <div class="form-group">
            <button type="submit" class="btnl">Connexion</button>
        </div> 
      </form>

      <div>
        <button type="submit" class="h31"><router-link to='/register'>Inscription</router-link></button>
      </div>  
      
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'app',
  props: {

  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  async mounted () {
  },
  methods: {
    async loginUser() {
      console.log(this.email)
      this.$emit('login', {
        email: this.email,
        password: this.password
      })
      this.email="",
      this.password=""

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

.btnl {        
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

