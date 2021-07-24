import axios from "axios";

const url = "https://simple-contact-crud.herokuapp.com/contact";

const setContacts = (contacts) => {
  return {
    type: "SET_CONTACTS",
    payload: contacts,
  };
};

const setStatus = (type, payload) => {
  switch (type) {
    case "del":
      return { type: "SET_STATUS_DELETE", payload };
    case "edit":
      return { type: "SET_STATUS_EDIT", payload };
    default:
      return { type: "SET_STATUS_POST", payload };
  }
};

const setIdCard = (id) => {
  return {
    type: "SET_ID_CARD",
    payload: id,
  };
};

const setLoading = (loading) => {
  return {
    type: "SET_LOADING",
    payload: loading,
  };
};

const setError = (err) => {
  return {
    type: "SET_ERROR",
    payload: err,
  };
};

const get = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios({
      method: "GET",
      url,
    })
      .then(({ data }) => {
        dispatch(setContacts(data.data));
      })
      .catch((err) => {
        dispatch(setError(err.response.data.message));
      })
      .finally((_) => {
        dispatch(setLoading(false));
      });
  };
};

const post = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios({
      method: "POST",
      url,
      data,
    })
      .then(({ data }) => {
        dispatch(setStatus("post", data.message));
        dispatch(get());
      })
      .catch((err) => {
        dispatch(setStatus("post", err.response.data.message));
        dispatch(setError(err.response.data.message));
      })
      .finally((_) => {
        dispatch(setLoading(false));
      });
  };
};

const put = (id, data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios({
      method: "PUT",
      url: `${url}/${id}`,
      data,
    })
      .then(({ data }) => {
        dispatch(setStatus("edit", data.message));
        dispatch(get());
      })
      .catch((err) => {
        dispatch(setStatus("edit", err.response.data.message));
        dispatch(setError(err.response.data.message));
      })
      .finally((_) => {
        dispatch(setLoading(false));
      });
  };
};

const del = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios({
      method: "DELETE",
      url: `${url}/${id}`,
    })
      .then(({ data }) => {
        dispatch(get());
        dispatch(setStatus("del", data.message));
      })
      .catch((err) => {
        dispatch(setStatus("del", err.response.data.message));
        dispatch(setError(err.response.data.message));
      })
      .finally((_) => {
        dispatch(setLoading(false));
      });
  };
};

export default {
  get,
  post,
  put,
  del,
  setStatus,
  setIdCard,
};
