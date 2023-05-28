// import { Link, useNavigate } from "@remix-run/react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card";
// import { AgentsType, StatesType, ddata } from "./_index";
// import ToggleButton from "components/ui/togglebutton";
// import { Button } from "components/ui/button";
// import { useEffect, useState } from "react";
// import { localStorageService } from "~/resolvers/cache";

// export default function Agents() {

//     const navigate = useNavigate();
//     const agentsList = ddata as AgentsType[]
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

//     const handleTransition = (res: StatesType) => {
//         localStorageService.setItem('agent_name', res.name)
//         navigate(id)
//     }

//     const id = 'sadfljsaof';

//     return (
//         <div className="flex-1 justify-between flex flex-col bg-background">
//             <h1>{agentName} states</h1>
//             <div className="flex flex-wrap mt-20">
//                 {agentdata &&
//                     agentdata.map((res: StatesType, idx) => (
//                         <div key={idx} className="w-1/3 my-2">
//                             <div className="mx-2">
//                                 <Card onClick={() => handleTransition(res)}>
//                                     <CardHeader>
//                                         <CardTitle className="flex justify-between">{res.name}</CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="h-24">
//                                     </CardContent>
//                                     <CardFooter className="flex mt-4 justify-between">
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
//         </div>
//     )
// }


