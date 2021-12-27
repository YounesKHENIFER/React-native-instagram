import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

export default async function openGallery(
  width,
  height,
  path,
  setImageLoading,
  setPic,
) {
  try {
    setImageLoading(true);
    const params =
      width && height
        ? {
            width: width,
            height: height,
            cropping: true,
          }
        : {};
    const image = await ImagePicker.openPicker(params);

    // getting the image name and add date to make it unique
    let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
    const extention = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extention;

    // uploading image to storage
    const storageRef = storage().ref(`/${path}/${filename}`);

    await storageRef.putFile(image.path);
    // getting image download url
    const url = await storageRef.getDownloadURL();
    setPic(url);
    setImageLoading(false);
  } catch (error) {
    console.log('image uplod : ', error.message);
  }
}
