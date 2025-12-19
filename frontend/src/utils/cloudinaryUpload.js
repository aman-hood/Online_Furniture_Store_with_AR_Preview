export const uploadToCloudinary = async (file) => {
  const CLOUD_NAME = "YOUR_CLOUD_NAME";
  const UPLOAD_PRESET = "YOUR_UNSIGNED_PRESET";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  return data.secure_url;
};
