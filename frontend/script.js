
        let stream;
        let facingMode = 'environment';

        async function startCamera() {
            try {
                document.getElementById('main-buttons').style.display = 'none';
                document.getElementById('camera-container').style.display = 'block';
                
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode }
                });
                document.getElementById('video').srcObject = stream;
            } catch (err) {
                console.error('Error accessing camera:', err);
                alert('Error accessing camera. Please make sure you have granted camera permissions.');
            }
        }

        async function switchCamera() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            facingMode = facingMode === 'environment' ? 'user' : 'environment';
            await startCamera();
        }

        async function capture() {
            const video = document.getElementById('video');
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            
            const imageData = canvas.toDataURL('image/jpeg');
            await processMathProblem(imageData);
        }

        async function handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    await processMathProblem(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }

        async function processMathProblem(imageData) {
            try {
                const response = await axios.post('http://localhost:3014/api/process-math', { image: imageData });
                displayResult(response.data);
            } catch (err) {
                console.error('Error processing image:', err);
                alert('Error processing the image. Please try again.');
            }
        }

        function displayResult(result) {
            document.getElementById('camera-container').style.display = 'none';
            document.getElementById('main-buttons').style.display = 'none';
            document.getElementById('result-container').style.display = 'block';
            
            const solutionDiv = document.getElementById('solution');
            solutionDiv.innerHTML = formatSolution(result);
        }

        function formatSolution(result) {
            if (result.error) {
                return `<p>${result.error}</p>`;
            }

            let html = '<h2>Solution:</h2>';
            result.steps.forEach((step, index) => {
                const stepClass = step.isCorrect ? 'correct' : 'incorrect';
                html += `<p class="${stepClass}">Step ${index + 1}: ${step.description}</p>`;
                if (!step.isCorrect) {
                    html += `<p class="incorrect">Feedback: ${step.feedback}</p>`;
                }
            });
            html += `<h3>Final Answer: ${result.finalAnswer}</h3>`;
            return html;
        }

        function backToMain() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            document.getElementById('camera-container').style.display = 'none';
            document.getElementById('result-container').style.display = 'none';
            document.getElementById('main-buttons').style.display = 'flex';
            document.getElementById('solution').innerHTML = '';
            document.getElementById('file-input').value = '';
        }
    