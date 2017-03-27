import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { IStore } from "./IStore";
import { counterReducer } from "./modules/counterModule";
import { starsReducer } from "./modules/starsModule";

const { reducer } = require("redux-connect");

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  counter: counterReducer,
  stars: starsReducer,
  reduxAsyncConnect: reducer
});

export default rootReducer;