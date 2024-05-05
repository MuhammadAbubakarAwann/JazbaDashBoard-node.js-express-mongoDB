function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
}
