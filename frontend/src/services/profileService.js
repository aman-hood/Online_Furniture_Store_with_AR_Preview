export async function getProfile() {
  const res = await fetch("http://localhost:3000/api/users/me", {
    credentials: "include",
  });
  const data = await res.json();
  return data.user;
}

export async function updateProfile(data) {
  const res = await fetch("http://localhost:3000/api/users/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return (await res.json()).user;
}

export async function updateAddress(data) {
  const res = await fetch("http://localhost:3000/api/users/address", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return (await res.json()).user;
}

export async function changePassword(data) {
  return fetch("http://localhost:3000/api/users/change-password", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
}

export async function logoutUser() {
  await fetch("http://localhost:3000/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
}
