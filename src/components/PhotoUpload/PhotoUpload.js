import { useId } from "react";

const PhotoUpload = ({ children, onUpload }) => {
  const id = useId();
  const handleOnchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);
    onUpload({
      previewImg: imgUrl,
      file: file,
    });
  };
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        accept="image/*"
        onChange={handleOnchange}
        type="file"
        hidden
        id={id}
      />
    </>
  );
};

export default PhotoUpload;
