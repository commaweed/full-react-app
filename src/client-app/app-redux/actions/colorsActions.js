export function fetchColors() {

   const COLORS = [
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Black',
      'White',
   ];

   return function (dispatch) {
      // simulate ajax request
      setTimeout(function(){
         dispatch({
            type: "FETCH_COLORS_FULFILLED",
            payload: COLORS
         });
      }, 3000);
   }
}