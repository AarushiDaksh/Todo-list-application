import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type FormValues = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate("/todos");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <section id="login">
    <div className="cute-login-page">
      <div className="cute-login-card">
        <h1 className="cute-login-title">
          <span className="letter l1">L</span>
          <span className="letter l2">o</span>
          <span className="letter l3">g</span>
          <span className="letter dash">-</span>
          <span className="letter l4">I</span>
          <span className="letter l5">n</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="cute-login-form">
          <div className="cute-input-wrapper">
            <span className="icon">👩🏻‍💻</span>
            <input
              className="cute-input"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <span className="cute-error">{errors.email.message}</span>
          )}

          <div className="cute-input-wrapper">
            <span className="icon">🔒</span>
            <input
              className="cute-input"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <span className="cute-error">{errors.password.message}</span>
          )}

          {mutation.isError && (
            <p className="cute-error-banner">
              {(mutation.error as any)?.response?.data?.message ||
                "Something went wrong. Please try again."}
            </p>
          )}

          <div className="cute-footer-row">
            <Link to="/forgot-password" className="cute-link small">
              Forgot password?
            </Link>

            <button
              type="submit"
              className="cute-arrow-btn"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "…" : "➜"}
            </button>
          </div>
        </form>

        <p className="cute-bottom-text">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="cute-link strong">
            Sign up
          </Link>
        </p>
      </div>
    </div>
    
    </section>
  );
};

export default Login;
