"use client";

import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createTag, fetchAllTags, useDispatch } from "@/lib/redux";
import { useSnackbar } from "notistack";
import LoadinProgress from "./LoadingProgess";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9\s]+$/, "Symbols are not allowed"),
});

interface SignInInputs {
  name: string;
}

interface CreateTagProps {
  closeModal: () => void;
}

const CreateTagForm = ({ closeModal }: CreateTagProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleCreateTag = (data: any) => {
    setLoading(true);
    dispatch(createTag(data))
      .unwrap()
      .then((res) => {
        console.log(res, "9999");
        if (res.statusCode === 201) {
          dispatch(fetchAllTags())
            .unwrap()
            .catch((error) => {
              enqueueSnackbar(error.message, { variant: "error" });
            });
          setTimeout(() => {
            reset();
          }, 500);
          setTimeout(() => {
            closeModal();
          }, 700);
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleCreateTag)}
      className=""
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{
              input: {
                color: "#021527",
              },
              mt: 2,
              color: "#242E8F",
              "& label.Mui-focused": {
                color: "#242E8F",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "1.5px solid #242E8F",
                },
              },
              "& .MuiOutlinedInput-input": {
                py: "14px",
              },
              "& .MuiFormLabel-root": {
                mt: "3px",
              },
            }}
            inputProps={{ style: { height: 18 } }}
            label="Tag Name"
            variant="outlined"
            fullWidth
            size="small"
            className="text-xs"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
        size="large"
        disabled={loading}
      >
        {loading ? <LoadinProgress /> : "Save"}
      </Button>
    </Box>
  );
};

export default CreateTagForm;
