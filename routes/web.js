const router = require('express').Router();

// In-memory storage for tasks
let tasks = [];

// Create a new index page task
router.post('/tasks', (req, res) => {
    try {
        const { description, category, date } = req.body;
        console.log(description, category, date);

        // Create a new task object
        const task = {
            description,
            category,
            dueDate: date,
            id: tasks.length + 1 // Simulating unique IDs
        };

        // Add the task to the in-memory array
        tasks.push(task);

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// Get all todo fetch index page 
router.get('/', (req, res) => {
    try {
        // Render tasks from the in-memory array
        res.render('index', { tasks: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch tasks.');
    }
});

// Deleting todo tasks
router.post('/delete', (req, res) => {
    try {
        // Get the task IDs from query parameters
        const taskIds = Object.keys(req.body);

        // Filter tasks to keep only those not in the taskIds array
        tasks = tasks.filter(task => !taskIds.includes(task.id.toString()));

        return res.redirect('back');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

module.exports = router;
