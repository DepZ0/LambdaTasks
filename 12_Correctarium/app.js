const express = require('express');
const app = express();
const { loadModule } = require('cld3-asm');

const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const workingHours = { start: 10, end: 19 };
const ukrLangCost = 0.05; // За 1 символ.
const engLangCost = 0.12; // За 1 символ.
const minUkrRuCost = 50;
const minEngKyUzLaCost = 120;

async function costCalculation(req, res) {
  const { language, mimetype, count } = req.body;

  if (!language || !mimetype || count === undefined) {
    return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
  }

  let cost = 0;
  let time = 1;

  if (['uk', 'ru'].includes(language)) {
    cost = Math.max(Math.floor(ukrLangCost * count), minUkrRuCost);
  } else if (['en', 'ky', 'uz', 'la'].includes(language)) {
    cost = Math.max(Math.floor(engLangCost * count), minEngKyUzLaCost);
  }

  if (mimetype !== 'none' && !['.doc', '.docx', '.rtf'].includes(mimetype)) {
    cost *= 1.2;
  }

  const deadline = calculateDeadline(time);

  res.json({
    price: cost,
    time,
    deadline: Math.floor(deadline.getTime() / 1000),
    deadline_date: deadline.toLocaleString('en-US', { timeZone: 'Europe/Kiev' })
  });
}

function calculateDeadline(hours) {
  const deadlineDate = new Date();

  deadlineDate.setHours(deadlineDate.getHours() + hours);

  while (
    !workingDays.includes(deadlineDate.toLocaleDateString('en-US', { weekday: 'long' })) ||
    deadlineDate.getHours() < workingHours.start ||
    deadlineDate.getHours() >= workingHours.end
  ) {
    deadlineDate.setDate(deadlineDate.getDate() + 1);
    deadlineDate.setHours(workingHours.start);
  }

  return deadlineDate;
}

// Middleware for parsing JSON request bodies
app.use(express.json());

// API route for cost calculation
app.post('/cost-calculation', costCalculation);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
