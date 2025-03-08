"use client";

import { z as zod } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Stack,
  IconButton,
  Typography,
  Alert,
  InputAdornment,
  Link,
  Button,
  Tooltip,
} from "@mui/material";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Form, Field } from "@/src/components/hook-form";

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email address!" }),
  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

const SignIn = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.email === "test@example.com" && data.password === "password") {
        localStorage.setItem("isAuthenticated", "true");
        router.push("/store"); // Navigate to store after sign-in
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : String(error));
    }
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      px={3}
    >
      {/*  Sign-In Heading */}
      <Stack spacing={1.5} sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in to your account</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Don't have an account?`}
          </Typography>
          <Link href="#" variant="subtitle2">
            Get started
          </Link>
        </Stack>
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Copy email and password:
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">test@example.com</Typography>
            <Tooltip title="Copy Email">
              <IconButton
                onClick={() => handleCopy("test@example.com")}
                size="small"
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">password</Typography>
            <Tooltip title="Copy Password">
              <IconButton onClick={() => handleCopy("password")} size="small">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>

      {/*  Error Message */}
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      {/*  Sign-In Form */}
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3} width="100%" maxWidth={400}>
          {/* Email Field */}
          <Field.Text
            name="email"
            label="Email Address"
            InputLabelProps={{ shrink: true }}
          />

          {/* Password Field */}
          <Stack spacing={1.5}>
            <Link
              href="#"
              variant="body2"
              color="inherit"
              sx={{ alignSelf: "flex-end" }}
            >
              Forgot password?
            </Link>
            <Field.Text
              name="password"
              label="Password"
              placeholder="6+ characters"
              type={showPassword ? "text" : "password"}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      // onClick={() => setShowPassword((prev) => !prev)}
                      // edge="end"
                      data-cy="toggle-password"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <RemoveRedEyeIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          {/* Sign In Button */}
          <Button
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Signing in..."
          >
            Sign in
          </Button>
        </Stack>
      </Form>
    </Box>
  );
};

export default SignIn;
