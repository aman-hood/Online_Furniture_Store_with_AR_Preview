export async function getProfile() {
  const res = await fetch("http://localhost:3000/api/users/me", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function updateProfile(data) {
  const res = await fetch("http://localhost:3000/api/users/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
}

export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch("http://localhost:3000/api/users/avatar", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("Avatar upload failed");
  return res.json();
}

export async function logoutUser() {
  await fetch("http://localhost:3000/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
}
