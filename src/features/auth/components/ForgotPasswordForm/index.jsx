import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/utils/validators";
import { authService } from "@/services/authServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await authService.forgotPassword(data.email);

      //Toast
      toast.info("Liên kết đặt lại mật khẩu đã được gửi tới email của bạn", {
        description: response.message || "Vui lòng kiểm tra hộp thư của bạn.",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      toast.error("Gửi yêu cầu thất bại", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={() => handleSubmit(onSubmit)} className="space-y-4 w-full">
      {/* Email */}
      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          className={`h-12 bg-background border-input-border rounded-xl text-normaltext placeholder:text-normaltext-tertiary ${
            errors.email ? "border-destructive" : ""
          }`}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-normaltext text-background hover:bg-normaltext/90 rounded-xl font-semibold"
        disabled={isLoading}
      >
        {isLoading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
