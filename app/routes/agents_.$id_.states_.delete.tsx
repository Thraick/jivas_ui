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
import { AgentType, ResponseType, StateType } from "./_index";



export async function action({ request, params }: ActionArgs) {
    const formData = await request.formData();
    const id = formData.get('id')
    const ctx = { id }
    try {
        console.log(ctx)
        // await deleteFaqs({ ctx })
        return redirect(`/agents/${params.id}/states`)
    } catch (error) {
        return error;
    }
};


export default function DeleteStateDialog(props: { res: StateType }) {
    const {id} = useParams();
    const submit = useSubmit();

    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', props.res.name);
        console.log(formData)
        submit(formData, { method: "post", action: `/agents/${id}/states/delete` });
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button variant={"destructive"}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader className="justify-center items-center">
                        <DialogTitle className="capitalize">Would you like to delete {props.res.name}?</DialogTitle>
                    </DialogHeader>
                    {/* <DialogDescription className="normal-case">{props.res.name}</DialogDescription> */}
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