fetch("./assets/data/carreira.json")
  .then(res => res.json())
  .then(data => {

    // PROFILE
    document.getElementById("name").textContent = data.profile.name;
    document.getElementById("headline").textContent = data.profile.headline;
    document.getElementById("summary").textContent = data.profile.summary;

    const photo = document.getElementById("profile-photo");
    photo.src = data.profile.photo;

    const contactList = document.getElementById("contact-list");
    data.contacts.forEach(contact => {
      const a = document.createElement("a");
      a.href = contact.url;
      a.textContent = contact.label;
      a.target = "_blank";
      contactList.appendChild(a);
    });

    // CAREER
    const careerDiv = document.getElementById("career");

    data.careerSteps.forEach(step => {
      const block = document.createElement("div");

      block.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.description}</p>

        <strong>Soft skills</strong>
        <ul>${step.softSkills.map(s => `<li>${s}</li>`).join("")}</ul>

        <strong>Roadmap</strong>
        <ul>${step.roadmap.map(r => `<li>${r}</li>`).join("")}</ul>
      `;

      careerDiv.appendChild(block);
    });

    // SKILLS
    const skillsDiv = document.getElementById("skills");

    data.skillGroups.forEach(group => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${group.title}</h3>`;

      group.skills.forEach(skill => {
        const skillDiv = document.createElement("div");
        skillDiv.className = "skill";

        skillDiv.innerHTML = `
          <span>${skill.name}</span>
          <div class="bar">
            <div class="fill" style="width:${skill.level}%"></div>
          </div>
        `;

        div.appendChild(skillDiv);
      });

      skillsDiv.appendChild(div);
    });

    // OTHER SKILLS
    const otherList = document.getElementById("other-skills");
    data.otherSkills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill;
      otherList.appendChild(li);
    });

    // LANGUAGES
    const langList = document.getElementById("languages");
    data.languages.forEach(lang => {
      const li = document.createElement("li");
      li.textContent = `${lang.name} (${lang.level})`;
      langList.appendChild(li);
    });

  });
