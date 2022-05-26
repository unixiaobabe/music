<template>
  <div>
    <p class="title">推荐音乐</p>
    <van-row gutter="6">
      <van-col span="8" v-for="item in reList" :key="item.id">
        <van-image width="100%" height="120" :src="item.picUrl" />
        <span class="song_name">{{ item.name }}</span>
      </van-col>
    </van-row>
    <p class="title">最新音乐</p>
    <song-item
    v-for="item in songList"
    :key="item.id"
    :name='item.name'
    :author="item.song.artists[0].name"
    ></song-item>
  </div>
</template>

<script>
import { recommendMusicAPI, newMusicAPI } from "@/api";
import songItem from "@/components/songItem.vue";
export default {
  components: { songItem },
  data() {
    return {
      reList: [],
      songList: [],
    };
  },
  created() {
    this.getData();
    this.getMusic();
  },
  methods: {
    async getData() {
      let res = await recommendMusicAPI({ limit: 6 });
      this.reList = res.data.result;
    },
    async getMusic() {
      let res = await newMusicAPI({ limit: 20 });
      console.log("newMusic", res.data.result);
      this.songList = res.data.result;
    },
  },
};
</script>

<style scoped>
.title {
  margin: 0;
  height: 50px;
  line-height: 50px;
  background-color: #eee;
  padding-left: 10px;
  color: #333;
}
.song_name {
  font-size: 14px;
}
</style>