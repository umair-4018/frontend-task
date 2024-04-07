import Api from "../services/api";
const types = {
    SUBMIT_SIGNUP_PAGE_PENDING: "SUBMIT_SIGNUP_PAGE_PENDING",
    SUBMIT_SIGNUP_PAGE_SUCCESS: "SUBMIT_SIGNUP_PAGE_SUCCESS",
    SUBMIT_SIGNUP_PAGE_FAILURE: "SUBMIT_SIGNUP_PAGE_FAILURE",

    FORGET_PASSWORD_PENDING: "FORGET_PASSWORD_PENDING",
    FORGET_PASSWORD_SUCCESS: "FORGET_PASSWORD_SUCCESS",
    FORGET_PASSWORD_FAILURE: "FORGET_PASSWORD_FAILURE",

    RESET_PASSWORD_PENDING: "RESET_PASSWORD_PENDING",
    RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
    RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE",

};
export const actions = {
    submitSignupForm: async (dispatch, data) => {
        dispatch({ type: types.SUBMIT_SIGNUP_PAGE_PENDING });
        const json = await Api.register(data);
        if (json !== undefined) {
            if (200 === json.data.code) {
                dispatch({
                    type: types.SUBMIT_SIGNUP_PAGE_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({ type: types.SUBMIT_SIGNUP_PAGE_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.SUBMIT_SIGNUP_PAGE_FAILURE, data: "" });
        }
        return json;
    },

    forgetPassword: async (dispatch, data) => {
        dispatch({ type: types.FORGET_PASSWORD_PENDING });
        const json = await Api.forgetPassword(data);
        if (json !== undefined) {
            if (200 === json.data.code) {
                dispatch({
                    type: types.FORGET_PASSWORD_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({ type: types.FORGET_PASSWORD_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.FORGET_PASSWORD_FAILURE, data: "" });
        }
        return json;
    },

    resetPassword: async (dispatch, data) => {
        dispatch({ type: types.RESET_PASSWORD_PENDING });
        const json = await Api.resetPassword(data);
        if (json !== undefined) {
            if (200 === json.data.code) {
                dispatch({
                    type: types.RESET_PASSWORD_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({ type: types.RESET_PASSWORD_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.RESET_PASSWORD_FAILURE, data: "" });
        }
        return json;
    },
};
// initial values
const initialState = {
    data: {},
    forgetPasswordData: {},
    resetPassword: {},
    error: "",
    isSubmitting: false,
};
// reducers
export const reducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case types.SUBMIT_SIGNUP_PAGE_PENDING: {
            return {
                ...state,
                error: "",
                isSubmitting: true,
            };
        }
        case types.SUBMIT_SIGNUP_PAGE_SUCCESS: {
            return {
                ...state,
                error: "",
                isSubmitting: false,
                data: data,
            };
        }
        case types.SUBMIT_SIGNUP_PAGE_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                error: data,
            };
        }

        case types.FORGET_PASSWORD_PENDING: {
            return {
                ...state,
                error: "",
                isSubmitting: true,
            };
        }
        case types.FORGET_PASSWORD_SUCCESS: {
            return {
                ...state,
                error: "",
                isSubmitting: false,
                forgetPasswordData: data,
            };
        }
        case types.FORGET_PASSWORD_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                error: data,
            };
        }

        case types.RESET_PASSWORD_PENDING: {
            return {
                ...state,
                error: "",
                isSubmitting: true,
            };
        }
        case types.RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                error: "",
                isSubmitting: false,
                reset: data,
            };
        }
        case types.RESET_PASSWORD_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                error: data,
            };
        }

        default:
            return state;
    }
};
