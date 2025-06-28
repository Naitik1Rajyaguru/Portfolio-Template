// Main script file to handle the portfolio website functionality

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the portfolio with data from the JSON file
  fetchPortfolioData();

  // Set up tab functionality for experience section
  setupTabs();
  initResumeGenerator();
});

// Function to populate the DOM with portfolio data
function populatePortfolio(data) {
  // Hero section
  document.getElementById("hero-name").textContent = data.name;
  document.getElementById("hero-title").textContent = data.title;
  document.getElementById("hero-description").textContent = data.description;
  // document.getElementById("resume-link").href = data.resumeLink;
  document.getElementById("profile-photo").src = data.profilePhoto;

  // Social profiles
  populateSocialProfiles(data.socialProfiles);

  // Coding profiles
  populateCodingProfiles(data.codingProfiles);

  // Skills
  populateSkills(data.skills);

  // Certifications
  populateCertifications(data.certifications);

  // Education
  populateEducation(data.education);

  // Projects
  populateProjects(data.projects);

  // Experience - Internships & Full-time
  populateExperience(data.experience);

  // Hobbies
  populateHobbies(data.hobbies);

  // Contact info
  populateContactInfo(data.contact);

  // Footer
  populateFooter(data);
}

// Function to populate social profiles
function populateSocialProfiles(profiles) {
  const socialProfilesContainer = document.getElementById(
    "social-profiles-container"
  );
  socialProfilesContainer.innerHTML = ""; // Clear existing content

  profiles.forEach((profile) => {
    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";
    profileCard.innerHTML = `
            <i class="${profile.icon}"></i>
            <h3>${profile.name}</h3>
            <a href="${profile.link}" target="_blank">View Profile</a>
        `;
    socialProfilesContainer.appendChild(profileCard);
  });
}

// Function to populate coding profiles
function populateCodingProfiles(profiles) {
  const codingProfilesContainer = document.getElementById(
    "coding-profiles-container"
  );
  codingProfilesContainer.innerHTML = ""; // Clear existing content

  profiles.forEach((profile) => {
    const profileCard = document.createElement("div");
    profileCard.className = "coding-profile-card";
    profileCard.innerHTML = `
            <h3>${profile.name}</h3>
            <p>Username: ${profile.username}</p>
            <p>Rating: ${profile.rating}</p>
            <a href="${profile.link}" target="_blank">View Profile</a>
        `;
    codingProfilesContainer.appendChild(profileCard);
  });
}

// Function to populate Skills
function populateSkills(skillsData) {
  const skillsContainer = document.getElementById("skills-container");
  skillsContainer.innerHTML = ""; // Clear existing content

  skillsData.forEach((skillGroup) => {
    const skillCard = document.createElement("div");
    skillCard.className = "skill-card";
    let skillsListHTML = '<ul class="skill-list">';
    skillGroup.skills.forEach((skill) => {
      skillsListHTML += `<li>${skill}</li>`;
    });
    skillsListHTML += "</ul>";
    skillCard.innerHTML = `
          <h3>${skillGroup.title}</h3>
          ${skillsListHTML}
      `;
    skillsContainer.appendChild(skillCard);
  });
}

// Function to populate certifications
function populateCertifications(certifications) {
  const certificationsContainer = document.getElementById(
    "certifications-container"
  );
  certificationsContainer.innerHTML = ""; // Clear existing content

  certifications.forEach((certification) => {
    const certificationCard = document.createElement("div");
    certificationCard.className = "certification-card";
    certificationCard.innerHTML = `
          <h3>${certification.title}</h3>
          ${
            certification.link
              ? `<a href="${certification.link}" target="_blank">View Certificate</a>`
              : ""
          }
      `;
    certificationsContainer.appendChild(certificationCard);
  });
}

// Function to populate education section
function populateEducation(education) {
  const educationContainer = document.getElementById("education-container");
  educationContainer.innerHTML = ""; // Clear existing content

  education.forEach((edu) => {
    const educationCard = document.createElement("div");
    educationCard.className = "education-card";
    educationCard.innerHTML = `
            <h3>${edu.institution}</h3>
            <div class="degree">${edu.degree}</div>
            <div class="duration">${edu.duration}</div>
            <p>${marked.parse(edu.description)}</p>
        `;
    educationContainer.appendChild(educationCard);
  });
}

