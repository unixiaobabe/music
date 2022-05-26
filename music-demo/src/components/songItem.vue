<template>
  <div>
    <van-cell
      :title="name"
      :label="author + ' ' + name"
      center
    >
      <template #right-icon>
        <van-icon name="play-circle-o" class="search-icon" size="20" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
    props:{
        name:String,
        author:String
    }
};
</script>

<style scoped>
</style>