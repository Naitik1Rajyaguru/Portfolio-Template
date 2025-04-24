// Create the popup for section selection
function createResumePopup() {
  // Create the overlay
  const overlay = document.createElement("div");
  overlay.className = "resume-popup-overlay";
  overlay.style.display = "none";

  // Create the popup container
  const popup = document.createElement("div");
  popup.className = "resume-popup";

  // Create the header
  const header = document.createElement("div");
  header.className = "resume-popup-header";

  const title = document.createElement("h2");
  title.textContent = "Generate Your Resume";

  const closeBtn = document.createElement("button");
  closeBtn.className = "resume-popup-close";
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  header.appendChild(title);
  header.appendChild(closeBtn);

  // Create the content
  const content = document.createElement("div");
  content.className = "resume-popup-content";

  const description = document.createElement("p");
  description.textContent =
    "Select the sections you want to include in your resume:";
  content.appendChild(description);

  // Define the sections based on your JSON data structure
  const sections = [
    { id: "personal", label: "Personal Information" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "socialProfiles", label: "Social Profiles" },
    { id: "codingProfiles", label: "Coding Profiles" },
    { id: "hobbies", label: "Hobbies" },
  ];

  const checkboxContainer = document.createElement("div");
  checkboxContainer.className = "checkbox-container";

  sections.forEach((section) => {
    const checkboxItem = document.createElement("div");
    checkboxItem.className = "checkbox-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `section-${section.id}`;
    checkbox.value = section.id;
    checkbox.checked = [
      "personal",
      "skills",
      "projects",
      "experience",
      "education",
    ].includes(section.id);

    const label = document.createElement("label");
    label.htmlFor = `section-${section.id}`;
    label.textContent = section.label;

    checkboxItem.appendChild(checkbox);
    checkboxItem.appendChild(label);
    checkboxContainer.appendChild(checkboxItem);
  });

  content.appendChild(checkboxContainer);

  // Create the footer
  const footer = document.createElement("div");
  footer.className = "resume-popup-footer";

  const generateBtn = document.createElement("button");
  generateBtn.className = "generate-resume-btn";
  generateBtn.textContent = "Generate Resume";
  generateBtn.addEventListener("click", () => {
    const selectedSections = [];
    document
      .querySelectorAll('.checkbox-item input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        selectedSections.push(checkbox.value);
      });

    generateResume(selectedSections);
    overlay.style.display = "none";
  });

  footer.appendChild(generateBtn);

  // Assemble the popup
  popup.appendChild(header);
  popup.appendChild(content);
  popup.appendChild(footer);
  overlay.appendChild(popup);

  // Add the overlay to the document
  document.body.appendChild(overlay);

  return overlay;
}

// Function to show the resume popup
function showResumePopup() {
  const popup = document.querySelector(".resume-popup-overlay");
  if (popup) {
    popup.style.display = "flex";
  } else {
    const newPopup = createResumePopup();
    newPopup.style.display = "flex";
  }
}

// Modified function to generate resume based on selected sections
function generateResume(selectedSections) {
  const portfolioData = window.portfolioData; // Assuming this is globally available

  if (!portfolioData) {
    console.error("Portfolio data is not available.");
    alert("Error: Portfolio data could not be loaded.");
    return;
  }

  const resumeContent = generateResumeContent(portfolioData, selectedSections);
  if (resumeContent) {
    sessionStorage.setItem("resumeContent", resumeContent);
    window.open("resume.html", "_blank");
  }
}

