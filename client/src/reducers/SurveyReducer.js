export default function (state = [], action) {
  switch (action.type) {
    case 'survey_data':
      return action.payload;
    default:
      return state;
  }
}
