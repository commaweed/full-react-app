export default function reducer(state={
   colors: [],
   fetching: false,
   fetched: false
}, action) {

   switch (action.type) {

      case "FETCH_COLORS_FULFILLED": {
         return {
            ...state,
            fetched: true,
            colors: action.payload
         };
      }

   }

   return state;
}