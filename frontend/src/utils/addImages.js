import imageCompression from "browser-image-compression";

export async function imageCompressions(e) {
  const nowImageURL = [];

  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  for (let i = 0; i < e.length; i += 1) {
    const compressedFile = await imageCompression(e[i], options);
    nowImageURL.push(compressedFile);
  }

  return [...nowImageURL];
}

export async function base64(e) {
  let result = [];

  for (let i = 0; i < e.length; i++) {
    const byteString = atob(e[i].split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let j = 0; j < byteString.length; j++) {
      ia[j] = byteString.charCodeAt(j);
    }
    const blob = new Blob([ia], {
      type: "image/jpeg",
    });
    const files = new File([blob], "image.jpg");
    result.push(files);
  }

  return [...result];
}
