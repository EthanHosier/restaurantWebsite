//handles smooth scroll within #parallaxContainer div
const handleSmoothScroll = (target) => {
    const offsetTop = document.querySelector(target).offsetTop - 0.1*screen.height;
    const container = document.getElementById('parallaxContainer');

    container.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
    });
};

export default handleSmoothScroll;