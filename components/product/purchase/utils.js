import { storage } from "@/firebase";

export async function uploadFileToFirebaseStorage(file) {
  // Create a reference to the storage service
  const storageRef = storage.ref();

  // Generate a unique ID for the file
  const fileId = Date.now().toString() + "-" + file.name;

  // Create a child reference
  const fileRef = storageRef.child(fileId);

  try {
    // Upload file to Firebase Storage
    const snapshot = await fileRef.put(file);

    // Get the public URL of the uploaded file
    const publicUrl = await snapshot.ref.getDownloadURL();

    return publicUrl;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
}
