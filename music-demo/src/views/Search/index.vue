<template>
  <div>
    <van-search
      @input="inputFn"
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
    />
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="(item, ind) in hotList"
          :key="ind"
          @click="searchFn(item.first)"
          >{{ item.first }}</span
        >
      </div>
    </div>
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <div class="hot_name_wrap">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <song-item v-for="item in resultList" :key="item.id" :name="item.name"
          :author="item.ar[0].name"
          :id="item.id"></song-item>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResAPI } from "@/api";
import songItem from "@/components/songItem.vue";
export default {
  components: { songItem },
  created() {
    this.getHotSearch();
  },
  data() {
    return {
      value: "",
      hotList: [],
      resultList: [],
      loading: false, //是否处于加载状态，加载过程中不触发load事件
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      page: 1, //当前搜索结果的页码
      timer: null, //计时器名称
    };
  },
  methods: {
    async onLoad() {
      //滚动条与底部距离小于offset触发
      //触底效果 加载下一页数据
      this.page++;
      let res = await this.getListFn();
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading = false; //数据加载完毕--保证下一次还能触发onLoad
    },
    //封装获取列表数据
    async getListFn() {
      let res = await searchResAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20, //偏移数量，用于分页，如（页数-1）*30，30为limit的值，默认为0
      });
      return res;
    },
    async getHotSearch() {
      let res = await hotSearchAPI();
      this.hotList = res.data.result.hots;
    },
    async searchFn(first) {
      //page从第一页获取
      this.page = 1;
      //+1 点击新关键词--可能有新的数据
      this.finished = false;
      this.value = first;
      let res = await this.getListFn();
      this.resultList = res.data.result.songs;
      //+2本次数据加载完毕，才能让list加载更多
      this.loading = false;
    },
    async inputFn() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        //page从第一页获取
        this.page = 1;
        //+3 关键词改变--可能有新的数据
        this.finished = false;
        if (this.value.length == 0) {
          this.resultList = [];
          return;
        }
        let res = await this.getListFn();
        if (res.data.result.songs === undefined) {
          this.resultList = [];
          return;
        }
        this.resultList = res.data.result.songs;
        console.log("resultList", res);
        //+4
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.search_wrap {
  padding: 5px;
}

.hot_title {
  font-size: 14px;
  color: #666;
}

.hot_name_wrap {
  margin: 5px;
}

.hot_item {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 8px;
  font-size: 14px;
  border-radius: 20px;
  border: 1px solid #333;
}
</style>