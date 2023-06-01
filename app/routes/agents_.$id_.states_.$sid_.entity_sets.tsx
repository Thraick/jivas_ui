import { LoaderArgs, redirect } from "@remix-run/node";
import { Edit, Plus } from "lucide-react";
import { Link, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { EntitySetType, ResponseType } from "./_index";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import DeleteFaqDialog from "./agents_.$id_.states_.$sid_.responses_.delete";
import { localStorageService } from "~/resolvers/cache";
import DeleteEntitySetDialog from "./agents_.$id_.states_.$sid_.entity_sets_.delete";



export async function loader({ request }: LoaderArgs) {
    try {
        // const response = await httpRequest("list_faqs", {})
        // const memories = response.payload
        // console.log(memories)
        // return memories;

        const initialData = rdata['payload']
        return initialData

    } catch (error) {
        return error;
    }
}


export default function faqs() {
    const { id, sid } = useParams();
    const loaderData = useLoaderData() as EntitySetType[];
    // const loaderData = rdata as EntitySetType[];
    const [searchTerm, setSearchTerm] = useState("");
    const [resData, setResData] = useState(loaderData)
    const [stateName, setStateName] = useState('')
    const [agentName, setAgentName] = useState('')

    const navigate = useNavigate();

    // const handlePublishButtonClick = (e: any, res: ResponseType) => {
    //     e.stopPropagation();
    //     const updatedData = resData.map((item) => {
    //         if (item.text === res.text) {
    //             return { ...item, published: !res.published };
    //         }
    //         return item;
    //     });
    //     setResData(updatedData);
    // };

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
            res.entity.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .reverse();




    return (
        <>
            <div className="flex-1 justify-between flex flex-col h-screen bg-gray-100">
                <div className="bg-background shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-3xl capitalize">{stateName.replace(/_/g, " ")} Response</h1>
                    <div className="flex items-center">

                        <Input
                            type="text"
                            placeholder="Search"
                            className="w-48 px-4 py-2 ml-4"
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
                                    <a
                                        href="#"
                                        className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >Home
                                    </a>
                                </li>
                                <li>
                                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">{'>'}</span>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >Agents</a>
                                </li>
                                <li>
                                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">{'>'}</span>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >States</a>
                                </li>
                                <li>
                                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">{'>'}</span>
                                </li>
                                <li className="text-neutral-500 dark:text-neutral-400">Entity Set</li>
                            </ol>
                        </nav>
                    </div>
                    <Button variant={'secondary'} onClick={handleCreateTransition} className="bg-gray-400" ><Plus className="mr-2 h-4 w-4" /> New Response</Button>
                </div>

                {
                    filteredSearch.length === 0
                        ?
                        <div className="overflow-y-auto max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">

                            <div
                            onClick={handleCreateTransition} 
                            className="bg-background max-w-4xl mx-auto hover:bg-card shadow-md rounded px-8 pt-6 pb-8 mb-4 cursor-pointer">
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="uppercase">Create New Entity</h1>
                                    <p className="case-normal">{searchTerm}</p>
                                    <Plus className="mt-2" />
                                </div>
                            </div>
                        </div>
                        :

                        <div className="overflow-y-auto max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">
                            {
                                filteredSearch
                                    .map((res: EntitySetType) => (
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
                                        <div key={res.id} className="bg-background max-w-4xl mx-auto hover:bg-card shadow-md rounded px-8 py-4  mb-4">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-md normal-case mr-2">{res.entity}</h3>
                                                <div className="flex items-center space-x-2">
                                                    {/* {res.published ? (
                                                        <Button onClick={(e) => handlePublishButtonClick(e, res)} variant="secondary" className="bg-blue-200">
                                                            Publish
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={(e) => handlePublishButtonClick(e, res)} variant="outline">
                                                            Publish
                                                        </Button>
                                                    )} */}
                                                    <div>
                                                        <Link to={`/agents/${id}/states/${sid}/responses/${res.id}`}>
                                                            <Button variant="outline">
                                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                    <DeleteEntitySetDialog res={res} stateName={stateName} agentName={agentName} label={""} />
                                                </div>
                                            </div>
                                        </div>

                                    ))
                            }
                        </div>
                }
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


const rdata = {
    "notice": "",
    "payload": [
      {
        "id": "urn:uuid:c57b24a7-cc06-41d2-b706-3d2e9bc16a32",
        "entity": "names"
      },
      {
        "id": "urn:uuid:5f919826-f8ac-43a9-89e0-1f4118f91532",
        "entity": "number"
      },
      {
        "id": "urn:uuid:79329834-8150-400a-b959-0f2c2b197acb",
        "entity": "address"
      }
    ]
  }