import { useParams, useSubmit } from "@remix-run/react";
import { Trash2 } from "lucide-react";
import { Button } from "components/ui/button";
import {
    Dialog, DialogClose, DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "components/ui/dialog";

import { ActionArgs, redirect } from "@remix-run/node";
// import { deleteFaqs } from "~/resolvers/faqs";
import { ResponseType } from "./_index";
import { EntitySetType } from "~/utils/dataTypes";



export async function action({ request, params }: ActionArgs) {
    const formData = await request.formData();
    const id = formData.get('id')
    // const stateId = formData.get('stateId')
    const ctx = { id }
    try {
        // await deleteFaqs({ ctx })
        // if(stateId){
        //     console.log("ctx")
        //     console.log(ctx)
        //     return redirect(`/agents/${params.id}/states/${params.sid}/responses`)
        // }
        console.log(ctx)
        return redirect(`/agents/${params.id}/states/${params.sid}/entity_sets`)
    } catch (error) {
        return error;
    }
};


export default function DeleteEntitySetDialog(props: { res: EntitySetType, stateName: string, agentName: string, label: string }) {
    const submit = useSubmit();
    const {id, sid} = useParams();

    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', props.res.id);
        // if(props.label){
        //     formData.append('stateId', 'sadfljsaof');
        // }
        submit(formData, { method: "post", action: `/agents/${id}/states/${sid}/entity_sets/delete` });
    }

    return (
        <>
            <Dialog>
                {props.label ?
                <DialogTrigger asChild><Button variant={"destructive"}><Trash2 className="mr-2 h-4 w-4" />{props.label}</Button></DialogTrigger>
                :
                <DialogTrigger asChild><Button variant={"secondary"}><Trash2 className="h-4 w-4" /></Button></DialogTrigger>
            }
                <DialogContent>
                    <DialogHeader className="justify-center items-center">
                        <DialogTitle className="capitalize">Delete {props.agentName} {props.stateName} Entity</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="normal-case">{props.res.entity}</DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" autoFocus onClick={handleSubmit}>Delete</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}