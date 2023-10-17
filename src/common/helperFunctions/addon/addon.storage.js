import { getDownloadURL, ref, uploadBytes, deleteObject, listAll } from "@firebase/storage";
import { storage } from "../../../config/firebase-config";

export const addonToStorage = async (file, name) => {
    const fileInStorageRef = ref(storage, `addons/${name}/file/${file.name}`);

    try {
      await getDownloadURL(fileInStorageRef);
      
      return null;
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        try {
          const uploadTask = await uploadBytes(fileInStorageRef, file);
          const downloadURL = await getDownloadURL(uploadTask.ref);
  
          return downloadURL;
        } catch (uploadError) {
          console.error('Error uploading file:', uploadError);
          return null;
        }
      } else {
        console.error('Error checking if the file exists:', error);
        return null;
      }
    }
  };

export const logoToStorage = async (logo, name) => {
    const fileInStorageRef = ref(storage, `addons/${name}/logo/${logo.name}`);

    try {
        const url = await getDownloadURL(fileInStorageRef);
        
        return url;
      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          try {
            const uploadTask = await uploadBytes(fileInStorageRef, logo);
            const downloadURL = await getDownloadURL(uploadTask.ref);
    
            return downloadURL;
          } catch (uploadError) {
            console.error('Error uploading file:', uploadError);
            return null;
          }
        } else {
          console.error('Error checking if the file exists:', error);
          return null;
        }
      }
}

export const editLogo = async (logo, name) => {
  const fileInStorageRef = ref(storage, `addons/${name}/logo/${logo.name}`);
  const logoFolderRef =  ref(storage, `addons/${name}/logo`);

  try {
    const files = await listAll(logoFolderRef);

    if(files.items.length > 0) {
       deleteObject(files.items[0]);
    }

      await uploadBytes(fileInStorageRef, logo);

  } catch (error) {
    console.error('Error getting/deleting/uploading the file:', error);
    return null;
  }
}
