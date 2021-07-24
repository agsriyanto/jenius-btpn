const initialReducers = {
  contacts: [],
  loading: false,
  error: null,
  statusEdit: "",
  statusDelete: "",
  statusPost: "",
  idCard: "",
};

export default function contactReducers(state = initialReducers, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts].push(payload) };
    case "EDIT_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts].map((contact) => {
          if (contact.id === action.payload.id) contact = action.payload.data;
          return contact;
        }),
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contact: [...state.contacts].filter(
          (contact) => contact.id !== action.payload.id
        ),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_STATUS_EDIT":
      return { ...state, statusEdit: action.payload };
    case "SET_STATUS_DELETE":
      return { ...state, statusDelete: action.payload };
    case "SET_STATUS_POST":
      return { ...state, statusPost: action.payload };
    case "SET_ID_CARD":
      return { ...state, idCard: action.payload };
    default:
      return state;
  }
}
