document.addEventListener('DOMContentLoaded', function () {
    const slide = document.querySelector('.slide');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    function moveNext() {
        let items = document.querySelectorAll('.item');
        slide.appendChild(items[0]); // Move the first item to the end
    }

    function movePrev() {
        let items = document.querySelectorAll('.item');
        slide.prepend(items[items.length - 1]); // Move the last item to the start
    }

    nextButton.addEventListener('click', moveNext);
    prevButton.addEventListener('click', movePrev);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            moveNext();
        } else if (e.key === 'ArrowLeft') {
            movePrev();
        }
    });
});
