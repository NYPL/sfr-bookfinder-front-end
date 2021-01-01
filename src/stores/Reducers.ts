// import { combineReducers } from "redux";
// import { Actions } from "../actions/SearchActions";
// import initialState from "./InitialState";

// export const errorMsg = (state = null, action: any) => {
//   switch (action.type) {
//     case Actions.ERRORMSG:
//       return action.errorMsg;
//     default:
//       return state;
//   }
// };

// export const loading = (state = null, action: any) => {
//   switch (action.type) {
//     case Actions.LOADING:
//       return action.loading;
//     default:
//       return state;
//   }
// };

// export const searchResults = (state = null, action: any) => {
//   switch (action.type) {
//     case Actions.SEARCH:
//       return {
//         data: action.results,
//       };
//     default:
//       return state;
//   }
// };

// export const workResult = (state = null, action: any) => {
//   switch (action.type) {
//     case Actions.FETCH_WORK:
//       return {
//         work: action.work,
//       };
//     default:
//       return state;
//   }
// };

// export const editionResult = (state = null, action: any) => {
//   switch (action.type) {
//     case Actions.FETCH_EDITION:
//       return {
//         edition: action.edition,
//       };
//     default:
//       return state;
//   }
// };

// export const searchQuery = (state = null, action: any) => {
//   if (action.type === Actions.SET_QUERY) {
//     return action.searchQuery;
//   }
//   return state;
// };

// export const totalWorks = (state = null, action: any) => {
//   if (action.type === Actions.GET_TOTAL_WORKS) {
//     return action.total;
//   }
//   return state;
// };

// export const sort = (state = null, action: any) =>
//   action.sort ? action.sort : state;

// // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
// const appReducer = combineReducers({
//   searchResults,
//   searchQuery,
//   sort,
//   workResult,
//   editionResult,
//   totalWorks,
//   loading,
//   errorMsg,
// });

// export const rootReducer = (state: any, action: any) => {
//   if (action.type === Actions.RESET_SEARCH) {
//     // Reset everything except total books
//     return Object.assign({}, initialState, {
//       totalWorks: state.totalWorks,
//     });
//   }
//   return appReducer(state, action);
// };

// export default rootReducer;
