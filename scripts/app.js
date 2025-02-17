const API_KEY = 'SUA API KEY AQUI!';
const containerMsg = document.getElementById("response-log");
const inputEnter = document.getElementById('user-input');

// CHAMAR ENVIARMENSAGEM() AO APERTAR ENTER ESTANDO NO INPUT
inputEnter.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        enviarMensagem();
    }
});

async function enviarMensagem() {
    const mensagem = document.getElementById("user-input").value;
    document.getElementById("user-input").value = "";
    
    if (mensagem.length < 5) {
        console.log("entrou no if");
        const mensagemErr = 'Por favor, insira um prompt!';
        mostrarMensagem(mensagemErr);
        return;
        
    } else {

        containerMsg.innerHTML = 'Pensando...';

        try {
            console.log("Passou pelo try");
            const conn = await fetch("https://openrouter.ai/api/v1/chat/completions" ,{
                method: "POST",
                headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    model: "google/gemini-2.0-flash-lite-preview-02-05:free",
                    messages: [{
                        "role": "user",
                        "content": mensagem,
                    }]
                })
            })

            const data = await conn.json();
            console.log(data);

            const resposta = data.choices[0].message.content;
            mostrarMensagem(resposta);
            
        } catch (err) {
            containerMsg.innerHTML = `Ocorreu um erro com o modelo: ${err}`;
        }

    }

}

function mostrarMensagem(resposta) {
    containerMsg.innerHTML = "";

    const respostaDiv = document.createElement("div");
    const responseTl = document.createElement("p");
    const respostaP = document.createElement("p");

    responseTl.classList.add('response-tl');
    responseTl.innerHTML = '<svg height="1em" style="flex:none;line-height:1" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Gemini</title><defs><linearGradient id="lobe-icons-gemini-fill" x1="0%" x2="68.73%" y1="100%" y2="30.395%"><stop offset="0%" stop-color="#1C7DFF"></stop><stop offset="52.021%" stop-color="#1C69FF"></stop><stop offset="100%" stop-color="#F0DCD6"></stop></linearGradient></defs><path d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12" fill="url(#lobe-icons-gemini-fill)" fill-rule="nonzero"></path></svg><h6>Gemini:</h6>';
    respostaP.innerHTML = resposta;

    respostaDiv.appendChild(responseTl);
    respostaDiv.appendChild(respostaP);
    containerMsg.appendChild(respostaDiv);
}