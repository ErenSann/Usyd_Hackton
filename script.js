document.addEventListener('mousemove', function(event) {
    const img = document.getElementById("myImage");
    const imageWidth = img.offsetWidth;
    const containerWidth = document.getElementById("imageContainer").offsetWidth;

    // How far we can move the image inside its container
    const maxShift = containerWidth - imageWidth;

    // Calculate shift. This is a basic linear interpolation.
    const shiftAmount = (event.clientX / window.innerWidth) * maxShift;

    img.style.left = `${shiftAmount}px`;
});
