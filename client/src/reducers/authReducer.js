export default function (state = null, action) {
  switch (action.type) {
    case 'user_login':
      return action.payload || false;
    default:
      return state;
  }
}
