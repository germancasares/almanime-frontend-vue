<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>AlmAnime</strong> by passion and dedication for the fansub world.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.footer {
  @include themed() {
    background-color: t($background-footer);
    color: findColorInvert(t($background-footer));
  }
}

strong {
  @include themed() {
    color: findColorInvert(t($background-footer));
  }
}
</style>
