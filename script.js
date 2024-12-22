document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
document.getElementById('convertButton').addEventListener('click', convertImage, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const buffer = e.target.result;
            const libraw = new LibRaw();
            libraw.open_buffer(buffer, function() {
                const image = libraw.unpack_thumb();
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                const imgData = ctx.createImageData(image.width, image.height);
                imgData.data.set(new Uint8ClampedArray(image.data));
                ctx.putImageData(imgData, 0, 0);
            });
        };
        reader.readAsArrayBuffer(file);
    }
}

function convertImage() {
    const canvas = document.getElementById('canvas');
    const format = document.getElementById('format').value; // Obtém o formato selecionado
    const imgURL = canvas.toDataURL(`image/${format}`); // Usa o formato selecionado
    const link = document.createElement('a');
    link.href = imgURL;
    link.download = `converted_image.${format}`; // Nome do arquivo baseado no formato
    link.click();
}
