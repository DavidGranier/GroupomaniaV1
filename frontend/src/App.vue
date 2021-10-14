<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

html body {
  margin: 0;
}

#app {
  background: rgb(37,52,78);
  background: linear-gradient(90deg, rgba(37,52,78,1) 0%, rgba(10,35,52,1) 33%);
  font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

.bouton {
  text-align: center;
  width: 250px;
  height: 40px;
  margin: 10px;
  border: none;
  color: white;
  background: rgb(37,52,78);
  background: linear-gradient(90deg, rgba(37,52,78,1) 0%, rgba(10,35,52,1) 33%);
}
  
.bouton:hover{
  cursor: pointer;
  background: rgb(37,52,78);
  background: linear-gradient(90deg, rgba(37,52,78,1) 100%, rgba(10,35,52,1) 33%);
}

.contenu{
  background: #ecf0f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;  
}
</style>
