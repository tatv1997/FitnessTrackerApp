// Wait for the DOM to load before running code
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('tracker-form');
  const workoutLog = document.getElementById('workout-log');

  // Load existing entries from localStorage
  let entries = JSON.parse(localStorage.getItem('workouts')) || [];

  // Function to display entries in the log
  function displayEntries() {
    workoutLog.innerHTML = ''; // Clear existing entries
    entries.forEach((entry, index) => {
      const li = document.createElement('li');
      li.textContent = `${entry.exercise} - ${entry.duration} minutes`;
      
      // Optional: Add delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '❌';
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.onclick = function () {
        entries.splice(index, 1);               // Remove from array
        localStorage.setItem('workouts', JSON.stringify(entries)); // Save updated list
        displayEntries();                       // Re-render
      };

      li.appendChild(deleteBtn);
      workoutLog.appendChild(li);
    });
  }

  // Handle form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    const exerciseInput = document.getElementById('exercise');
    const durationInput = document.getElementById('duration');

    const entry = {
      exercise: exerciseInput.value.trim(),
      duration: parseInt(durationInput.value)
    };

    // Add to array and save to localStorage
    entries.push(entry);
    localStorage.setItem('workouts', JSON.stringify(entries));

    // Clear form and refresh list
    form.reset();
    displayEntries();
  });

  // Show existing entries on page load
  displayEntries();
});


