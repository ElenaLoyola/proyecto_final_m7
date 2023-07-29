<template>
    <div id="noEncontrada">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
    </div>
</template>

<script>
export default {
    name: 'NotFoundView',
}
</script>

<style>
#noEncontrada {
    padding: 2%;
    margin: 0 auto;
    width: 60%;
    margin-top: 40px;
    background: rgb(78, 51, 122);
    background: linear-gradient(173deg, rgba(78, 51, 122, 1) 0%, rgba(153, 29, 253, 1) 50%, rgba(255, 255, 255, 1) 100%);
    color: rgb(123, 221, 224);
    text-align: center;
}

h1 {
    font-size: 100px;
}

h2 {
    text-shadow: 1px 1px black;
}
</style>