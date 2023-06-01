import { LoaderArgs, redirect } from "@remix-run/node";
import { Edit, Plus } from "lucide-react";
import { Link, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ResponseType } from "./_index";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import DeleteFaqDialog from "./agents_.$id_.states_.$sid_.responses_.delete";
import { localStorageService } from "~/resolvers/cache";



// export async function loader({ request }: LoaderArgs) {
//     try {
//         const response = await httpRequest("list_faqs", {})
//         const memories = response.payload
//         console.log(memories)
//         return memories;

//     } catch (error) {
//         return error;
//     }
// }


export default function faqs() {
    const { id, sid } = useParams();
    // const loaderData = useLoaderData() as FaqFormValues[];
    const loaderData = rdata as ResponseType[];
    const [searchTerm, setSearchTerm] = useState("");
    const [resData, setResData] = useState(loaderData)
    const [stateName, setStateName] = useState('')
    const [agentName, setAgentName] = useState('')

    const navigate = useNavigate();

    const handlePublishButtonClick = (e: any, res: ResponseType) => {
        e.stopPropagation();
        const updatedData = resData.map((item) => {
            if (item.id === res.id) {
                return { ...item, published: !res.published };
            }
            return item;
        });
        setResData(updatedData);
    };

    useEffect(() => {
        let localStateName = localStorageService.getItem('stateName')
        setStateName(localStateName)
        let localAgentName = localStorageService.getItem('agentName')
        setAgentName(localAgentName)
    }, [])

    const handleCreateTransition = () => {
        // localStorageService.setItem('agent_name', res.name)
        localStorageService.setItem('newResponse', searchTerm)
        navigate("new")
    }


    const filteredSearch = resData
        .filter((res) =>
            res.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .reverse();




    return (
        <>
            <div className="flex-1 justify-between flex flex-col h-screen bg-gray-100">
                <div className="bg-background shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-3xl capitalize">{stateName.replace(/_/g, " ")} Responses</h1>
                    <div className="flex items-center">

                        <Input
                            type="text"
                            placeholder="Search"
                            className="w-52 px-4 py-2 ml-4"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        {/* <Button variant={'secondary'} onClick={handleCreateTransition} className="ml-4" ><Plus className="mr-2 h-4 w-4" /> New Response</Button> */}
                    </div>
                </div>

                <div className="flex items-center justify-between my-4 mx-6">
                    <div>
                        <nav className="">

                            <ol className="list-reset flex">
                                <li>
                                    <Link to={'/'}>Home</Link>
                                </li>
                                <li>
                                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">{'>'}</span>
                                </li>
                                <li>
                                    <Link to={'/agents'}>Agents</Link>
                                </li>
                                <li>
                                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">{'>'}</span>
                                </li>
                                <li>
                                    <Link to={`/agents/${id}/states`}>States</Link>
                                </li>
                                <li>
                                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">{'>'}</span>
                                </li>
                                <li className="text-neutral-500 dark:text-neutral-400">Responses</li>
                            </ol>
                        </nav>
                    </div>
                    <Button variant={'secondary'} onClick={handleCreateTransition} className="bg-blue-400" ><Plus className="mr-2 h-4 w-4" /> New Response</Button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {
                        filteredSearch.length === 0
                            ?
                            <div className="overflow-y-auto  max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">

                                <div
                                    onClick={handleCreateTransition}
                                    className="bg-background max-w-4xl mx-auto hover:bg-card shadow-md rounded px-8 pt-6 pb-8 mb-4 cursor-pointer">
                                    <div className="flex flex-col items-center justify-center">
                                        <h1 className="uppercase">Create New Response</h1>
                                        <p className="case-normal">{searchTerm}</p>
                                        <Plus className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            :

                            <div className="overflow-y-auto max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">
                                {
                                    filteredSearch
                                        .map((res: ResponseType) => (
                                            // <div key={idx} className="bg-background max-w-4xl mx-auto hover:bg-card  shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                                            //     <div className="flex justify-between items-center mb-4">
                                            //         <h3 className="text-lg font-bold">{res.text}</h3>
                                            //         {res.published ?
                                            //             <div>
                                            //                 <Button onClick={(e) => handlePublishButtonClick(e, res)} variant={'secondary'} className="bg-blue-200">Publish</Button>
                                            //             </div>
                                            //             :
                                            //             <div>
                                            //                 <Button onClick={(e) => handlePublishButtonClick(e, res)} variant={'outline'}>Publish</Button>
                                            //             </div>}
                                            //         <div>
                                            //             <Link to={`/faqs/${idx}`}>
                                            //                 <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                            //             </Link>
                                            //             <DeleteFaqDialog res={res} />
                                            //         </div>
                                            //     </div>
                                            //     <h2 className="text-gray-700">ss {res.published}</h2>
                                            // </div>
                                            <div key={res.id} className="bg-background max-w-4xl mx-auto hover:bg-card shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-md normal-case mr-2">{res.text}</h3>
                                                    <div className="flex items-center space-x-2">
                                                        {res.published ? (
                                                            <Button onClick={(e) => handlePublishButtonClick(e, res)} variant="secondary" className="bg-blue-200">
                                                                Publish
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={(e) => handlePublishButtonClick(e, res)} variant="outline">
                                                                Publish
                                                            </Button>
                                                        )}
                                                        <div>
                                                            <Link to={`/agents/${id}/states/${sid}/responses/${res.id}`}>
                                                                <Button variant="outline">
                                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                        <DeleteFaqDialog res={res} stateName={stateName} agentName={agentName} label={""} />
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                }
                            </div>
                    }
                </div>
            </div>
            {/* 
            <div className="absolute bottom-10 right-10">
                <Link to={'/faqs/new'}>
                    <Button variant={"secondary"} className="hover:bg-accent rounded-full  h-14 py-4 px-4">
                        <Plus />
                    </Button>
                </Link>
            </div> */}
        </>
    );
}


const rdata = [
    {
        "id": "urn:uuid:aahgvku92cdfc8-640b-4823gfj-8b9e-5f9ea5aba6qqq51",
        // "id": "sdfgaergagafdg",
        "type_": "response",
        "published": false,
        "text": "Sure, there is no better demonstration than this one. This interaction is powered by true self. Just between us, it's not a Zoom call. There's no one on the other end."
    },
    {
        "id": "urn:uuid:aa92cjhvjvjhfkjdcjj8-640b-4823gfj-8b9e-5f9ea5aba651dd",
        // "id": "sdfgaergag",
        "type_": "response",
        "published": true,
        "text": "You're looking at it.."
    }
]