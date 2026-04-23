export const homepage = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>pcb zoom</title>
</head>

<body>

    <video id="remoteStream" autoplay playsinline width="1280" height="720" class="remoteStream"></video>
    <br>
    <input id="serverIP" type="text" size=20 placeholder="server ip" />
    <input id="serverPort" type="text" size=20 placeholder="port" />
    <button id="connectBtn">connect</button>

    <script>
      const connectBtn = document.getElementById("connectBtn");
      const remoteStream = document.getElementById("remoteStream");
      const serverIPInput = document.getElementById("serverIP");
      const serverPortInput = document.getElementById("serverPort");

      const pc = new RTCPeerConnection();
      let localCandidates = [];

      pc.onicecandidate = (event) => {
        if (!event.candidate) return;
        localCandidates.push(event.candidate);
      };

      // Escuchar el stream remoto cuando llegue
      pc.ontrack = (event) => {
        if (remoteStream.srcObject !== event.streams[0]) {
          remoteStream.srcObject = event.streams[0];
          console.log("Recibiendo stream remoto");
        }
      };

      const fetchOffer = async (baseUrl) => {
        console.log("Solicitando offer...");
        const response = await fetch(baseUrl + "/offer", {
          method: "GET",
          headers: {
            "Content-type" : "application/json",
          }
        });

        if (!response.ok) {
          throw new Error("Error en offer: " + response.status);
        }

        const offer = await response.json();
        console.log("Offer recibida:", offer);
        return offer;
      };

      const sendAnswer = async (baseUrl, answer) => {
        console.log("Enviando answer...");
        const response = await fetch(baseUrl + "/answer", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(answer),
        });

        if (!response.ok) {
          throw new Error("Error al enviar answer: " + response.status);
        }
        console.log("Answer enviada correctamente");
      };

      const handleCandidates = async (baseUrl) => {
        console.log("Intercambiando candidatos ICE...");
        const response = await fetch(baseUrl + "/icecandidates", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(localCandidates),
        });

        localCandidates = [];

        if (!response.ok) {
          throw new Error("Error en candidatos: " + response.status);
        }

        const candidates = await response.json();
        if (candidates.length > 0) {
          for (const candidate of candidates) {
            await pc.addIceCandidate(candidate);
          }
          console.log("Procesados " + candidates.length + " candidatos remotos");
        } else {
          console.log("No se recibieron candidatos remotos");
        }
      };

      const connect = async () => {
        try {
          const ip = serverIPInput.value;
          const port = serverPortInput.value;

          if (!ip || !port) {
            alert("Por favor, ingresa IP y Puerto");
            return;
          }

          // Aseguramos el protocolo http:// para que fetch no use rutas relativas
          const baseUrl = "http://" + ip + ":" + port;
          console.log("Conectando a:", baseUrl);

          // 1. Obtener Offer
          const offer = await fetchOffer(baseUrl);
          await pc.setRemoteDescription(offer);

          // 2. Crear y enviar Answer
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await sendAnswer(baseUrl, answer);

          // 3. Intercambiar candidatos (esperar un poco a que se generen locales)
          setTimeout(() => handleCandidates(baseUrl), 1000);

        } catch (error) {
          console.error("Error durante la conexión:", error);
          alert("Error al conectar: " + error);
        }
      };

      connectBtn.onclick = connect;

      </script>
</body>

</html>
`;
