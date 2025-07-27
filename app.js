const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
import AdminDashboard from "./components/AdminDashboard";

function App() {
    return (
        <div>
            <AdminDashboard />
        </div>
    );
}

export default App;
