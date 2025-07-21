const browseBtn = document.getElementById('browseBtn');
const addFile = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const fileInput = document.getElementById('fileInput');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.querySelector('.progress-text');
const dropZone = document.getElementById('dropZone');
const progressContainer = document.querySelector('.progress-container')

// Open Modal
addFile.addEventListener('click', (e) => {
    e.preventDefault();
    modalOverlay.classList.add('active');
    });

// Close Modal
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
    });
});

['drop', 'dragleave'].forEach(eventName =>{
    dropZone.addEventListener(eventName, (e)=>{
        e.preventDefault()
        e.stopPropagation()
        dropZone.classList.remove('drag-over')
    })
})

browseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fileInput.click();
});

// Upload file using AJAX
dropZone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) return uploadFile(file);
});

const uploadFile = (file)=>{
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.open('POST', 'http://localhost:3000/upload', true);

    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            progressContainer.style.display = 'inline-block'
            progressBar.style.width = percent + '%';
            progressText.textContent = percent + '%';
        }
    };

    xhr.onload = () => {
        if (xhr.status === 200) {
            progressBar.style.width = '0%';
            progressText.textContent = 'File uploaded successfully';

            fileInput.value = ''
            // modalOverlay.classList.remove('active');
        } else {
            alert('Upload failed!');
        }
    };

    xhr.send(formData);
}
