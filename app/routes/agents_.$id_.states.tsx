import { Link, Links, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import { AgentsType, StateType, StatesType } from "./_index";
import ToggleButton from "components/ui/togglebutton";
import { Button } from "components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { localStorageService } from "~/resolvers/cache";
import { Edit, Plus } from "lucide-react";
import { Input } from "components/ui/input";
import { LoaderArgs } from "@remix-run/node";
import { z } from "zod";
import { liststate } from "~/resolvers/states";



export async function loader({ request, params }: LoaderArgs) {
    try {
        const response = await liststate({ id: params.id })

        // const initialData = response.payload.map((agent:any) => ({
        const initialData = ddata['payload'].map((agent) => ({
            ...agent,
            published: z.coerce.boolean().parse(agent.published.toLowerCase() === 'true'),
        }));


        const dlen = len
        return [initialData, dlen]
    } catch (error) {
        return error;
    }
}

export default function Agents() {

    const navigate = useNavigate();
    const [stateList, dlen] = useLoaderData()
    const [stateData, setStateData] = useState<StateType[]>(stateList)
    const [searchTerm, setSearchTerm] = useState("");


    const [agentName, setAgentName] = useState('')

    useEffect(() => {
        const localname = localStorageService.getItem('agentName')
        setAgentName(localname)

    }, [agentName])

    const handlePublishButtonClick = (e: any, res: StateType) => {
        e.stopPropagation();
        const updatedData = stateData.map((item) => {
            if (item.name === res.name) {
                return { ...item, published: !res.published };
            }
            return item;
        });
        setStateData(updatedData);
    };

    const {id} = useParams()

    const handleEditButtonClick = (e: any, res: StateType) => {
        e.stopPropagation();
        if(id) navigate(id)
    };

    const handleResponseTransition = (res: StateType) => {
        localStorageService.setItem('stateName', res.name)
        navigate(res.id+"/responses")
    }

    const handleRepliesTransition = (res: StateType) => {
        localStorageService.setItem('stateName', res.name)
        navigate(res.id+"/replies")
    }

    const handlePromptsTransition = (res: StateType) => {
        localStorageService.setItem('stateName', res.name)
        navigate(res.id+"/prompts")
    }

    const handleTypeTransition = (res: StateType) => {
        // localStorageService.setItem('stateName', res.name)
        navigate(res.id+"/responses")
    }

    const filteredSearch = stateData
        .filter((res) =>
            res.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .reverse();

    const handleCreateTransition = () => {
        // localStorageService.setItem('agent_name', res.name)
        localStorageService.setItem('newState', searchTerm)
        navigate("new")
    }

    // const colors: { [key: string]: string } = {};
    // Dynamically create the typeColors mapping
    // useMemo(() => {
        //     const updatedColors: Colors = {};
        //     stateData.forEach((res) => {
            //       updatedColors[res.type_] = getRandomColor();
            //     });
            //     setColors(updatedColors);
            //   }, [stateData]);
            
    const [colors, setColors] = useState<Colors>({})
    // useEffect(() => {
    //     const updatedColors: Colors = {};
    //     stateData.forEach((res) => {
    //       updatedColors[res.type_] = colors[res.type_] || getRandomColor();
    //     });
    //     setColors(updatedColors);
    //   }, [stateData]);

    // useEffect(()=>{
    //     let localColor = localStorageService.getItem("labelColors")

    //     if(localColor){
    //         setColors(localColor)
    //     }
    //     else{
    //         stateData.forEach((item) => {
    //             const color = getRandomColor(colors);
    //             const lightColor = lightenColor(color, 0.3); // Increase the lightness by 30%
    //             setColors({[item.type_]: lightColor});
    //         });
            
    //         localStorageService.setItem("labelColors", localColor)
    //     }
        
    // }, [])

    useEffect(() => {
        let localColor = localStorageService.getItem("labelColors");
      
        if (localColor) {
          setColors(localColor);
        //   console.log(colors)
        //   console.log(localColor)
        } 
        else {
          const updatedColors: Colors = {};
          stateData.forEach((item) => {
            const color = getRandomColor(colors);
            // const lightColor = lightenColor(color, 0.5); // Increase the lightness by 30%
            updatedColors[item.type_] = color;
          });
          setColors(updatedColors);
          localStorageService.setItem("labelColors", updatedColors);
        }
      }, []);
    // console.log(typeColors)
    // stateData.forEach((item)=>{
    //     console.log(colors[item.type_])
    // })

    // useEffect(() => {
    //     console.log(colors);
    //   }, [colors]);

    return (
        <div className="flex-1 justify-between flex flex-col bg-background">
            <div className="bg-background shadow-md p-4 flex justify-between items-center">
                <h1 className="text-3xl capitalize">{agentName} States</h1>
                <div className="flex items-center">

                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-48 px-4 py-2 ml-4"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <Button variant={'secondary'} onClick={handleCreateTransition} className="ml-4" ><Plus className="mr-2 h-4 w-4" /> New State</Button>
                </div>
            </div>
            {
                filteredSearch.length === 0
                    ?
                    <div className="flex flex-col items-center justify-center mt-10">
                        <Card onClick={handleCreateTransition} className="w-1/6 h-34 flex flex-col cursor-pointer items-center bg-secondary  justify-center">

                            <CardTitle className="flex my-2 pt-4 items-center justify-between capitalize">
                                Create State
                            </CardTitle>
                            <CardContent className="my-4 normal-case flex flex-col items-center text-center">
                                {/* <Plus className="mr-2 h-4 w-4" />
                            New Agent */}
                                {searchTerm}
                                <Plus className="mt-2" />
                            </CardContent>
                        </Card>
                    </div>
                    :
                    <div className="flex flex-wrap mt-20">
                        {colors && filteredSearch
                            .map((res: StateType) => (
                                <div key={res.id} className="w-1/5 py-2">
                                    <div className="px-2">
                                        {/* <Card className={`p-0 border-${colors[res.type_] || `blue`}-200`} > */}
                                        {/* <Card className={`p-0 border-${colors[res.type_] || getRandomColor().slice(1)}-200`}> */}
                                        {/* <Card className={`rounded-lg border bg-card text-card-foreground shadow-sm p-0 border-${colors[res.type_] || 'blue'}-200 `}> */}
                                        {/* <Card style={bordercolor: colors}> */}
                                        <Card style={{ backgroundColor: `${colors[res.type_] || 'red'}11` }} >
                                        {/* <Card style={{ borderColor: colors[res.type_] || 'red' }} > */}
                                        {/* <Card style={{ borderColor: 'blue' || 'red' }} > */}


                                            {/* <Card onClick={() => handleTransition(res)}> */}
                                            <CardHeader className="pb-2 pr-0 pl-4">
                                                <CardTitle className="flex items-center uppercase  justify-between">
                                                    {res.name}
                                                    <Button variant="link" className="hover:text-blue-500" onClick={(e) => handleEditButtonClick(e, res)} ><Edit className="h-4 w-4" /></Button>

                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="h-32 p-0 ">

                                                <div className="">
                                                    <div onClick={(e) => handleTypeTransition(res)} className="flex center py-1 px-4 hover:bg-gray-100 cursor-pointer">

                                                        <div className="mr-4">Type:</div>
                                                        <div className="value flex-grow text-right">{res.type_}</div>
                                                    </div>
                                                    <div onClick={(e) => handlePromptsTransition(res)} className="flex center py-1 px-4 hover:bg-gray-100 cursor-pointer">

                                                        <div className="mr-4">Prompts:</div>
                                                        <div className="value flex-grow text-right">{dlen.prompts}</div>
                                                    </div>
                                                    <div onClick={(e) => handleRepliesTransition(res)} className="flex center py-1 px-4 hover:bg-gray-100 cursor-pointer">
                                                        <div className="mr-4">Replies:</div>
                                                        <div className="value flex-grow text-right">{dlen.replies}</div>
                                                    </div>
                                                    {/* <Link to={'responses'} className="flex center py-1 hover:bg-gray-100" > */}
                                                    <div onClick={(e) => handleResponseTransition(res)} className="flex center py-1 px-4 hover:bg-gray-100 cursor-pointer">
                                                        <div className="mr-4">Responses:</div>
                                                        <div className="value flex-grow text-right">{dlen.responses}</div>
                                                    </div>
                                                    {/* </Link> */}
                                                </div>



                                            </CardContent>
                                            <CardFooter className="flex mt-4 justify-between px-4">
                                                <div></div>
                                                {/* <Button variant="outline" className="" onClick={(e) => handleEditButtonClick(e, res)} ><Edit className="h-4 w-4" /></Button> */}
                                                {res.published ?
                                                    <div>
                                                        <Button onClick={(e) => handlePublishButtonClick(e, res)} variant={'secondary'} className="bg-blue-200">Publish</Button>
                                                    </div>
                                                    :
                                                    <div>
                                                        <Button onClick={(e) => handlePublishButtonClick(e, res)} variant={'outline'}>Publish</Button>
                                                    </div>}
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </div >
    )
}


const ddata = {
    "notice": "",
    "payload": [
        {
            "id": "urn:uuid:7c0cdd02-afa8-47e8-9908-278e805lknlea017",
            "type_": "response",
            "name": "qa_state22",
            "published": "true"
        },
        {
            "id": "urn:uuid:1ca0c9d5-5faa-493f-bb97-56lkn45129b895d",
            "type_": "nlu_response",
            "name": "qa_state",
            "published": "true"
        },
        {
            "id": "urn:uuid:e872c8a9-3855-407e-b649-9540034lknlea792",
            "type_": "ner_response",
            "name": "greets",
            "published": "true"
        },
        {
            "id": "urn:uuid:e872c8a9-3855-407e-b649-9540lnln034ea792",
            "type_": "ner_response",
            "name": "greets",
            "published": "true"
        }
    ]
}

const len = {
    "replies": 0,
    "responses": 4,
    "prompts": 5
}

// const getRandomColor = () => {
//     const colors = ['red', 'blue', 'green', 'orange', 'purple'];
//     const randomIndex = Math.floor(Math.random() * colors.length);
//     return colors[randomIndex];
//   };

// const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// };

//   // Define the mapping of colors for each type
//   const typeColors = {
//     type1: 'red',
//     type2: 'blue',
//     type3: 'green',
//     type4: 'orange',
//     type5: 'purple',
//   };
interface Colors {
    [key: string]: string;
  }



export function getRandomColor(usedColors: { [key: string]: string }) {
    const letters = "0123456789ABCDEF";
    let color = "#";
    let isUnique = false;
  
    while (!isUnique) {
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
  
      if (!usedColors[color]) {
        isUnique = true;
      } else {
        color = "#";
      }
    }
  
    return color;
  }
  
  
  
//   export function lightenColor(color: string, amount: number) {
//     const hex = color.slice(1);
//     const rgb = parseInt(hex, 16);
//     const r = (rgb >> 16) + amount * 255;
//     const g = ((rgb >> 8) & 0x00ff) + amount * 255;
//     const b = (rgb & 0x0000ff) + amount * 255;
//     const newColor = (r << 16) | (g << 8) | b;
//     return "#" + newColor.toString(16).padStart(6, "0");
//   }
  