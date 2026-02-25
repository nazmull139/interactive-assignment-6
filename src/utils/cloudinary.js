export const uploadToCloudinary = async (file) => {
	const data = new FormData();
	data.append("file", file);
	data.append("cloud_name", "dekucno3g");
	data.append("upload_preset", "6th-assignment");

	const res = await fetch(
		`https://api.cloudinary.com/v1_1/dekucno3g/image/upload`,
		{
			method: "POST",
			body: data,
		},
	);
	if (!res.ok) throw new Error("Cloudinary Upload Failed");
	const result = await res.json();
	return {
		url: result.secure_url,
		publicId: result.public_id,
	};
};