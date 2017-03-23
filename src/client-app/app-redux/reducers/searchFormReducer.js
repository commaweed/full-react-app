export default function reducer(state={
   queryResults: [],
   fetching: false,
   fetched: false,
   error: null
}, action) {

   switch (action.type) {

      case "SUBMIT_QUERY": {
         return {
            ...state,
            fetched: false,
            fetching: true
         };
      }

      case "SUBMIT_QUERY_FULFILLED": {
         return {
            ...state,
            fetched: true,
            fetching: false,
            queryResults: action.payload,
         };
      }

      case "SUBMIT_QUERY_REJECTED": {
         return {
            ...state,
            fetching: false,
            error: action.payload
         };
      }

   }

   return state;
}