// Function to generate resume content
function generateResumeContent(data, includedSections) {
  if (!data) {
    console.error("Portfolio data is not available.");
    return null;
  }

  let resumeBodyContent = `<div class="resume-container">`;

  // Personal information section
  if (includedSections.includes("personal") && data.name) {
    resumeBodyContent += `
        <div class="personal">
          <h1 class="name">${data.name}</h1>
          ${data.title ? `<h2 class="title">${data.title}</h2>` : ""}
          ${
            data.description ? `<p class="summary">${data.description}</p>` : ""
          }
          <div class="contact-info">
            ${
              data.contact?.email
                ? `<span class="email"><a href="mailto:${data.contact.email}">${data.contact.email}</a></span>`
                : ""
            }
            ${
              data.contact?.phone
                ? `<span class="phone">${data.contact.phone}</span>`
                : ""
            }
            ${
              data.socialProfiles?.find(
                (p) => p.name.toLowerCase() === "linkedin"
              )?.link
                ? `<span class="linkedin"><a href="${
                    data.socialProfiles.find(
                      (p) => p.name.toLowerCase() === "linkedin"
                    ).link
                  }">LinkedIn</a></span>`
                : ""
            }
            ${
              data.socialProfiles?.find(
                (p) => p.name.toLowerCase() === "github"
              )?.link
                ? `<span class="github"><a href="${
                    data.socialProfiles.find(
                      (p) => p.name.toLowerCase() === "github"
                    ).link
                  }">GitHub</a></span>`
                : ""
            }
          </div>
        </div>
        <hr class="section-divider">
      `;
  }

  // Skills section
  if (
    includedSections.includes("skills") &&
    data.skills &&
    data.skills.length > 0
  ) {
    resumeBodyContent += `<section class="skills"><h2>Skills</h2><ul class="skills-list">`;
    data.skills.forEach((skillGroup) => {
      resumeBodyContent += `<li><strong>${
        skillGroup.title
      }:</strong> ${skillGroup.skills.join(", ")}</li>`;
    });
    resumeBodyContent += `</ul></section><hr class="section-divider">`;
  }

  // Projects section with markdown support
  if (
    includedSections.includes("projects") &&
    data.projects &&
    data.projects.length > 0
  ) {
    resumeBodyContent += `<section class="projects"><h2>Projects</h2><ul class="projects-list">`;
    data.projects.forEach((project) => {
      resumeBodyContent += `<li class="project">
          <h3>${project.title} <span class="duration">(${
        project.duration
      })</span></h3>
          <div class="description markdown">${marked.parse(
            project.description
          )}</div>
          <p class="links">
            ${
              project.githubLink
                ? `<a href="${project.githubLink}">GitHub</a>`
                : ""
            }
            ${
              project.liveLink
                ? (project.githubLink ? " | " : "") +
                  `<a href="${project.liveLink}">Live Demo</a>`
                : ""
            }
          </p>
        </li>`;
    });
    resumeBodyContent += `</ul></section><hr class="section-divider">`;
  }

  // Experience section with markdown support
  if (includedSections.includes("experience") && data.experience) {
    resumeBodyContent += `<section class="experience"><h2>Experience</h2>`;
    ["internship", "fulltime"].forEach((type) => {
      if (data.experience[type] && data.experience[type].length > 0) {
        resumeBodyContent += `<h3>${
          type.charAt(0).toUpperCase() + type.slice(1)
        }</h3><ul class="experience-list">`;
        data.experience[type].forEach((exp) => {
          resumeBodyContent += `<li class="job">
              <h4>${exp.designation} <span class="company">(${
            exp.company
          })</span> <span class="duration">(${exp.duration})</span></h4>
              <h5>Project: ${exp.projectTitle}</h5>
              <div class="description markdown">${marked.parse(
                exp.description
              )}</div>
            </li>`;
        });
        resumeBodyContent += `</ul>`;
      }
    });
    resumeBodyContent += `</section><hr class="section-divider">`;
  }

  // Education section
  if (
    includedSections.includes("education") &&
    data.education &&
    data.education.length > 0
  ) {
    resumeBodyContent += `<section class="education"><h2>Education</h2><ul class="education-list">`;
    data.education.forEach((edu) => {
      resumeBodyContent += `<li class="degree">
          <h3>${edu.degree} <span class="institution">(${
        edu.institution
      })</span> <span class="duration">(${edu.duration})</span></h3>
          ${
            edu.description
              ? `<div class="description markdown">${marked.parse(
                  edu.description
                )}</div>`
              : ""
          }
        </li>`;
    });
    resumeBodyContent += `</ul></section><hr class="section-divider">`;
  }

  // Certifications section
  if (
    includedSections.includes("certifications") &&
    data.certifications &&
    data.certifications.length > 0
  ) {
    resumeBodyContent += `<section class="certifications"><h2>Certifications</h2><ul class="certifications-list">`;
    data.certifications.forEach((cert) => {
      resumeBodyContent += `<li>${cert.title} ${
        cert.link ? `(<a href="${cert.link}">View</a>)` : ""
      }</li>`;
    });
    resumeBodyContent += `</ul></section><hr class="section-divider">`;
  }

  // Social Profiles section
  if (
    includedSections.includes("social") &&
    data.socialProfiles &&
    data.socialProfiles.length > 0
  ) {
    resumeBodyContent += `<section class="social"><h2>Social Profiles</h2><ul class="social-list">`;
    data.socialProfiles.forEach((profile) => {
      resumeBodyContent += `<li><strong>${profile.name}:</strong> <a href="${profile.link}">${profile.link}</a></li>`;
    });
    resumeBodyContent += `</ul></section><hr class="section-divider">`;
  }

  // Coding Profiles section
  if (
    includedSections.includes("coding") &&
    data.codingProfiles &&
    data.codingProfiles.length > 0
  ) {
    resumeBodyContent += `<section class="coding"><h2>Coding Profiles</h2><ul class="coding-list">`;
    data.codingProfiles.forEach((profile) => {
      resumeBodyContent += `<li><strong>${profile.name}:</strong> <a href="${profile.link}">${profile.link}</a> (${profile.rating})</li>`;
    });
    resumeBodyContent += `</ul></section><hr class="section-divider">`;
  }

  // Hobbies section
  if (
    includedSections.includes("hobbies") &&
    data.hobbies &&
    data.hobbies.length > 0
  ) {
    resumeBodyContent += `<section class="hobbies"><h2>Hobbies & Interests</h2><p>${data.hobbies.join(
      ", "
    )}</p></section><hr class="section-divider">`;
  }

  resumeBodyContent += `</div>`;
  return resumeBodyContent;
}

// Function to initialize the resume generator
function initResumeGenerator() {
  createResumePopup();

  // Create the button to open the popup
  const openResumeBtn = document.getElementById("open-resume-generator");
  if (openResumeBtn) {
    openResumeBtn.addEventListener("click", showResumePopup);
  }
}
