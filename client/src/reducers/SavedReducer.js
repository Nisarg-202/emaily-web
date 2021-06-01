export default function (state = null, action) {
  switch (action.type) {
    case 'saved_survey':
      return action.payload;
    default:
      return state;
  }
}
