<script lang="ts">
  import './app.pcss'
  import Game from "./lib/game/wrapper.svelte"
</script>

<header class="w-full bg-red-500 text-center text-white py-2 px-4">
    Внимание! Сейчас пользуйтесь БЕТА версией сайта. <br>
  Связь с разработчиком: <a href="https://t.me/BoggerByte" class="hover:underline" target="_blank">@BoggerByte</a>
</header>
<main class="container mx-auto sm:px-12 px-6 pt-6 h-[100vh]">
  <Game />
</main>
