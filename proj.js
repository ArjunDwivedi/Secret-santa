document.addEventListener('DOMContentLoaded', function() {
    const participantForm = document.getElementById('participant-form');
    const participantList = document.getElementById('participants').querySelector('ul');
    const generateButton = document.getElementById('generate-button');
    const resultsList = document.getElementById('results').querySelector('ul');

    participantForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const participantNameInput = document.getElementById('participant-name');
        const participantName = participantNameInput.value.trim();
        
        if (participantName !== '') {
            addParticipant(participantName);
            participantNameInput.value = ''; // Clear input field
        }
    });

    generateButton.addEventListener('click', function() {
        if (participantList.children.length < 2) {
            alert('Please add at least two participants.');
            return;
        }

        generateSecretSanta();
    });

    function addParticipant(name) {
        const li = document.createElement('li');
        li.textContent = name;
        participantList.appendChild(li);
    }

    function generateSecretSanta() {
        const participants = Array.from(participantList.children).map(li => li.textContent);
        const shuffledParticipants = shuffle(participants);

        resultsList.innerHTML = ''; // Clear previous results

        for (let i = 0; i < shuffledParticipants.length; i++) {
            const giver = shuffledParticipants[i];
            const receiver = shuffledParticipants[(i + 1) % shuffledParticipants.length];
            const li = document.createElement('li');
            li.textContent = `${giver} gives a gift to ${receiver}`;
            resultsList.appendChild(li);
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
