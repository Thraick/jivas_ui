import { useSubmit } from "@remix-run/react";
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
import { AgentType, ResponseType } from "./_index";



export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const id = formData.get('id')
    const ctx = { id }
    try {
        console.log(ctx)
        // await deleteFaqs({ ctx })
        return redirect('/agents')
    } catch (error) {
        return error;
    }
};


export default function DeleteAgentDialog(props: { res: AgentType }) {
    const submit = useSubmit();

    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', props.res.name);
        console.log(formData)
        submit(formData, { method: "post", action: "/agents/delete" });
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