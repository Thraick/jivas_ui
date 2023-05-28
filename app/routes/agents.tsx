import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import { AgentType, AgentsType, } from "./_index";
import ToggleButton from "components/ui/togglebutton";
import { Button } from "components/ui/button";
import { useState } from "react";
import { localStorageService } from "~/resolvers/cache";
import { Edit, Plus, X } from "lucide-react";
import { Input } from "components/ui/input";
import { listAgent } from "~/resolvers/agents";
import { LoaderArgs } from "@remix-run/node";
import { z } from "zod";


export async function loader({ request }: LoaderArgs) {
    try {
        const response = await listAgent({})

        // const initialData = response.payload.map((agent: any) => ({
        const initialData = ddata['payload'].map((agent) => ({
            ...agent,
            published: z.coerce.boolean().parse(agent.published.toLowerCase() === 'true'),
        }));



        return initialData
    } catch (error) {
        return error;
    }
}


export default function Agents() {
    const agentsList = useLoaderData() as AgentType[]
    const [agentData, setAgentData] = useState(agentsList)
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");




    const handlePublishButtonClick = (e: any, res: AgentType) => {
        e.stopPropagation();
        const updatedData = agentData.map((item) => {
            if (item.name === res.name) {
                const published = Boolean(item.published); // Convert to boolean

                const data = { ...item, published: !published };
                console.log("data")
                console.log(data)
                return data
            }
            return item;
        });
        setAgentData(updatedData);
    };

    const handleEditButtonClick = (e: any, res: AgentType) => {
        e.stopPropagation();
        navigate(res.id)
    };

    const handleTransition = (res: AgentType) => {
        localStorageService.setItem('agentName', res.name)
        navigate(res.id + "/states")
    }

    const filteredSearch = agentData
        .filter((res) =>
            res.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .reverse();

    const handleCreateTransition = () => {
        // localStorageService.setItem('agent_name', res.name)
        localStorageService.setItem('newAgent', searchTerm)
        navigate("new")
    }

    return (
        <div className="flex-1 justify-between flex flex-col bg-background">
            <div className="bg-background shadow-md p-4 flex justify-between items-center">
                <h1 className="text-3xl capitalize">Agents</h1>
                <div className="flex items-center">

                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-48 px-4 py-2 ml-4"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <Button variant={'secondary'} onClick={handleCreateTransition} className="ml-4" ><Plus className="mr-2 h-4 w-4" /> New Agent</Button>
                </div>
            </div>

            {
                filteredSearch.length === 0
                    ?
                    <div className="flex flex-col items-center justify-center mt-10">
                        <Card onClick={handleCreateTransition} className="w-1/6 h-34 flex flex-col cursor-pointer items-center bg-secondary  justify-center">
                            <CardTitle className="flex my-2 pt-4 items-center justify-between capitalize">
                                Create Agent
                            </CardTitle>
                            <CardContent className="my-4 normal-case flex flex-col items-center text-center">
                                {/* <Plus className="mr-2 h-4 w-4" />
                            New Agent */}
                                {searchTerm}
                                <Plus className="mt-2"  />
                            </CardContent>
                        </Card>
                    </div>
                    :
                    <div className="flex flex-wrap mt-10">

                        {
                            filteredSearch
                                // .reverse()
                                .map((res: AgentType) => {
                                    return (
                                        <div key={res.id} className="w-1/4 my-2">
                                            <div className="mx-2 cursor-pointer">
                                                <Card onClick={() => handleTransition(res)}>
                                                    <CardHeader className="flex mt-4 justify-between">
                                                        <CardTitle className="flex items-center justify-between capitalize">
                                                            {res.name}
                                                            <Button variant="ghost" onClick={(e) => handleEditButtonClick(e, res)} ><Edit className="h-4 w-4" /></Button>
                                                        </CardTitle>

                                                    </CardHeader>
                                                    <CardContent className="h-24 normal-case">
                                                        {res.description ? (
                                                            res.description.length > 100 ? (
                                                                `${res.description.substring(0, 100)}...`
                                                            ) : (
                                                                res.description
                                                            )
                                                        ) : (
                                                            "No description available"
                                                        )}
                                                    </CardContent>
                                                    <CardFooter className="flex mt-4 justify-between">
                                                        {
                                                            res.published
                                                                ?
                                                                <div>
                                                                    <Button onClick={(e) => handlePublishButtonClick(e, res)} variant={'secondary'} className="bg-blue-200">Publish</Button>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <Button onClick={(e) => handlePublishButtonClick(e, res)} variant={'outline'}>Publish</Button>
                                                                </div>}
                                                        <div>Confidence: {res.nlu_confidence}</div>
                                                    </CardFooter>
                                                </Card>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
            }

        </div>

    )
}



const ddata = {
    "notice": "",
    "payload": [
        {
            "id": "urn:uuid:aa92cdc8-640b-4823-8b9e-5fgjf9ea5aba651",
            "name": "agent x",
            "published": "false",
            "description": "In this updated code, a conditional check is added to verify if res.description is defined. If it is, then the code proceeds with the length check and truncation as before.. ",
            "nlu_confidence": 0.3,
            "ner_confidence": 0.1,
            "sen_confidence": 0.1
        },
        {
            "id": "urn:uuid:dc571585-133f-4a5e-81gfhj44-b5a5f62be1a7",
            "name": "agent z",
            "published": "true",
            "description": "this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. ",
            "nlu_confidence": 0.3,
            "ner_confidence": 0.1,
            "sen_confidence": 0.1
        },
        {
            "id": "urn:uuid:aa92cdc8-640b-4823gfj-8b9e-5f9ea5aba651",
            "name": "agent x",
            "published": "false",
            "description": "In this updated code, a conditional check is added to verify if res.description is defined. If it is, then the code proceeds with the length check and truncation as before.. ",
            "nlu_confidence": 0.3,
            "ner_confidence": 0.1,
            "sen_confidence": 0.1
        },
        {
            "id": "urn:uuid:dc571585-133f-gfhj4a5e-8144-b5a5f62be1a7",
            "name": "agent z",
            "published": "true",
            "description": "this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. ",
            "nlu_confidence": 0.3,
            "ner_confidence": 0.1,
            "sen_confidence": 0.1
        }, {
            "id": "urn:uuid:aa92cdc8-64fss0b-4823-8b9e-5f9ea5aba651",
            "name": "agent x",
            "published": "false",
            "description": "In this updated code, a conditional check is added to verify if res.description is defined. If it is, then the code proceeds with the length check and truncation as before.. ",
            "nlu_confidence": 0.3,
            "ner_confidence": 0.1,
            "sen_confidence": 0.1
        },
        {
            "id": "urn:uuid:dc571585sdf-133f-4a5e-8144-b5a5f62be1a7",
            "name": "agent z",
            "published": "true",
            "description": "this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. ",
            "nlu_confidence": 0.3,
            "ner_confidence": 0.1,
            "sen_confidence": 0.1
        }, {
            "id": "urn:uuid:aa92cdcsc8-640b-4823-8b9e-5f9ea5aba651",
            "name": "agent x",
            "published": "false",
            "description": "In this updated code, a conditional check is added to verify if res.description is defined. If it is, then the code proceeds with the length check and truncation as before.. ",
            "nlu_confidence": 0.3,
            "ner_confidence": 0.1,
            "sen_confidence": 0.1
        },
        {
            "id": "urn:uuid:dcwewa571585-133f-4a5e-8144-b5a5f62be1a7",
            "name": "agent z",
            "published": "true",
            "description": "this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. ",
            "nlu_confidence": 0.3,
            "ner_confidence": 0.1,
            "sen_confidence": 0.1
        },
        {
            "id": "urn:uuid:aa92cdcew8-640b-4823-8b9e-5f9ea5aba651",
            "name": "agent x",
            "published": "false",
            "description": "In this updated code, a conditional check is added to verify if res.description is defined. If it is, then the code proceeds with the length check and truncation as before.. ",
            "nlu_confidence": 0.3,
            "ner_confidence": 0.1,
            "sen_confidence": 0.1
        },
        {
            "id": "urn:uuid:dc5715w85-133f-4a5e-8144-b5a5f62be1a7",
            "name": "agent z",
            "published": "true",
            "description": "this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. this is agent x. ",
            "nlu_confidence": 0.3,
            "ner_confidence": 0.1,
            "sen_confidence": 0.1
        }
    ]
}