import Api from "../services/api";

const types = {
    LOGIN_PENDING: "LOGIN_PENDING",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",

    LOGOUT_PENDING: "LOGOUT_PENDING",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAILURE: "LOGOUT_FAILURE",

  
};
export const actions = {
    submitLogin: async (dispatch, data) => {
        dispatch({ type: types.LOGIN_PENDING });
        const json = await Api.login(data);
        if (json !== undefined) {
            if (200 === json.data.code) {
                // Omit the password from the response data
                const responseData = json.data;
                delete responseData.userInfo.password;
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    data: responseData,
                });
            } else {
                dispatch({ type: types.LOGIN_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.LOGIN_FAILURE, data: "" });
        }
        return json;
    },

 
    logoutAction: (dispatch) => {
        // Reset the user state
        dispatch({
            type: types.LOGIN_SUCCESS,
            data: "",
        });
    }

};
const initialState = {
    user: {},
    error: "",
    isSubmitting: false,
};
export const reducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case types.LOGIN_PENDING: {
            return {
                ...state,
                error: "",
                isSubmitting: true,
            };
        }
        case types.LOGIN_SUCCESS: {
            return {
                ...state,
                error: "",
                isSubmitting: false,
                user: data,
            };
        }
        case types.LOGIN_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                error: data,
            };
        }

        case types.LOGOUT_SUCCESS: {
            return {
                ...state,
                error: "",
                isSubmitting: false,
                user: data,
            };
        }
        default:
            return state;
    }
};
