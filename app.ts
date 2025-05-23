import express, { Request, Response } from 'express';
import mainrouter from './src/main.routes'

import cors from 'cors'
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.use('/api', mainrouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;
