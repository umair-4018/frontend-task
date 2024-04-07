/**
 * @format
 */
import axios from "axios";
let isTokenSet = false;
export default class Api {
    _api = null;
    static init = ({ url }) => {
        try {
            this._api = axios.create({
                baseURL: url,
                timeout: 0,
            });
        } catch (error) {
            return error;
        }
    };
    static setClientToken = async (token) => {
        console.log(token,"token-----");
        if (this._api) {
          this._api.interceptors.request.use(function (config) {
            config.headers.Authorization = token ? `Bearer ${token}` : ''; // Ensure token is defined
            isTokenSet = !!token;
            return config;
          });
        }
      };

    //   static VerifyAuthUserToken = () => {
    //     // Add a response interceptor
    //     this._api.interceptors.response.use(
    //       function (response) {
    //         return response;
    //       },
    //       function (error) {
    //         if (error.response.status === 401) {
    //           store.dispatch({
    //             type: "API_TOKEN_EXPIRE",
    //             payload: error,
    //           });
    //           return Promise.reject(error);
    //         }
    //         return Promise.reject(error);
    //       }
    //     );
    //   };

    /*************** auth API  ******************/

    static login = async data => {
        try {
            const response = await this._api.post("api/auth/login", data);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static register = async (data) => {
        try {
            const response = await this._api.post("api/auth/register", data);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static deleteUserBooks = async () => {
        try {
            const response = await this._api.delete("api/delete-user-books");
            return response;
        } catch (error) {
            return error.response;
        }
    };
 

    /*************** chatbot API  ******************/
    // post conversation
    static submitBook = async data => {
    
        try {
            const response = await this._api.post("/api/create-book", data);
           

            return response;
        } catch (error) {
            return error.response;
        }
    };
    static updateBook = async (id,data) => {
    
        try {
            const response = await this._api.put(`/api/update-book/${id}`, data);
           

            return response;
        } catch (error) {
            return error.response;
        }
    };
    //get conversation by category
    static getGenre = async () => {
        try {
            const response = await this._api.get("api/get-genre");
            return response;
        } catch (error) {
            return error.response;
        }
    };
    
    //delete book by id
    static deleteBookById = async id => {
        try {
            const response = await this._api.delete(`/api/delete-book/${id}`);
            console.log(response,"_____");
            return response;
        } catch (error) {
            return error.response;
        }
    };
    //get all conversation
    static getAllBooks = async () => {
        try {
        
            const response = await this._api.get("/api/get-books");
            return response;
        } catch (error) {
            return error.response;
        }
    };
}
