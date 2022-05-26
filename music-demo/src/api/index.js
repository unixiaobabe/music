//api文件下，各个请求模块js，都统一来到index.js再向外导出
import { recommendMusic ,newMusic} from "./Home";
import { hotSearch, searchRes } from "./Search";

export const recommendMusicAPI = recommendMusic //首页推荐歌单的api

export const newMusicAPI = newMusic //首页新音乐的api

export const hotSearchAPI = hotSearch //热搜列表

export const searchResAPI = searchRes
