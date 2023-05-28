import { Form, Link, useActionData, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import { AgentType, AgentsType, StatesType, agentSchema } from "./_index";
import ToggleButton from "components/ui/togglebutton";
import { Button } from "components/ui/button";
import { useEffect, useState } from "react";
import { localStorageService } from "~/resolvers/cache";
import { z } from "zod";
import { Bold, ToggleLeft, ToggleLeftIcon, ToggleRight, X } from "lucide-react";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { Textarea } from "components/ui/textarea";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Toggle } from "components/ui/toggle";
import DeleteAgentDialog from "./agents_.delete";
import { createAgent, updateAgent } from "~/resolvers/agents";



export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const name = formData.get('name')
    const description = formData.get('description')
    const published = formData.get('published')
    const ner_confidence = formData.get('ner_confidence')
    const nlu_confidence = formData.get('nlu_confidence')
    const sen_confidence = formData.get('sen_confidence')
    const ctx = {
        name,
        description,
        published,
        nlu_confidence,
        ner_confidence,
        sen_confidence
    }
    try {
        console.log(ctx)
        console.log(name)
        const payload = await createAgent({ ctx })
        console.log(payload)
        if (payload.info.warning) {
            return payload.info.warning;
        }
        else if (payload.info.notice){
            console.log('notice')
            return redirect(`/agents/${payload.info.payload.id}/states`)
        }
        console.log('null')
        return null
    } catch (error) {
        return error;
    }
};

export default function Agents() {
    // const agentsList = useLoaderData() as AgentType

    const submit = useSubmit();

    const actionData = useActionData();
    const [formValues, setFormValues] = useState<AgentType>({id: '', published: false, name: '', description: '', nlu_confidence: 0, ner_confidence: 0, sen_confidence: 0 });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const [checked, setChecked] = useState(formValues.published)


    useEffect(() => {
        const newAgent = localStorageService.getItem('newAgent')
        setFormValues({...formValues, name: newAgent})
    }, [])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };


    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const parsedFormValues: AgentType = {
            ...formValues,
            nlu_confidence: Number(formValues.nlu_confidence),
            sen_confidence: Number(formValues.sen_confidence),
            ner_confidence: Number(formValues.ner_confidence),
            published: Boolean(formValues.published),
        };
        const validationResult = agentSchema.safeParse(parsedFormValues);
        if (validationResult.success) {
            setFormErrors([])
            handleSubmit({ formValues });
        } else {
            setFormErrors(validationResult.error.issues);
        }
    };

    

    function handleSubmit({ formValues }: { formValues: AgentType }) {

        localStorageService.setItem('agentName', formValues.name)
        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('description', formValues.description);
        formData.append('ner_confidence', String(formValues.ner_confidence));
        formData.append('nlu_confidence', String(formValues.nlu_confidence));
        formData.append('sen_confidence', String(formValues.sen_confidence));
        formData.append('published', String(checked));
        submit(formData, { method: 'post', action: `/agents/new` });
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            
            <div className="max-w-2xl w-full">

                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold capitalize">New Agent</h1>
                        <Link to={'/agents'}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>

                    <div className="mb-4 flex items-center">
                        <Label htmlFor="name" className="w-32">Name</Label>
                        <Input
                            name="name"
                            type="text"
                            value={formValues.name}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'name')?.message ? <div>{formErrors.find((error) => error.path[0] === 'name')?.message}</div> : null}
                    </div>

                    <div className="mb-6 flex items-center">
                        <Label htmlFor="description" className="w-32">Description</Label>
                        <Textarea
                            name="description"
                            rows={3}
                            value={formValues.description}
                            onChange={handleInputChange}
                        />
                        {formErrors.find((error) => error.path[0] === 'description')?.message ? (<div>{formErrors.find((error) => error.path[0] === 'description')?.message}</div>) : null}
                    </div>

                    <div className="mb-4 flex items-center">
                        <Label htmlFor="nlu_confidence" className="w-32">NLU Confidence</Label>
                        <Input
                            name="nlu_confidence"
                            type="number"
                            value={formValues.nlu_confidence}
                            onChange={handleInputChange}
                        />
                        {formErrors.find((error) => error.path[0] === 'nlu_confidence')?.message ? <div>{formErrors.find((error) => error.path[0] === 'nlu_confidence')?.message}</div> : null}
                    </div>
                    <div className="mb-4 flex items-center">
                        <Label htmlFor="ner_confidence" className="w-32">NER Confidence</Label>
                        <Input
                            name="ner_confidence"
                            type="number"
                            value={formValues.ner_confidence}
                            onChange={handleInputChange}
                        />
                        {formErrors.find((error) => error.path[0] === 'ner_confidence')?.message ? <div>{formErrors.find((error) => error.path[0] === 'ner_confidence')?.message}</div> : null}
                    </div>
                    <div className="mb-4 flex items-center">
                        <Label htmlFor="sen_confidence" className="w-32">SEN Confidence</Label>
                        <Input
                            name="sen_confidence"
                            type="number"
                            value={formValues.sen_confidence}
                            onChange={handleInputChange}
                        />
                        {formErrors.find((error) => error.path[0] === 'sen_confidence')?.message ? <div>{formErrors.find((error) => error.path[0] === 'sen_confidence')?.message}</div> : null}
                    </div>



                    <div className="mb-4 flex items-center">
                        <Label htmlFor="published" className="w-32">Published</Label>
                        <div className="flex items-center w-full">
                            <label className="relative inline-flex items-center cursor-pointer">
                                {/* <input type="checkbox" checked={checked} name="published" className="sr-only peer" onChange={(e) => setChecked(Boolean(e.target.checked))} /> */}
                                <input type="checkbox" checked={checked} onChange={(e) => setChecked(Boolean(e.target.checked))} name="published" className="sr-only peer"  />
                                {/* <input type="checkbox" checked={Boolean(checked)} onChange={(e) => setChecked(Boolean(e.target.checked))} /> */}

                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
                            </label>
                        </div>
                    </div>


                    <div className="flex items-center justify-between">
                        {/* <DeleteAgentDialog res={formValues} /> */}
                        <div></div>
                        <Button type="submit" variant={"secondary"}>Create</Button>
                        {/* <Button type="submit" variant={"secondary"}>Update</Button> */}
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




const ddata = {
    "notice": "",
    "payload": {
      "id": "urn:uuid:0036d1d2-dfee-41a1-9263-6e6cd7a4d014",
      "name": "agent z",
      "published": "true",
      "description": "",
      "nlu_confidence": 0.3,
      "ner_confidence": 0.1,
      "sen_confidence": 0.1
    }
  }
