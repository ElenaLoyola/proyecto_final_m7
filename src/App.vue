<template>
  <div id="app">
    <div>
      <b-navbar id="barraNav" toggleable="sm" type="dark">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
        <b-navbar-brand>Cursos AlfaWeb</b-navbar-brand>
        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-text><router-link to="/"><i class="fa-solid fa-house"></i></router-link></b-nav-text>
            <b-nav-text><router-link to="/administracion"><i class="fa-solid fa-wrench" style="color: #ffffff;"></i></router-link></b-nav-text>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default{
  name: 'app',
  data:function(){
    return{
    }
  },
  props:{},
  components:{},
  methods:{
    ...mapActions('datos_cursos',['consultarCursos', 'consultarDatosTabla']),
  },
  computed:{},
  watch:{},
  beforeMount(){
    this.consultarCursos();
    this.consultarDatosTabla();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#barraNav {
    background-color: blueviolet;
    padding-left: 15px;
}
nav a.router-link-exact-active {
  color: #ffffff;
  text-decoration: none;
}
nav a {
  color: #ffffff;
  text-decoration: none;
  margin: 10px;
}
</style>
