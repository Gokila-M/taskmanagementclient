let baseUrl = "http://localhost:7373/api/";

export const createUser = async (body) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${baseUrl}user/create`, requestOptions);

  if (!response.ok) {
    let data = await response.json();
    return { ok: false, data };
  }

  let data = await response.json();
  return { ok: true, data };
};


export const UserLogin = async (body) => {
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${baseUrl}user/login`, requestOptions);

  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }

  let data = await response.json();
  return { data: data, ok: true };
};

export const getAllUsers = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${baseUrl}user/getalluser`, requestOptions);
  if (!response.ok) {
    let data = await response?.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};
export const getUserProfile = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    token = JSON.parse(token);
  }
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
       token: token,
    },
  };
  const response = await fetch(`${baseUrl}user/profile`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

//  Task management

export const createTask = async (body) => {
  let token = localStorage.getItem("token");
  if (token) {
    token = JSON.parse(token);
  }
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}task/addtask`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const getAllTask = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${baseUrl}task/getalltask`, requestOptions);
  if (!response.ok) {
    let data = await response?.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};
export const updateTask = async (id, body) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await fetch(`${baseUrl}updatetask/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return { data, ok: res.ok };
};

export const getSingleTask = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await fetch(`${baseUrl}/gettaskbyId/${id}`, {
    headers: {
      token
    }
  });

  const data = await res.json();
  return { data, ok: res.ok };
};

export const deleteTask = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await fetch(`${baseUrl}task/deletetask/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  const data = await res.json();
  return { data, ok: res.ok };
};
