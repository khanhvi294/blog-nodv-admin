import React from "react";
import {
  TextField,
  Grid,
  Box,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../api/authApi";
import { setAccessToken } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      dispatch(setAccessToken(data?.accessToken));
      navigate("/");
    },
    onError: (error) => {
      console.log("error ", error);
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90%] px-5">
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1 }}
        className="w-[70%]"
      >
        <TextField
          error={errors?.email}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          // autoComplete="email"
          autoFocus
          className="bg-white"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email",
            },
          })}
        />
        <span className="text-rose-600 italic text-sm">
          {errors?.email?.message}
        </span>
        <TextField
          error={errors?.password}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          // autoComplete="current-password"
          className="bg-white"
          {...register("password", {
            required: "Password is required",
          })}
        />
        <span className="text-rose-600 italic text-sm">
          {errors?.password?.message}
        </span>
        <Button
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          color="success"
          variant="contained"
          className="btn w-[240px] border-gray-300 text-slate-500"
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LoginForm;
