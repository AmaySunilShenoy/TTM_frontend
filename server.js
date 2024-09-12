import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { createCompletionStream, loadModel } from 'gpt4all';


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


const localModelPath = 'orca-mini-3b-gguf2-q4_0.gguf';
let model;

try {
    model = await loadModel(localModelPath);
    console.log('GPT4All Model Loaded from Local Path');
} catch (err) {
    console.error('Error loading GPT4All model:', err);
}

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('init chat', async (poi) => {
        console.log('init chat', poi);
        if (!model) {
            return socket.emit('chat stream', { user: 'AI', message: 'Model not loaded.' });
        }

        const initPrompt = `You are ${poi.name}, a renowned figure from history. ${poi.period ? `You lived during the time of ${poi.period}`: ''}. ${poi.field ? `You were known for your significant contributions in ${poi.field}.`: ''} ${poi.contributions ? `You were involved in ${poi.contributions}`: ''} ${poi.traits ? `People admire you for ${poi.traits}.`: ''}

You are currently engaging in a conversation with a student in the present day. You will respond as yourself, staying true to your personality, experiences, and knowledge from your lifetime. The student is curious to learn more about your life, your work, and your thoughts on various subjects. Answer their questions in a way that reflects your time, your expertise, and your worldview, while also being clear and educational.

Keep your responses historically accurate, and be sure to explain your ideas as clearly as possible, even if the concepts are complex. If asked about things beyond your lifetime, you can acknowledge that you do not know them but can speculate based on your knowledge and the time in which you lived.

First, give the student a warm greeting as yourself and ask how you can help and let them in know that they can ask you any question they like in two or three phrases and then the student will ask you questions about your life and work. You may respond in first-person as [Historical Figure].
`;


const responseStream = createCompletionStream(model, initPrompt);

let fullMessage = '';

responseStream.tokens.on("data", (data) => {
    console.log('init chat', data.toString());
  fullMessage += data.toString();  // Accumulate the tokens
  socket.emit('chat stream', { user: 'AI', message: data.toString() });
});

responseStream.tokens.on("end", () => {
  // Once the stream ends, emit the full message
  socket.emit('chat message end', { user: 'AI', message: fullMessage });
});

    })

    socket.on('chat message', async (msg) => {

        try {
            io.emit('chat message', { user: 'User', message: msg });

            const responseStream = createCompletionStream(model, msg);

let fullMessage = '';

responseStream.tokens.on("data", (data) => {
    console.log('init chat', data.toString());
  fullMessage += data.toString();  // Accumulate the tokens
  socket.emit('chat stream', { user: 'AI', message: data.toString() });
});

responseStream.tokens.on("end", () => {
  // Once the stream ends, emit the full message
  socket.emit('chat message end', { user: 'AI', message: fullMessage });
});

        } catch (error) {
            console.error('Error generating response:', error);
            socket.emit('chat message part', { user: 'AI', message: 'Sorry, I encountered an error while processing your request.' });
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});