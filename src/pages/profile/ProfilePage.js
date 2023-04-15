import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PhotoUpload from "../../components/PhotoUpload";

const ProfilePage = ({ initialValue }) => {
  var user = initialValue;
  const [upLoadData, setUploadData] = useState({
    previewImg: user?.avatar,
    file: null,
  });
  return (
    <div className="flex m-9">
      <div className="w-[500px]">
        <label className="text-[16px] text-slate-500">Avatar</label>
        <div className="flex flex-col items-center min-w-min py-3.5">
          <div component="label">
            <div className="">
              <PhotoUpload onUpload={setUploadData}>
                <Avatar
                  sx={{ width: 120, height: 120 }}
                  src={upLoadData?.previewImg}
                />
              </PhotoUpload>
            </div>
          </div>
          <div className="px-2.5">
            <div className="flex justify-center">
              <Button
                variant="text"
                component="label"
                className="min-w-min px-0 text-xs font-normal !text-lime-600 hover:bg-white"
              >
                <p>Upload</p>
                <PhotoUpload onUpload={setUploadData}></PhotoUpload>
              </Button>

              <Button
                variant="text"
                component="label"
                className="ml-3 min-w-min px-0 text-xs font-normal !text-red-600 hover:bg-white"
                onClick={() => setUploadData("")}
              >
                Remove
              </Button>
            </div>

            <Typography className="w-72 text-xs text-gray-400">
              Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
              side.
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-[400px] justify-between">
        <TextField
          // error={!!errors?.username}
          label="Name*"
          variant="standard"
          defaultValue="khánh vi"
          //{user.username}
          // helperText={errors?.username?.message}
          // {...register("username", {
          //   required: "user name is required filed",
          //   maxLength: 60,
          // })}
        />
        <TextField
          id="standard-helperText"
          label="Bio"
          // {...register("bio", {
          //   maxLength: BIO_MAX_LENGTH,
          // })}
          // defaultValue={user?.bio}
          // helperText={`${lengthBio}/${BIO_MAX_LENGTH}`}
          variant="standard"
          onChange={(e) => {
            // SetLengthBio(e.target.value.length);
          }}
        />
        <TextField
          id="standard-helperText"
          label="Email"
          // {...register("bio", {
          //   maxLength: BIO_MAX_LENGTH,
          // })}
          defaultValue="Khanhvi294@gmail.com"
          // helperText={`${lengthBio}/${BIO_MAX_LENGTH}`}
          variant="standard"
          disabled
        />

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue={user.gender}
            name="radio-buttons-group"
            row
          >
            <FormControlLabel
              // {...register("gender")}
              value={true}
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              // {...register("gender")}
              value={false}
              control={<Radio />}
              label="Male"
            />
          </RadioGroup>
        </FormControl>
        <div className="px-2.5">
          <Button
            variant="outlined"
            className="btn rounded-full normal-case text-lime-600 !mx-2.5"
            color="success"
            size="medium"
            // onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="btn ml-3 rounded-full normal-case !mx-2.5"
            size="medium"
            color="success"
            disableElevation
            // onClick={handleSubmit(handleSave)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
