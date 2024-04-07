import Api from "../services/api";
const types = {
    SUBMIT_PROMPT_PENDING: "SUBMIT_PROMPT_PENDING",
    SUBMIT_PROMPT_SUCCESS: "SUBMIT_PROMPT_SUCCESS",
    SUBMIT_PROMPT_FAILURE: "SUBMIT_PROMPT_FAILURE",

    FETCH_BOOK_PENDING: "FETCH_BOOK_PENDING",
    FETCH_BOOK_SUCCESS: "FETCH_BOOK_SUCCESS",
    FETCH_BOOK_FAILURE: "FETCH_BOOK_FAILURE",

    UPDATE_PROMPT_PENDING: " UPDATE_PROMPT_PENDING",
    UPDATE_PROMPT_SUCCESS: "UPDATE_PROMPT_SUCCESS",
    UPDATE_PROMPT_FAILURE: "UPDATE_PROMPT_FAILURE",

    DELETE_BOOK_PENDING: "DELETE_BOOK_PENDING",
    DELETE_BOOK_SUCCESS: "DELETE_BOOK_SUCCESS",
    DELETE_BOOK_FAILURE: "DELETE_BOOK_FAILURE",

    FETCH_GENRE_PENDING: "FETCH_GENRE_PENDING",
    FETCH_GENRE_SUCCESS: "FETCH_GENRE_SUCCESS",
    FETCH_GENRE_FAILURE: "FETCH_GENRE_FAILURE",

    DELETE_USER_AND_BOOKS_PENDING: "DELETE_USER_AND_BOOKS_PENDING",
    DELETE_USER_AND_BOOKS_SUCCESS: "DELETE_USER_AND_BOOKS_SUCCESS",
    DELETE_USER_AND_BOOKS_FAILURE: "DELETE_USER_AND_BOOKS_FAILURE",
};
export const actions = {

    fetchGenre: async (dispatch) => {
        dispatch({ type: types.FETCH_GENRE_PENDING });
        const json = await Api.getGenre();

        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.FETCH_GENRE_SUCCESS,
                    data: json?.data?.genres,
                });
            } else {
                dispatch({
                    type: types.FETCH_GENRE_FAILURE,
                    data: json.data?.error?.message,
                });
            }
        }
        return json;
    },

    submitPrompt: async (dispatch, data) => {
        dispatch({ type: types.SUBMIT_PROMPT_PENDING });
        const json = await Api.submitBook(data);
        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.SUBMIT_PROMPT_SUCCESS,
                    data: json?.data,
                });
            } else {
                dispatch({ type: types.SUBMIT_PROMPT_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.SUBMIT_PROMPT_FAILURE, data: "" });
        }
        return json;
    },

      updatePrompt : async (dispatch, id, data) => {
        dispatch({ type: types.UPDATE_PROMPT_PENDING }); // Dispatch a pending action
    
        try {
            const response = await Api.updateBook(id, data); // Call your API function to update the book
    
            if (response?.status === 200) { // Check if the response status is 200
                dispatch({ type: types.UPDATE_PROMPT_SUCCESS, data: response.data }); // Dispatch a success action with the data
            } else {
                dispatch({ type: types.UPDATE_PROMPT_FAILURE, data: '' }); // Dispatch a failure action with empty data
            }
    
            return response; // Return the response
        } catch (error) {
            console.error('Error updating book:', error);
            dispatch({ type: types.UPDATE_PROMPT_FAILURE, data: '' }); // Dispatch a failure action with empty data
            return undefined; // Return undefined to indicate an error
        }
    },

    fetchBooks: async (dispatch) => {
        dispatch({ type: types.FETCH_BOOK_PENDING });
        const json = await Api.getAllBooks();
        console.log(json,"JSON");
        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.FETCH_BOOK_SUCCESS,
                    data: json.data?.books,
                });
            } else {
                dispatch({
                    type: types.FETCH_BOOK_FAILURE,
                    data: json.data?.error?.message,
                });
            }
        }
        return json;
    },

 
    deleteBook: async (dispatch, id) => {
        dispatch({ type: types.DELETE_BOOK_PENDING });
        const json = await Api.deleteBookById(id);
        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.DELETE_BOOK_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({
                    type: types.DELETE_BOOK_FAILURE,
                    data: json.data?.error?.message,
                });
            }
        }
        return json;
    },

 deleteUserAndBooks : async (dispatch) => {
        dispatch({ type: types.DELETE_USER_AND_BOOKS_PENDING });
        try {
            const response = await Api.deleteUserBooks();
            if (response && response.status === 200) {
                dispatch({
                    type: types.DELETE_USER_AND_BOOKS_SUCCESS,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: types.DELETE_USER_AND_BOOKS_FAILURE,
                    error: response.data?.error?.message || "Failed to delete user and books",
                });
            }
            return response;
        } catch (error) {
            dispatch({
                type: types.DELETE_USER_AND_BOOKS_FAILURE,
                error: "An error occurred while deleting user and books",
            });
            return error;
        }
    }
    

};
const initialState = {
    data: {},
    genre: [],
    books: [],
    deletedBook: {},
    updateBook:{},
    error: {},
    deletedBooknadUser:{},
    isSubmitting: false,
};
export const reducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {

        case types.SUBMIT_PROMPT_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.SUBMIT_PROMPT_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                data: data,
            };
        }
        case types.SUBMIT_PROMPT_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data,
            };
        }
        case types.UPDATE_PROMPT_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.UPDATE_PROMPT_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                data: data,
            };
        }
        case types.UPDATE_PROMPT_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data,
            };
        }

        case types.FETCH_BOOK_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.FETCH_BOOK_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                books: data,
            };
        }
        case types.FETCH_BOOK_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data,
            };
        }
       
        case types.FETCH_CHAT_BY_ID_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.FETCH_CHAT_BY_ID_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                getChatById: data
                ,
            };
        }
        case types.FETCH_CHAT_BY_ID_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data,
            };
        }

        case types.DELETE_BOOK_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.DELETE_BOOK_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                deletedBook: data,
            };
        }
        case types.DELETE_BOOK_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data,
            };
        }
        case types.DELETE_USER_AND_BOOKS_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.DELETE_USER_AND_BOOKS_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                deletedBooknadUser: data,
            };
        }
        case types.DELETE_USER_AND_BOOKS_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data,
            };
        }
        case types.FETCH_GENRE_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.FETCH_GENRE_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                genre: data,
            };
        }
        case types.FETCH_GENRE_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data,
            };
        }

        default:
            return state;
    }
};
