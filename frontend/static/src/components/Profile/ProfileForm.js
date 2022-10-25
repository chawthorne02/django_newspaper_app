import { useState } from "react";
import Cookies from "js-cookie";

function ProfileForm() {
  const [profile, setProfile] = useState({
    avatar: null,
  });
  const [preview, setPreview] = useState("");

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProfile({
      ...profile,
      [profile.avatar]: file,
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }; 

  const handleError = (err) => {
    console.warm(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); 
    formData.append("avatar", profile.avatar); 

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData, 
    };

    const response = await fetch("/api/v1/profiles/", options).catch(handleError);
    const data = await response.json();
    console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="avatar" onChange={handleImage} /> 
      {profile.avatar && <img src={preview} alt="" />}  
      <button type="submit">Save</button>
    </form>
  );
}

export default ProfileForm;