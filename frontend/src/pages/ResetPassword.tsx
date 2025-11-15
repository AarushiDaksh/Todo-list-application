import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const schema = z.object({
  token: z.string().min(4),      
  password: z.string().min(4),
});

type FormValues = z.infer<typeof schema>;

const ResetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

  return (
    <section id="login">
      <div className="cute-login-page">
        <div className="cute-login-card">
          <h1 className="cute-login-title">
            <span className="letter l1">R</span>
            <span className="letter l2">e</span>
            <span className="letter l3">s</span>
            <span className="letter l4">e</span>
            <span className="letter l5">t</span>
            <span className="letter dash">-</span>
            <span className="letter l2">P</span>
            <span className="letter l3">a</span>
            <span className="letter l4">s</span>
            <span className="letter l5">s</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="cute-login-form">
           
            <div className="cute-input-wrapper">
             <span className="icon">🔑</span>
              <input
                className="cute-input"
                placeholder="Reset code / token"
                {...register("token")}
              />
            </div>
            {errors.token && (
              <span className="cute-error">{errors.token.message}</span>
            )}

           
            <div className="cute-input-wrapper">
              <span className="icon">🔒</span>
              <input
                type="password"
                className="cute-input"
                placeholder="New password"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <span className="cute-error">{errors.password.message}</span>
            )}

            {mutation.isError && (
              <p className="cute-error-banner">
                {(mutation.error as any)?.response?.data?.message ||
                  "Something went wrong"}
              </p>
            )}

            <div
              className="cute-footer-row"
              style={{ justifyContent: "flex-end" }}
            >
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
            Remember your password?{" "}
            <Link to="/login" className="cute-link strong">
              Log in
            </Link>
          </p>

          <p className="cute-bottom-text">
            Need a new code?{" "}
            <Link to="/forgot-password" className="cute-link strong">
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
