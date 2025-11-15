import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../api/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      if (data.token) setToken(data.token);
    },
  });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

  return (
    <section id="login">
      <div className="cute-login-page">
        <div className="cute-login-card">
          
          <h1 className="cute-login-title">
            <span className="letter l1">F</span>
            <span className="letter l2">o</span>
            <span className="letter l3">r</span>
            <span className="letter l4">g</span>
            <span className="letter l1">o</span>
            <span className="letter l2">t</span>
            <span className="dash">-</span>
            <span className="letter l3">P</span>
            <span className="letter l4">a</span>
            <span className="letter l5">s</span>
            <span className="letter l2">s</span>
            <span className="letter l3">?</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="cute-login-form">

           
            <div className="cute-input-wrapper">
              <FaEnvelope className="icon" />
              <input
                className="cute-input"
                placeholder="Email"
                {...register("email")}
              />
            </div>

            {errors.email && (
              <span className="cute-error">{errors.email.message}</span>
            )}

          
            {mutation.isError && (
              <p className="cute-error-banner">
                {(mutation.error as any)?.response?.data?.message ||
                  "Something went wrong"}
              </p>
            )}

           
            {mutation.isSuccess && (
              <p className="cute-success-banner">
                {mutation.data.message}
              </p>
            )}

           
            <div className="cute-footer-row" style={{ justifyContent: "flex-end" }}>
              <button
                type="submit"
                className="cute-arrow-btn"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "…" : "➜"}
              </button>
            </div>
          </form>

          
          {token && (
  <p className="cute-token-box">
    <span className="token-label">Reset Token:</span>
    <code className="token-value">{token}</code>
  </p>
)}


       
          <p className="cute-bottom-text">
            Remember your password?{" "}
            <Link to="/login" className="cute-link strong">
              Log in
            </Link>
          </p>

          
          <p className="cute-bottom-text">
            Already have a token?{" "}
            <Link to="/reset-password" className="cute-link strong">
              Reset Password
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
