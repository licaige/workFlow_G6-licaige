// 主文件，将所有redux文件集合
import {combineReducers} from 'redux'
import player from "./player.redux";
import rank from "./rank.redux";
import recommend from "./recommend.redux";
import search from "./search.redux";
import songList from "./songList.redux";

// 抛出
export default combineReducers({player,rank,recommend,search,songList})