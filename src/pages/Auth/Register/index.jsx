import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import * as authService from "@/services/auth";
import { /*EMAIL_REGEX,*/ registerSchema } from "@/utils/validators";
import { useEffect } from "react";

function Register() {
    const navigate = useNavigate();
    const {
        register,
        trigger,
        setError,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        mode: "onChange",
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            await authService.register(data);
            navigate("/login");
        } catch (error) {
            // Error handle...
            console.log(error);
        }
    };

    // const email = watch("email");

    // useEffect(() => {
    //     if (email && EMAIL_REGEX.test(email)) {
    //         authService.checkExistsEmail(email).then((exists) => {
    //             if (exists) {
    //                 setError("email", {
    //                     type: "check-email",
    //                     message: "Email đã tồn tại, chọn email khác",
    //                 });
    //             }
    //         });
    //     }

    //     if (email) trigger("email");
    // }, [email, errors, setError, trigger]);

    const password = watch("password");

    useEffect(() => {
        const confirmation = watch("password_confirmation");
        if (confirmation && password !== confirmation) {
            trigger("password_confirmation");
        } else {
            setError("password_confirmation", null);
        }
    }, [password, watch, trigger, setError]);

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("firstName")}
                    placeholder="Enter first name..."
                    autoFocus
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <br />
                <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Enter last name..."
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
                <br />
                <input
                    type="text"
                    {...register("email")}
                    placeholder="Enter email..."
                />
                {errors.email && <p>{errors.email.message}</p>}
                <br />
                <input
                    type="password"
                    {...register("password")}
                    placeholder="Enter password..."
                />
                {errors.password && <p>{errors.password.message}</p>}
                <br />
                <input
                    type="password"
                    {...register("password_confirmation")}
                    placeholder="Enter password..."
                />
                {errors.password_confirmation && (
                    <p>{errors.password_confirmation.message}</p>
                )}
                <br />
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
