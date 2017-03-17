//import axios from "axios";

export function submitQuery(query) {

   console.log('Submitting Query values', query);

   const data = [];

   return function (dispatch) {
      // simulate ajax request
      setTimeout(function(){
         dispatch({
            type: "SUBMIT_QUERY_FULFILLED",
            payload: data
         });
      }, 3000);

      //axios.get('query', { params: query }).then((response) => {
      //   dispatch({
      //      type: "SUBMIT_QUERY_FULFILLED",
      //      payload: response.data
      //   });
      //}).catch((error) => { dispatch({ type: "SUBMIT_QUERY_REJECTED", payload: error }); });
   }
}