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

function Login() {
  // const data = useRouteData<{ isLoggedIn: boolean }>();

  // if (data.isLoggedIn) {
  //   return <Redirect to="/dashboard" />;
  // }

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

    <div className="flex justify-center items-center h-screen">
      <div className="max-w-2xl w-full shadow-md rounded">
        <Form onSubmit={handleFormSubmit} className=" px-8 pt-6 ">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-2xl font-bold">Login</h1>
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
            className="mt-2"
              name="email"
              type="text"
              value={formValues.email}
              onChange={handleInputChange}
              autoFocus
            />
            {formErrors.find((error) => error.path[0] === 'email')?.message ? <div className="mt-2">{formErrors.find((error) => error.path[0] === 'email')?.message}</div> : null}
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
            className="mt-2"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
            {formErrors.find((error) => error.path[0] === 'password')?.message ? (<div className="mt-2">{formErrors.find((error) => error.path[0] === 'password')?.message}</div>) : null}
          </div>
          <div className="flex mb-4 items-center justify-center">
            <Button type="submit" variant={"secondary"}>Login</Button>
          </div>
        </Form>

        <div className="flex flex-col items-center mb-10">
          <p className="mb-6">or</p>
          <Button variant={"secondary"} onClick={() => submit(null, { method: 'post', action: '/auth/google' })}>
            Login with Google
          </Button>
          <Link to={'ssss'} className="mt-6">Don't have an account?</Link>
        </div>

      </div>
    </div>
  );
}

// export function meta() {
//   return {
//     title: "Login - My App",
//     description: "Login to My App to access your account.",
//   };
// }

// export function loader() {
//   return { isLoggedIn: false };
// }

export default Login;
