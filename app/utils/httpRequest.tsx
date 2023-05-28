import axios from "axios";
import { useState } from "react";

const _config = {
    token: '9cbaf8982a219fa0f9c0dfe3479d2315d6c118beea0e6398c7e2b67bc7b73565',
    url: 'http://0.0.0.0:8000',
    snt: "urn:uuid:cf50a7b9-41ca-4a7f-836f-b369de76ef1c"
}


export async function httpRequest(name: string, ctx: Record<string, any>) {
    let apiUrl = _config.url + "/js/walker_run";
    try {
        let res = await axios.post(apiUrl, {
            name: name,
            ctx: ctx
        },
        {headers: {Authorization: "Token " + _config.token}}
        );
        if (!res.data) {
            console.log('error throw')
            throw new Error('Payload is null');
        }
        return res.data;
    } catch (error) {
        return error;
    }
}
