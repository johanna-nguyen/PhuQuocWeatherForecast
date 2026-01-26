function initNavbarTabs() {
  const navLinks = document.querySelectorAll(".navbar a");

  if (navLinks.length === 0) {
    console.warn("No navigation links found.");
    return;
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      navLinks.forEach((el) => el.classList.remove("active"));

      this.classList.add("active");

      const sections = document.querySelectorAll(".tab-section");
      sections.forEach((section) => section.style.display = "none");

      const sectionId = this.getAttribute("href").replace("#", "");
      const activeSection = document.getElementById(sectionId);

      if (activeSection) {
        activeSection.style.display = "block";
        document.getElementById("locationSelect").value = "all"; 
        
        if (sectionId === "weather-section") {
          activateWeatherModule();
          deactivateAirModule();
          deactivateUVIndexModule();
          deactivateSeaModule();
          setupLocationSelect();
          deactivateHomeModule();
          clearMapPoints(lastClickedLon, lastClickedLat);
          clearFixedAreaPoints();
        
        } else if (sectionId === "air-section") {
          activateAirModule();
          deactivateWeatherModule();
          deactivateUVIndexModule();
          deactivateSeaModule();
          setupLocationSelect();
          deactivateHomeModule();
          clearMapPoints(lastClickedLon, lastClickedLat);
          clearFixedAreaPoints();
        }
        else if (sectionId === "uvindex-section") {
          activateUVIndexModule();
          deactivateAirModule();
          deactivateWeatherModule();
          deactivateSeaModule();
          setupLocationSelect();
          deactivateHomeModule();
          clearMapPoints(lastClickedLon, lastClickedLat);
          clearFixedAreaPoints();
        }
        else if (sectionId === "sea-section") {
          activateSeaModule();
          deactivateWeatherModule();
          deactivateAirModule();
          deactivateUVIndexModule();
          setupLocationSelect();
          deactivateHomeModule();
          clearMapPoints(lastClickedLon, lastClickedLat);
          clearFixedAreaPoints();
        }
        else if (sectionId === "home-menu") {
          activateHomeModule();
          deactivateWeatherModule();
          deactivateAirModule();
          deactivateUVIndexModule();
          deactivateSeaModule();
        }
      }
    });
  });
}

window.initNavbarTabs = initNavbarTabs;


