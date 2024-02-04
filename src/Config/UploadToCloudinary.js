

export const uploadToCloudinary = async (pics) => {
  if (pics) {
    
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dphkkfcg0");

    const res = await fetch("https://api-eu.cloudinary.com/v1_1/dphkkfcg0/image/upload", {
      method: "post",
      body: data,
    })
      
      const fileData=await res.json();
      console.log("url : ", fileData.url.toString());
      return fileData.url.toString();

  } else {
    console.log("error");
  }
};


