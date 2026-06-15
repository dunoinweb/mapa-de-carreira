fetch("assets/data/carreira.json")
  .then(res => res.json())
  .then(data => {

    // PROFILE
    document.getElementById("name").textContent = data.profile.name;
    document.getElementById("headline").textContent = data.profile.headline;
    document.getElementById("summary").textContent = data.profile.summary;

    // CAREER
    const careerDiv = document.getElementById("career");

    data.careerSteps.forEach(step => {
      const block = document.createElement("div");

      block.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.description}</p>

        <strong>Soft Skills:</strong>
        <ul>
          ${step.softSkills.map(s => `<li>${s}</li>`).join("")}
        </ul>

        <strong>Roadmap:</strong>
        <ul>
          ${step.roadmap.map(r => `<li>${r}</li>`).join("")}
        </ul>
      `;

      careerDiv.appendChild(block);
    });

    // SKILLS
    const skillsDiv = document.getElementById("skills");

    data.skillGroups.forEach(group => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${group.title}</h3>
        <ul>
          ${group.skills.map(s => `<li>${s.name} (${s.level}%)</li>`).join("")}
        </ul>
      `;

      skillsDiv.appendChild(div);
    });

    // LANGUAGES
    const langList = document.getElementById("languages");

    data.languages.forEach(lang => {
      const li = document.createElement("li");
      li.textContent = `${lang.name} - ${lang.level}`;
      langList.appendChild(li);
    });

  });
