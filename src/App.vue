<script>
export default {
  data() {
      return {
        activeComp: ''
      }
    }
}
</script>
<template>
  <header>
    <p>Como Deseja Ver os Dados?</p>
    <router-link to="/">Grafico</router-link>
    <router-link to="/countries">Dados por País</router-link><br>
  </header>
  <div id="project">
    <router-view></router-view>
  </div>
</template>



<style scoped>

  #project{
    width: 100%;
  }
  a {
    display: inline-block;
    background-color: black;
    border-radius: 8px;
    color: white;
    padding: 7px;
    margin: 10px;
  }
  a:hover,
  a.router-link-active {
    background-color: rgb(110, 79, 13);
  }
  div {
    padding: 20px;
  }
</style>
