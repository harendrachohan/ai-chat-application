const userInput = document.querySelector('#user-input');
const search = document.querySelector('#search');
const chatContainer = document.querySelector('#chat-container');

 
function sendMessage() {

    const text = userInput.value.trim();

    if (!text) return;

    console.log("text:", text);
    
    userInput.value = "";

    /***
     * 1 append message
     * 2 sent it LLM
     * 3  append the response to the UI
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
}

search?.addEventListener('click', sendMessage);

userInput?.addEventListener('keydown', (e) => {

    if (e.key === 'Enter' && !e.shiftKey) {

        e.preventDefault();

        sendMessage();
    }

});