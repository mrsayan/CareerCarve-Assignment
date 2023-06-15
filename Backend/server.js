import app from './app.js';
import connectDB from './config/database.js';
import dotenv from 'dotenv';

dotenv.config({ path: "config/config.env" });
connectDB();

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
}
);

