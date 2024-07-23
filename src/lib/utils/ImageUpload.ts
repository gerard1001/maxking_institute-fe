export const checkImage = (file: File) => {
  const types = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 2 * 1024 * 1024) err = "The largest image size is 2mb";

  if (!types.includes(file.type)) err = "The image type is png / jpeg";

  return err;
};

export const imageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");
  formData.append("cloud_name", "rutagerard");

  if (file.size > 2 * 1024 * 1024)
    return { error: "The largest image size is 2mb" };

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/rutagerard/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return { public_id: data.public_id, url: data.secure_url };
};
