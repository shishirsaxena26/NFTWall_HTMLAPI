import express from 'express';
import cors from 'cors';
import path from 'path';
import { Agent, run } from '@openai/agents';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files
app.use(express.static('public'));

// ✅ AI Agent
const agent = new Agent({
  name: 'Assistant',
  instructions: 'You are a helpful assistant',
  model: 'gpt-4o',
});

// ✅ Default route → load UI
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/index.html'));
});

// ✅ Streaming endpoint
app.post('/stream', async (req, res) => {
  const { prompt } = req.body;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    const streamResult = await run(agent, prompt, { stream: true });

    const textStream = streamResult.toTextStream({
      compatibleWithNodeStreams: true,
    });

    textStream.pipe(res);

    await streamResult.completed;
    res.end();

  } catch (err) {
    console.error(err);
    res.write("Error: " + err.message);
    res.end();
  }
});

app.listen(3000, () => {
  console.log('🚀 http://localhost:3000');
});