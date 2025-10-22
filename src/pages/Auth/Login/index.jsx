import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";

import * as authService from "@/services/auth";
import { useCurrentUser } from "@/features/auth";
import { getCurrentUser } from "@/services/auth/authService";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const currentUser = useCurrentUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "sondang1234@gmail.com",
            password: "12341234",
        },
    });

    useEffect(() => {
        if (currentUser) {
            const continuePath = params.get("continue") || "/";
            navigate(continuePath);
        }
    }, [currentUser, navigate, params]);

    const onSubmit = async (data) => {
        const { access_token, refresh_token } = await authService.login(data);
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);
        dispatch(getCurrentUser());
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("email", {
                        required: "Vui lòng nhập trường này",
                    })}
                    placeholder="Enter email..."
                />
                {errors.email && <p>{errors.email.message}</p>}
                <br />
                <input
                    type="password"
                    {...register("password", {
                        required: "Vui lòng nhập trường này",
                    })}
                    placeholder="Enter password..."
                />
                {errors.password && <p>{errors.password.message}</p>}
                <br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
