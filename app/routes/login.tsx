// import { useRouteData } from "@remix-run/react";
import { Form, Link, useActionData, useFetcher, useSubmit } from "@remix-run/react";
// import { Redirect } from "react-router";
import { authenticator } from "~/auth.server";
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "react-router";
import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { X } from "lucide-react";
import { z } from "zod";
import { useState } from "react";

export let meta = () => {
    return [
        {
            title: "Login - My App",
            description: "Login to My App to access your account.",
        },
    ];
};



const emailSchema = z.string().email({ message: 'Invalid email format' }).nonempty({ message: 'email is required' });
const passwordSchema = z.string().min(6, { message: 'password must be at least 6 characters long' }).nonempty({ message: 'password is required' });

const schema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

type FormValues = z.infer<typeof schema>;

export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const email = formData.get('email')
    const password = formData.get('password')
    const ctx = {
        email,
        password
    }
    try {
        console.log(ctx)
        // const payload = await newFaqs({ ctx })
        // if (payload.info.warning) {
        //     return payload.info.warning;
        // }
        return redirect('/dashboard')
    } catch (error) {
        return error;
    }
};

export let loader = async ({ request }: LoaderArgs) => {
    const user = await authenticator.isAuthenticated(request);

    if (user) {
        return redirect("/dashboard");
    }
    console.log({ user });
    return { user };
};

export default function Login() {

    const submit = useSubmit();

    const actionData = useActionData();
    const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const validationResult = schema.safeParse(formValues);
        if (validationResult.success) {
            // Handle successful form submission
            setFormErrors([])
            handleSubmit({ formValues });
        } else {
            setFormErrors(validationResult.error.issues);
        }
    };

    function handleSubmit({ formValues }: { formValues: FormValues }) {
        const formData = new FormData();
        formData.append('email', formValues.email);
        formData.append('password', formValues.password);
        submit(formData, { method: 'post', action: '/login' });
    }
    return (
        <section className="h-screen">
            <div className="container h-full px-6 py-24">
                <div
                    className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image" />
                    </div>

                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <Form onSubmit={handleFormSubmit}>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    type="text" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " />
                                <label htmlFor="email" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                {formErrors.find((error) => error.path[0] === 'email')?.message ? <div className="mt-2">{formErrors.find((error) => error.path[0] === 'email')?.message}</div> : null}
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleInputChange}
                                    type="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " />
                                <label htmlFor="password" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password address</label>
                                {formErrors.find((error) => error.path[0] === 'password')?.message ? <div className="mt-2">{formErrors.find((error) => error.path[0] === 'password')?.message}</div> : null}
                            </div>

                            <div className="mb-6 flex items-center justify-between">
                                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="exampleCheck3"
                                        checked />
                                    <label
                                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="exampleCheck3">
                                        Remember me
                                    </label>
                                </div>

                                <a
                                    href="#!"
                                    className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                >Forgot password?
                                </a>
                            </div>
                            <button type="submit" className="text-white uppercase w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2">Sign in</button>



                        </Form>
                        <div
                            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                            <p
                                className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                OR
                            </p>
                        </div>

                        <button 
                        onClick={() => submit(null, { method: 'post', action: '/auth/google' })}
                        type="button" className="text-white uppercase w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2">Continue with Google</button>


                        <button
                            type="button"
                            
                            className="text-white uppercase w-full bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4"
                        >Register</button>
                    </div>
                </div>
            </div >
        </section >
    )
}