// Function to populate projects section
function populateProjects(projects) {
  const projectsContainer = document.getElementById("projects-container");
  projectsContainer.innerHTML = ""; // Clear existing content

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";

    let linksHTML = `<a href="${project.githubLink}" target="_blank"><i class="fab fa-github"></i> GitHub</a>`;
    if (project.liveLink) {
      linksHTML += `<a href="${project.liveLink}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
    }

    projectCard.innerHTML = `
            <div class="project-image">
                <i class="fas fa-code"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <div class="duration">${project.duration}</div>
                <p>${marked.parse(project.description)}</p>
                <div class="project-links">
                    ${linksHTML}
                </div>
            </div>
        `;
    projectsContainer.appendChild(projectCard);
  });
}

// Function to populate experience section
function populateExperience(experience) {
  // Clear existing content
  const internshipContainer = document.getElementById("internship-container");
  const fulltimeContainer = document.getElementById("fulltime-container");
  internshipContainer.innerHTML = "";
  fulltimeContainer.innerHTML = "";

  // Populate internships
  if (experience.internship && experience.internship.length > 0) {
    experience.internship.forEach((exp) => {
      const expCard = document.createElement("div");
      expCard.className = "experience-card";
      expCard.innerHTML = `
                <h3>${exp.company ?? ""}</h3>
                <h4>${exp.designation ?? ""}</h4>
                <div class="duration">${exp.duration ?? ""}</div>
                <h4>Project: ${exp.projectTitle ?? ""}</h4>
                <p>${exp.description ?? ""}</p>
            `;
      internshipContainer.appendChild(expCard);
    });
  } else {
    internshipContainer.innerHTML =
      "<p>No internship experience available.</p>";
  }

  // Populate full-time experiences
  if (experience.fulltime && experience.fulltime.length > 0) {
    experience.fulltime.forEach((exp) => {
      const expCard = document.createElement("div");
      expCard.className = "experience-card";
      expCard.innerHTML = `
                <h3>${exp.company ?? ""}</h3>
                <h4>${exp.designation ?? ""}</h4>
                <div class="duration">${exp.duration ?? ""}</div>
                <h4>Project: ${exp.projectTitle ?? ""}</h4>
                <p>${marked.parse(exp.description) ?? ""}</p>
            `;
      fulltimeContainer.appendChild(expCard);
    });
  } else {
    fulltimeContainer.innerHTML = "<p>No full-time experience available.</p>";
  }
}

// Function to populate hobbies section
function populateHobbies(hobbies) {
  const hobbiesContainer = document.getElementById("hobbies-container");
  hobbiesContainer.innerHTML = ""; // Clear existing content

  hobbies.forEach((hobby) => {
    const hobbyCard = document.createElement("div");
    hobbyCard.className = "hobby-card";
    // You can add icons based on the hobby if you have them in your data
    hobbyCard.innerHTML = `
          <i class="fas fa-star"></i>
          <p>${hobby}</p>
      `;
    hobbiesContainer.appendChild(hobbyCard);
  });
}

// Function to populate contact info
function populateContactInfo(contact) {
  const contactContainer = document.getElementById("contact-container");
  contactContainer.innerHTML = ""; // Clear existing content

  if (contact.email) {
    const emailCard = document.createElement("div");
    emailCard.className = "contact-card";
    emailCard.innerHTML = `
            <i class="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>${contact.email}</p>
        `;
    contactContainer.appendChild(emailCard);
  }

  if (contact.phone) {
    const phoneCard = document.createElement("div");
    phoneCard.className = "contact-card";
    phoneCard.innerHTML = `
            <i class="fas fa-phone"></i>
            <h3>Phone</h3>
            <p>${contact.phone}</p>
        `;
    contactContainer.appendChild(phoneCard);
  }
}

// Function to populate footer
function populateFooter(data) {
  document.getElementById("footer-name").textContent = data.name;
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  const footerSocialIcons = document.getElementById("footer-social-icons");
  footerSocialIcons.innerHTML = ""; // Clear existing content

  data.socialProfiles.forEach((profile) => {
    const iconLink = document.createElement("a");
    iconLink.href = profile.link;
    iconLink.target = "_blank";
    iconLink.innerHTML = `<i class="${profile.icon}"></i>`;
    footerSocialIcons.appendChild(iconLink);
  });
}

// Function to set up the tabs for the experience section
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const experienceTypes = document.querySelectorAll(".experience-type");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and content
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      experienceTypes.forEach((type) => type.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(`${tabId}-container`).classList.add("active");
    });
  });
}

// load profile data from json file
function fetchPortfolioData() {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      populatePortfolio(data);
      window.portfolioData = data;
    })
    .catch((error) => {
      console.error("Error fetching the portfolio data:", error);
      // You might want to display a user-friendly error message on the page
      document.body.innerHTML =
        '<div class="container" style="text-align:center;padding:50px;"><h2>Unable to load portfolio data</h2><p>Please try again later.</p></div>';
    });
}

// ******************************************
