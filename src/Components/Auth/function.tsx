import { urlFetchCalls } from "../../../src/Constant";

/**
 * Returns the strenght of the password.
 * A password must contain ATLEAST one Uppercase , one lowercase , one specialchar , one Number.
 * lenght of password must be 8 or above
 * @param user_password User password (must be string)
 * @returns Returns the strenght of the password.
 */
export const PasswordStrenght: any = (user_password: string) => {
    let strenght: number = 0;
    const Special_chars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const ownWeight: number = 20;
    if (/.*[a-z].*/.test(user_password)) {
        strenght = strenght + ownWeight;
    }
    if (/\d/.test(user_password)) {
        strenght = strenght + ownWeight;
    }
    if (/.*[A-Z].*/.test(user_password)) {
        strenght = strenght + ownWeight;
    }
    if (Special_chars.test(user_password)) {
        strenght = strenght + ownWeight;
    }
    if (user_password.length >= 8) {
        strenght = strenght + ownWeight;
    }
    /**
     * Returns the strenght of the password.
     */
    return strenght;
};

/**
 * Web Socket Init Method
 * @param _props DIProps
 * @param setMethod Set Value In State
 * @param str check which component call this method
 */

export function webSocketInit(_props: any, setMethod: any, str: any) {
    const token = _props.di.globalState.getBearerToken();
    const userId = _props.match.uId;
    const clientId = 7;
    const { di: { GET } } = _props
    const { get: { queuedTaskUrl } } = urlFetchCalls
    if ("WebSocket" in window) {
        var ws = new WebSocket(
            'wss://a5zls8ce93.execute-api.us-east-2.amazonaws.com/beta'
        );
        ws.onopen = function () {
            // just after opening connection its required to send identity to server
            ws.send(
                '{ "action": "identity","client_id":' +
                clientId +
                ',"customer_id":"' +
                userId +
                '","token":"' +
                token +
                '"}'
            );
        };
        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            if (str === "dot") {
                if (received_msg.toLowerCase().includes('"new_notification":true') || received_msg === "notification"
                ) {
                    localStorage.setItem(`${userId}_showNotification`, "true")
                    setMethod(localStorage.getItem(`${_props.match.uId}_showNotification`))
                }
            } else if (str === "banner") {
                GET(queuedTaskUrl)
                    .then((res: any) => {
                        if (res.success === true) {
                            setMethod({
                                message: res.data.rows[0].process_code,
                                destroy: false
                            })
                        }
                    })
            }
        };
        ws.onclose = function () {
            // websocket is closed.
            console.log('Connection is closed...');
            // webSocketInit(_props, setMethod);
        };
    } else {
        console.log("Websocket Not Connected")
    }
}



