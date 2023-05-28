import { Form, Link, useActionData, useNavigate, useParams, useSubmit } from "@remix-run/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import { AgentsType, ResponseType, StateType, StatesType, statSchema, stateResponseSchema } from "./_index";
import ToggleButton from "components/ui/togglebutton";
import { Button } from "components/ui/button";
import { useEffect, useState } from "react";
import { localStorageService } from "~/resolvers/cache";
import { Edit, X } from "lucide-react";
import { z } from "zod";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { ActionArgs, redirect } from "@remix-run/node";
import DeleteStateResponseDialog from "./agents_.$id_.states_.$sid_.responses_.delete";





export async function action({ request, params }: ActionArgs) {


    const formData = await request.formData();
    const id = formData.get('id')
    const text = formData.get('text')
    const type = formData.get('type')
    const published = formData.get('published')
    const ctx = {
        id,
        text,
        type,
        published
    }
    try {
        console.log(ctx)
        // const payload = await newFaqs({ ctx })
        // if (payload.info.warning) {
        //     return payload.info.warning;
        // }
        return redirect(`/agents/${params.id}/states/${params.sid}/responses`)
    } catch (error) {
        return error;
    }
};


export default function Agents() {

    const agentsList = adata as ResponseType

    const submit = useSubmit();
    const {id, sid, rid} = useParams();

    const actionData = useActionData();
    const [formValues, setFormValues] = useState<ResponseType>({id: '', published: false, text: '', type: '' });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const [checked, setChecked] = useState(false)
    const [stateName, setStateName] = useState('')
    const [agentName, setAgentName] = useState('')


    useEffect(() => {
        setFormValues({...formValues,agentsList})

        let localStateName = localStorageService.getItem('stateName')
        setStateName(localStateName)
        let localAgentName = localStorageService.getItem('agentName')
        setAgentName(localAgentName)
        if(rid) setFormValues({...formValues, id: rid})
    }, [])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };


    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const parsedFormValues: ResponseType = {
            ...formValues,
        };
        const validationResult = stateResponseSchema.safeParse(parsedFormValues);
        if (validationResult.success) {
            setFormErrors([])
            handleSubmit({ formValues });
        } else {
            setFormErrors(validationResult.error.issues);
        }
    };


    function handleSubmit({ formValues }: { formValues: ResponseType }) {
        const formData = new FormData();
        if(rid) formData.append('id', rid);
        formData.append('text', formValues.text);
        formData.append('type', formValues.type);
        formData.append('published', String(checked));
        submit(formData, { method: 'post', action: `/agents/${id}/states/${sid}/responses/${rid}` });
    }


    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="max-w-2xl w-full">

                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold capitalize">Edit {agentName} {stateName} Response </h1>
                        <Link to={`/agents/${id}/states/${sid}/responses`}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>

                    <div className="mb-4 flex items-center">
                        <Label htmlFor="name" className="w-32">Response</Label>
                        <Input
                            name="text"
                            type="text"
                            value={formValues.text}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'text')?.message ? <div>{formErrors.find((error) => error.path[0] === 'text')?.message}</div> : null}
                    </div>

                    <div className="mb-4 flex items-center">
                        <Label htmlFor="type" className="w-32">Type</Label>
                        <Input
                            name="type"
                            type="text"
                            value={formValues.type}
                            onChange={handleInputChange}
                        />
                        {formErrors.find((error) => error.path[0] === 'type')?.message ? <div>{formErrors.find((error) => error.path[0] === 'type')?.message}</div> : null}
                    </div>




                    <div className="mb-4 flex items-center">
                        <Label htmlFor="published" className="w-32">Published</Label>
                        <div className="flex items-center w-full">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={checked} name="published" className="sr-only peer" onChange={(e) => setChecked(Boolean(e.target.checked))} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
                            </label>
                        </div>
                    </div>


                    <div className="flex items-center justify-between">
                    <DeleteStateResponseDialog res={formValues} stateName={stateName} agentName={agentName} label={"Delete"}/>
                        <Button type="submit" variant={"secondary"}>Update</Button>
                    </div>
                </Form>

                {
                    actionData &&
                    <div className="bg-yellow-100 text-center text-yellow-700 p-4" role="alert">
                        <p className="font-bold">Warning</p>
                        <p>{actionData}</p>
                    </div>
                }
            </div>

        </div>
    )
}




const adata =
{
    "id": "urn:uuid:aa92cjhvjvjhfkjdcjj8-640b-4823gfj-8b9e-5f9ea5aba651ddewwew",
    "type": "response",
    "published": false,
    "text": "Hello, how may I help you?"

}
