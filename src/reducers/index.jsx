import { persistCombineReducers } from "redux-persist";
import AsyncStorage from "redux-persist/lib/storage";
import { reducer as SignupReducer } from "./SignupReducer";
import { reducer as LoginReducer } from "./LoginReducer";
import { reducer as BookReducer } from "./BookReducer";


const config = {
    key: "chatbot",
    storage: AsyncStorage,
    blacklist: [""],
    whitelist: ['login']

};

const appReducer = persistCombineReducers(config, {
    signup: SignupReducer,
    login: LoginReducer,
    book: BookReducer,

});

export default appReducer;
