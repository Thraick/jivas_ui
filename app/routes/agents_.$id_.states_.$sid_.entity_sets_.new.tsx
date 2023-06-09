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
import { EntitySetType, entitySetSchema } from "~/utils/dataTypes";





export async function action({ request, params }: ActionArgs) {


    const formData = await request.formData();
    const id = formData.get('id')
    const entity = formData.get('entity')
    const ctx = {
        id,
        entity,
    }
    try {
        console.log(ctx)
        // const payload = await newFaqs({ ctx })
        // if (payload.info.warning) {
        //     return payload.info.warning;
        // }
        return redirect(`/agents/${params.id}/states/${params.sid}/entity_sets`)
    } catch (error) {
        return error;
    }
};


export default function Agents() {

    // const agentsList = adata as EntitySetType

    const submit = useSubmit();
    const {id, sid} = useParams();

    const actionData = useActionData();
    const [formValues, setFormValues] = useState<EntitySetType>({id: '', entity: '' });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const [stateName, setStateName] = useState('')
    const [agentName, setAgentName] = useState('')


    useEffect(() => {
        // setFormValues(agentsList)

        let localStateName = localStorageService.getItem('stateName')
        setStateName(localStateName)
        let localAgentName = localStorageService.getItem('agentName')
        setAgentName(localAgentName)

        const newEntity = localStorageService.getItem('newEntity')
        setFormValues({...formValues, entity: newEntity})
    }, [])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };


    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const parsedFormValues: EntitySetType = {
            ...formValues,
        };
        const validationResult = entitySetSchema.safeParse(parsedFormValues);
        if (validationResult.success) {
            setFormErrors([])
            handleSubmit({ formValues });
        } else {
            setFormErrors(validationResult.error.issues);
        }
    };


    function handleSubmit({ formValues }: { formValues: EntitySetType }) {
        const formData = new FormData();
        if(sid) formData.append('id', sid);
        formData.append('entity', formValues.entity);
        submit(formData, { method: 'post', action: `/agents/${id}/states/${sid}/entity_sets/new` });
    }


    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="max-w-2xl w-full">

                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold capitalize">New {agentName} {stateName} Entity </h1>
                        <Link to={`/agents/${id}/states/${sid}/entity_sets`}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>

                    <div className="mb-4 flex items-center">
                        <Label htmlFor="entity" className="w-32">Entity</Label>
                        <Input
                            name="entity"
                            type="text"
                            value={formValues.entity}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'entity')?.message ? <div>{formErrors.find((error) => error.path[0] === 'entity')?.message}</div> : null}
                    </div>

                    <div className="flex items-center justify-between">
                        <div></div>
                    {/* <DeleteStateResponseDialog res={formValues} stateName={stateName} agentName={agentName} label={"Delete"}/> */}
                        <Button type="submit" variant={"secondary"}>Create</Button>
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




// const adata =
// {
//     "type_": "response",
//     "published": false,
//     "text": "Hello, how may I help you?"

// }
