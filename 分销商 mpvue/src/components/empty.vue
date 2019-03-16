<template>
  <div class="empty fccc">
    <img src="../../static/images/empty.png" alt>
    <span style="margin-top: 4px;">{{text}}</span>
  </div>
</template>
<script>
export default {
  props: ["text"]
};
</script>
<style lang="scss" scoped>
.empty {
  height: 100%;
  width: 100%;
  img {
    width: 152px;
    height: 152px;
  }
  span {
    font-size: 12px;
    font-weight: 400;
    color: rgba(200, 200, 210, 1);
    line-height: 17px;
  }
}
</style>


