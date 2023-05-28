// import { Link, Links, useNavigate } from "@remix-run/react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card";
// import { AgentsType, StatesType, ddata } from "./_index";
// import ToggleButton from "components/ui/togglebutton";
// import { Button } from "components/ui/button";
// import { useEffect, useState } from "react";
// import { localStorageService } from "~/resolvers/cache";
// import { Edit } from "lucide-react";

// export default function Agents() {

//     const navigate = useNavigate();
//     const agentsList = ddata as PromptsType
//     const [agentName, setAgentName] = useState("")
//     const [agentdata, setAgentData] = useState<StatesType[]>([])


//     useEffect(() => {
//         const localname = localStorageService.getItem('agentName')
//         setAgentName(localname)
//         const filteredAgents = agentsList.filter((res) => res.name === agentName);
//         if (filteredAgents.length > 0 && 'states' in filteredAgents[0]) {
//             setAgentData(filteredAgents[0].states);
//         }
//     }, [agentName])

//     const handlePublishButtonClick = (e: any, res: StatesType) => {
//         e.stopPropagation();
//         const updatedData = agentdata.map((item) => {
//             if (item.name === res.name) {
//                 return { ...item, published: !res.published };
//             }
//             return item;
//         });
//         setAgentData(updatedData);
//     };

//     // const handleTransition = (res: StatesType) => {
//     //     // localStorageService.setItem('agent_name', res.name)
//     //     // localStorageService.setItem('agent_name', res.name)
//     //     navigate("edit")
//     // }

//     const id = 'sadfljsaof';

//     const handleEditButtonClick = (e: any, res: StatesType) => {
//         e.stopPropagation();
//         navigate(id)
//     };

//     return (
//         <div className="flex-1 justify-between flex flex-col bg-background">
//             <h1>{agentName} states</h1>
//             <div className="flex flex-wrap mt-20">
//                 {agentdata &&
//                     agentdata.map((res: StatesType, idx) => (
//                         <div key={idx} className="w-1/5 my-2">
//                             <div className="mx-2">
//                                 <Card >
//                                     {/* <Card onClick={() => handleTransition(res)}> */}
//                                     <CardHeader className="pb-2 pr-0 ">
//                                         <CardTitle className="flex items-center uppercase  justify-between">
//                                             {res.name}
//                                             <Button variant="ghost" className="" onClick={(e) => handleEditButtonClick(e, res)} ><Edit className="h-4 w-4" /></Button>
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="h-32">

//                                         <div className="">
//                                             <Link to={'asdf'} className="flex center py-1 hover:bg-gray-100" >
//                                                 <div className="mr-4">Type:</div>
//                                                 <div className="value flex-grow text-right">{res.type}</div>
//                                             </Link>
//                                             <Link to={'asdf'} className="flex center py-1 hover:bg-gray-100" >
//                                                 <div className="mr-4">Prompts:</div>
//                                                 <div className="value flex-grow text-right">{res.prompts.length}</div>
//                                             </Link>
//                                             <Link to={'asdf'} className="flex center py-1 hover:bg-gray-100" >
//                                                 <div className="mr-4">Replies:</div>
//                                                 <div className="value flex-grow text-right">{res.replies.length}</div>
//                                             </Link>
//                                             <Link to={'asdf'} className="flex center py-1 hover:bg-gray-100" >
//                                                 <div className="mr-4">Responses:</div>
//                                                 <div className="value flex-grow text-right">{res.state_responses.length}</div>
//                                             </Link>
//                                         </div>



//                                     </CardContent>
//                                     <CardFooter className="flex mt-4 justify-between">
//                                         <div></div>
//                                         {res.published ?
//                                             <div>
//                                                 <Button onClick={(e) => handlePublishButtonClick(e, res)} variant={'secondary'} className="bg-blue-200">Publish</Button>
//                                             </div>
//                                             :
//                                             <div>
//                                                 <Button onClick={(e) => handlePublishButtonClick(e, res)} variant={'outline'}>Publish</Button>
//                                             </div>}
//                                     </CardFooter>
//                                 </Card>
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div >
//     )
// }



// const ddata = ["Hi", "Hello", "Hiya"]