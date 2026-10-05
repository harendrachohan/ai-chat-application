const userInput = document.querySelector('#user-input');
const search = document.querySelector('#search');
const chatContainer = document.querySelector('#chat-container');


async function apiServerCall(inputText){
    const response = await fetch('http://localhost:3000/chat',{
        method: "POST",
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify({"message":inputText})
    })
    if(!response.ok){
        throw("Server side error");
    }
    const result= await response.json();
    return result.message;

}

async function sendMessage() {

    const text = userInput.value.trim();

    if (!text) return;

    console.log("text:", text);
    
    userInput.value = "";

    /***
     * 1 append message
     * 2 sent it LLM
     * 3 append the response to the UI
     */
    const msg = document.createElement('div');
    msg.className="flex justify-end mb-6";
    msg.innerHTML = `<div class="flex items-end gap-3 max-w-[85%] md:max-w-[70%]">
            <div
                class="bg-[#2f2f2f]
                       rounded-2xl rounded-br-md
                       px-4 py-3
                       text-[15px]
                       leading-6
                       text-white">

                ${text}

            </div>

            <div
                class="flex-shrink-0
                       w-8 h-8
                       rounded-full
                       bg-gray-600
                       flex items-center
                       justify-center
                       text-sm">

                U

            </div>

        </div>
    `;

    chatContainer.appendChild(msg);
    //call the server
    const assistantMessage = await apiServerCall(text);

  // assistantMessage append -->
    const assistantMsgElement = document.createElement('dev');
    assistantMsgElement.className="flex justify-start mb-6";
    assistantMsgElement.innerHTML = `<div class="flex items-start gap-3 max-w-[85%] md:max-w-[75%]">
                        <div
                            class="flex-shrink-0
                                w-8 h-8
                                rounded-full
                                bg-white
                                text-black
                                flex items-center
                                justify-center">

                            ✦

                        </div>
                        <div
                            class="text-[15px]
                                leading-7
                                text-gray-100
                                pt-1">
                              ${assistantMessage}

                        </div>

    </div>
    `;
    // assistantMsgElement.textContent= assistantMessage;
    chatContainer?.appendChild(assistantMsgElement)

    console.log("assistantMessage",assistantMessage);
}

search?.addEventListener('click', sendMessage);

userInput?.addEventListener('keydown', (e) => {

    if (e.key === 'Enter' && !e.shiftKey) {

        e.preventDefault();

        sendMessage();
    }

});